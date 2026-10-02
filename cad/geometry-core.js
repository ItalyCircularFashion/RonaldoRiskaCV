// geometry-core.js — nucleo geometrico dell'AtelierCAD.
//
// SORGENTE UNICO del validatore. Lo caricano due consumatori:
//   - il runtime, con <script src="geometry-core.js">
//   - la suite di test, che lo valuta e lo ri-esporta da test/validator.mjs
// Non esiste una seconda copia: se la logica cambiasse qui, cambierebbe per
// entrambi.
//
// E' uno script classico, non un modulo ESM, per due motivi: l'app deve poter
// essere aperta da file:// senza fallire su CORS come farebbe un import, e
// l'HTML deve poter caricarlo prima dello script principale.
//
// La logica e' quella consolidata in Fase 2A, spostata senza modificarla:
// nessuna soglia ritoccata, nessuna semantica allentata. Non e' stato
// importato nulla da CAD Settembre: la capacita' di auto-intersezione era
// gia' presente, e in piu' casi piu' coperta (collinearita' con sovrapposizione,
// soglia di orientamento).
//
// UNITA': centimetri, l'unita' di lavoro dellapp. 1 unita' del path SVG = 1 cm,
// per costruzione in scene().

(function (root) {
"use strict";

const EPS_ORIENT = 1e-9;   // prodotto vettoriale per considerare
                                   // tre punti allineati
const EPS_ZERO   = 1e-9;   // distanza sotto la quale due punti sono
                                   // lo stesso punto
const EPS_AREA   = 1e-6;   // |area| sotto la quale il poligono e'
                                   // degenere (cm^2)
// Campionatura del PARSER, distinta da quella della produzione.
// L'app campiona le curve a 16 passi (samp(a,e,n=16)) e questo e' il default
// dell'adattatore poly(), perche' li' si replica la produzione.
// Il flattening del parser lavora invece a 24 passi: e' la precisione con cui
// geometry.test.mjs verificava da sempre il comportamento di parsePath, e il
// test conta i punti risultanti (1 iniziale + 24 = 25). Sono due numeri diversi
// per due scopi diversi: non vanno unificati.
const CURVE_SAMPLES = 24;  // passi del flattening nel parser

// ── vettori ─────────────────────────────────────────────────────────────────

const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];

/** Segno dell'orientamento, con soglia: sotto EPS_ORIENT vale 0 (collineari). */
function orient(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}

const segno = v => (v > EPS_ORIENT ? 1 : v < -EPS_ORIENT ? -1 : 0);

// ── predicati elementari ────────────────────────────────────────────────────

/**
 * Due segmenti si attraversano davvero?
 *
 * Restituisce null, "cross" o "collinear".
 *
 * "cross" richiede che i due segmenti siano su lati opposti di entrambe le
 * rette: e' l'attraversamento vero, quello che in un cartamodello significa che
 * il bordo si incrocia.
 *
 * "collinear" e' il caso in cui i due segmenti giacciono sulla stessa retta e si
 * sovrappongono. NON e' un attraversamento, ma e' un difetto: due lati distinti
 * che occupano lo stesso tratto di carta significano un bordo doppio. Questo
 * caso non e' coperto dal predicato di CAD Settembre, che lo ignora.
 */
function segIntersect(p1, p2, p3, p4) {
  const d1 = orient(p3, p4, p1), d2 = orient(p3, p4, p2);
  const d3 = orient(p1, p2, p3), d4 = orient(p1, p2, p4);
  const [s1, s2, s3, s4] = [segno(d1), segno(d2), segno(d3), segno(d4)];
  if (s1 !== 0 && s2 !== 0 && s3 !== 0 && s4 !== 0 && s1 !== s2 && s3 !== s4) return "cross";
  if (s1 === 0 && s2 === 0 && s3 === 0 && s4 === 0) {
    const overlapX =
      Math.max(Math.min(p1[0], p2[0]), Math.min(p3[0], p4[0])) <=
      Math.min(Math.max(p1[0], p2[0]), Math.max(p3[0], p4[0])) + EPS_ORIENT;
    const overlapY =
      Math.max(Math.min(p1[1], p2[1]), Math.min(p3[1], p4[1])) <=
      Math.min(Math.max(p1[1], p2[1]), Math.max(p3[1], p4[1])) + EPS_ORIENT;
    if (overlapX && overlapY) return "collinear";
  }
  return null;
}

/** Area con segno: positiva se il poligono e' antiorario. */
function signedArea(P) {
  let s = 0;
  for (let i = 0; i < P.length; i++) {
    const a = P[i], b = P[(i + 1) % P.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return s / 2;
}

// ── il predicato ────────────────────────────────────────────────────────────

/**
 * Analizza una spezzata, chiusa o aperta.
 *
 * `closed` non e' solo informativo: decide se il primo e l'ultimo lato siano
 * adiacenti. Su un poligono chiuso lo sono per costruzione (si incontrano sul
 * vertice di chiusura) ed escluderli evita un falso positivo garantito. Su una
 * spezzata aperta NON lo sono, ed escluderli nasconderebbe attraversamenti
 * reali: per questo il salto si applica solo quando closed.
 *
 * Restituisce:
 *   selfInt     coppie di lati che si attraversano, con l'indice e il tipo
 *   zeroLen     lati di lunghezza (quasi) zero
 *   dupPts      punti consecutivi coincidenti — stesso fatto di zeroLen,
 *               riportato a parte perche' la checklist lo chiede separato
 *   area        area con segno (solo se chiuso)
 *   degenerate  |area| <= EPS_AREA (solo se chiuso)
 */
function analyse(pts, closed) {
  const r = { selfInt: [], zeroLen: 0, dupPts: 0, area: 0, degenerate: false, repeatedVertex: null };
  if (!pts || pts.length < 2) return r;

  const P = closed ? [...pts, pts[0]] : pts;

  for (let i = 0; i + 1 < P.length; i++) {
    if (dist(P[i], P[i + 1]) <= EPS_ZERO) { r.zeroLen++; r.dupPts++; }
  }

  // CONDIZIONE A: vertice ripetuto in posizioni non adiacenti.
  //
  // Serve per il FARFALLA e per le figure che si richiusono su se stesse. La
  // condizione B qui sotto NON le vede: esclude i lati che condividono un
  // estremo (perche' un estremo condiviso e' continuita'), e un vertice ripetuto
  // produce esattamente quello — due lati che si toccano in un punto che e'
  // anche vertice, senza attraversarsi. Senza A, quel difetto passerebbe.
  //
  // CAD Settembre fa A e B per la stessa ragione, e la specifica della fase 2A
  // chiede entrambe. Nessuna soglia e' stata toccata per aggiungerla.
  // NB: si passano i punti ORIGINALI, non P. findRepeatedVertex() fa da se' la
  // chiusura quando closed e' true; passandogli P, che contiene gia' il punto
  // iniziale in fondo, lo appendeva una seconda volta e segnalava come vertice
  // ripetuto la coppia (primo, ultimo) — cioe' OGNI poligono chiuso risultava
  // difettoso. Il salto (i=0, j=n-1) scatta sull'array sbagliato.
  const ripetuto = findRepeatedVertex(pts, closed);
  if (ripetuto) r.repeatedVertex = ripetuto;

  // numero di LATI: P.length-1 sia per le chiuse sia per le aperte. Quando e'
  // chiusa, P contiene anche il punto iniziale ripetuto in fondo, e quello
  // genera l'ultimo lato: contare P.length faceva uscire l'indice dal vettore.
  const n = P.length - 1;
  for (let i = 0; i < n; i++) {
    const a1 = P[i], a2 = P[i + 1];
    for (let j = i + 2; j < n; j++) {
      if (closed && i === 0 && j === n - 1) continue;
      const b1 = P[j], b2 = P[j + 1];
      if (dist(a1, b1) <= EPS_ZERO) continue;   // il vertice e' gia' condiviso: e' continuita', non un difetto
      const hit = segIntersect(a1, a2, b1, b2);
      if (hit) r.selfInt.push({ i, j, kind: hit });
    }
  }

  if (closed && pts.length >= 3) {
    r.area = signedArea(pts);
    if (Math.abs(r.area) <= EPS_AREA) r.degenerate = true;
  }
  return r;
}

/**
 * Il poligono e' valido? Wrapper boolean su analyse(), per quando serve solo
 * il verdetto e non il dettaglio.
 */
function isValidPolygon(pts, closed = true) {
  const r = analyse(pts, closed);
  return r.selfInt.length === 0 && r.zeroLen === 0 &&
         !r.degenerate && r.repeatedVertex === null;
}

/**
 * Un vertice compare due volte in posizioni non adiacenti?
 *
 * E' la condizione A del predicato di CAD Settembre, e serve per il FARFALLA:
 * li' i due lati si incrociano in un punto che e' anche vertice, quindi nessuna
 * coppia di lati non adiacenti si "attraversa" propriamente e la sola condizione
 * B lo lascerebbe passare.
 *
 * In analyse() non serve perche' la condizione B colla collinearita' lo
 * copre gia'; resta esportata perche' e' una domandaposta legittima e serve ai
 * test di Fase 2A per confrontare i due predicati.
 */
function findRepeatedVertex(pts, closed = true, eps = EPS_ZERO) {
  const P = closed ? [...pts, pts[0]] : pts;
  const n = P.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      // i=0 e j=n-1 sono adiacenti nella chiusura: si incontrano sul vertice
      // di chiusura, non sono un difetto.
      if (closed && i === 0 && j === n - 1) continue;
      if (dist(P[i], P[j]) <= eps) return { i, j };
    }
  }
  return null;
}

// ── parser del tracciato SVG ────────────────────────────────────────────────
//
// serve perche' i test validano la geometria REALE generata dall'app, letta
// dal DOM, non formule ricalcolate: "la formula dice X" e "la carta misura X"
// sono due grandezze diverse e solo la seconda conta in cartamodellistica.

const flattenQ = (p0, p1, p2) => {
  const out = [];
  for (let k = 1; k <= CURVE_SAMPLES; k++) {
    const t = k / CURVE_SAMPLES, u = 1 - t;
    out.push([
      u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
      u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
    ]);
  }
  return out;
};

const flattenC = (p0, p1, p2, p3) => {
  const out = [];
  for (let k = 1; k <= CURVE_SAMPLES; k++) {
    const t = k / CURVE_SAMPLES, u = 1 - t;
    out.push([
      u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
      u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
    ]);
  }
  return out;
};

/**
 * Path SVG "d" in sottospezze di punti gia' campionate.
 *
 * Gestisce M/L/Q/C/Z. Restituisce {subpaths, cmds}: subpaths e' l'anello di
 * punti di ogni spezzata, cmds conta i comandi per tipo.
 *
 * Nota sul conteggio: il chunk che contiene "// ── 1. parser" in geometry.test.mjs
 * aveva un ramo `else` che scartava i numeri senza comando in modo silenzioso.
 * Qui quel ramo e' esplicito e commentato, perche' il comportamento conta.
 */
function parsePath(d) {
  const toks = d.match(/[MLQCZmlqcz]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const subpaths = [];
  const cmds = { M: 0, L: 0, Q: 0, C: 0, Z: 0 };
  let cur = null;
  let x = 0, y = 0;
  let i = 0;
  const num = () => Number(toks[i++]);

  while (i < toks.length) {
    const t = toks[i];
    if (/^[MLQCZ]$/i.test(t)) {
      cmds[t.toUpperCase()]++;
      i++;
      if (t.toUpperCase() === "Z") {
        // chiusura esplicita: la spezzata e' chiusa
        if (cur && cur.length) subpaths.push(cur);
        cur = null;
        continue;
      }
      if (t.toUpperCase() === "M") {
        x = num(); y = num();
        if (cur && cur.length) subpaths.push(cur);
        cur = [[x, y]];
      } else if (t.toUpperCase() === "L") {
        x = num(); y = num();
        cur?.push([x, y]);
      } else if (t.toUpperCase() === "Q") {
        const [cx, cy, ex, ey] = [num(), num(), num(), num()];
        if (cur) cur.push(...flattenQ([x, y], [cx, cy], [ex, ey]));
        x = ex; y = ey;
      } else if (t.toUpperCase() === "C") {
        const [c1x, c1y, c2x, c2y, ex, ey] = [num(), num(), num(), num(), num(), num()];
        if (cur) cur.push(...flattenC([x, y], [c1x, c1y], [c2x, c2y], [ex, ey]));
        x = ex; y = ey;
      }
    } else {
      // Numero senza comando. parsePath non implementa la ripetizione
      // implicita (es. "L 1 1 2 2"): chi lo usa non la produce. Il token viene
      // scartato esplicitamente invece che silenziosamente.
      i++;
    }
  }
  if (cur && cur.length) subpaths.push(cur);
  return { subpaths, cmds };
}

// ── adattatore AtelierCAD ───────────────────────────────────────────────────
//
// Il pannello dell'app e' { start, edges:[{n, p[]}] } con coordinate RELATIVE:
// la posizione si ricava camminando da start con walk(), e un edge con 1 punto
// e' una retta, con 2 una quadratica, con 3 una cubica. Il validatore lavora
// invece su una sequenza di punti ASSOLUTI. Questo e' l'unico ponte necessario:
// non si tocca la rappresentazione del pannello.

// La produzione campiona a 16 passi (samp(a,e,n=16)). Qui si replica esattamente
// quella: l'adattatore deve generare la stessa geometria che l'app disegna, non
// quella che il parser usa per i test.
const CURVE_N = 16;

/** walk(): percorre i bordi passando il punto di partenza a ciascuno. */
function walk(p, f) {
  let a = p.start;
  for (const e of p.edges) { f(e, a); a = e.p[e.p.length - 1]; }
}

/** samp(): campiona un edge a partire da 'a'. */
function samp(a, e, n = CURVE_N) {
  const P = [a, ...e.p], k = P.length;
  if (k === 2) return P;                      // retta
  const out = [a];
  for (let i = 1; i <= n; i++) {
    const t = i / n, u = 1 - t;
    if (k === 3) {                            // quadratica
      out.push([
        u*u*P[0][0] + 2*u*t*P[1][0] + t*t*P[2][0],
        u*u*P[0][1] + 2*u*t*P[1][1] + t*t*P[2][1],
      ]);
    } else {                                  // cubica
      const P4 = [a, ...e.p, P[e.p.length - 1]];
      out.push([
        u*u*u*P4[0][0] + 3*u*u*t*P4[1][0] + 3*u*t*t*P4[2][0] + t*t*t*P4[3][0],
        u*u*u*P4[0][1] + 3*u*u*t*P4[1][1] + 3*u*t*t*P4[2][1] + t*t*t*P4[3][1],
      ]);
    }
  }
  return out;
}

/**
 * poly(): il tracciato chiuso del pannello in punti assoluti.
 *
 * `close` aggiunge il punto iniziale in fondo. Va usato false per un tracciato
 * che non e' chiuso, altrimenti si inventa un lato che non c'e'.
 *
 * `skipFold` esclude il bordo 'piega': in AtelierCAD e' la piega del cartamodello,
 * non un lato di taglio, e va contato una volta sola anche se il pannello e'
 * simmetrico. Escludendolo, il tracciato risulta aperto sul lato della piega,
 * che e' la forma giusta da validare.
 */
function poly(p, { close = true, skipFold = true } = {}) {
  const out = [p.start];
  walk(p, (e, a) => {
    // samp() restituisce [a, ...campionati]: il punto iniziale e' gia' in out,
    // quindi si prende slice(1).
    const q = samp(a, e);
    // Il confronto con la produzione: poly() dell'app fa o.pop(), cioe'
    // rimuove l'ultimo punto. Serve perche' l'ultimo edge (piega, o l'ultimo
    // lato di un pannello piegato) e' quello che chiude il tracciato: tenerlo
    // aggiungerebbe un lato di chiusura che sul foglio di carta non esiste.
    if (skipFold && e.n === "piega") return;
    out.push(...q.slice(1));
  });
  if (close) {
    // close=true aggiunge il punto iniziale in fondo: e' la chiusura esplicita
    // richiesta dal validatore per un poligono.
    out.push(out[0]);
  } else {
    // close=false replica la produzione: si toglie l'ultimo punto, quello di
    // chiusura, e si lascia il tracciato aperto.
    out.pop();
  }
  return out;
}

/**
 * Il tracciato di un pannello gia' impacchettato dal DOM.
 *
 * Attraversa l'adattatore: {start,edges[]} -> poly() -> sequenza assoluta. E'
 * il punto in cui la geometria REALE generata dall'app entra nel validatore.
 */
function panelTrace(p) {
  return poly(p, { close: false, skipFold: true });
}

/** Verdetto su un pannello: l'adattatore completo, punto a punto. */
function validatePanel(p) {
  const pts = panelTrace(p);
  return analyse(pts, false);
}

const AtelierGeom = {
  EPS_ORIENT, EPS_ZERO, EPS_AREA, CURVE_SAMPLES,
  dist, sub, cross, orient,
  segIntersect, signedArea,
  analyse, isValidPolygon, findRepeatedVertex,
  parsePath, poly, panelTrace, validatePanel,
};
root.AtelierGeom = AtelierGeom;
})(typeof globalThis !== "undefined" ? globalThis : this);
