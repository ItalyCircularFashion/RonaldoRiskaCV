/* ═══════════════════════════════════════════════════════════════════
   dashboard.js — interazioni del Market Dashboard
   Dipende da: main.js che ha già caricato CFG (config.json) in window.
   Tutto è additivo e difensivo: se un elemento non esiste, la funzione
   esce senza errori (la pagina resta comunque leggibile).
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

(function () {

  if (!document.body.classList.contains('page-dashboard')) return;

  /* ── 1. Ordinamento tabelle ──────────────────────────────────────
     Ogni thead th[data-sort] diventa cliccabile. Il valore letto è
     numerico quando possibile (1.180 -> 1180), altrimenti testuale.
     aria-sort comunica lo stato agli screen reader. */
  /* Estrae il primo numero da un testo, gestendo i due formati in uso
     nella pagina: "1,180" (migliaia) e "0.82" (decimale). Usato sia
     dall'ordinamento sia dalla scala di intensita, cosi i due non
     possono divergere. */
  function parseNum(txt) {
    const m = (txt || '').match(/-?\d[\d.,]*/);
    if (!m) return null;
    let token = m[0].replace(/^[^\d-]+/, '');
    let n;
    if (/^-?\d{1,3}(,\d{3})+/.test(token)) n = parseFloat(token.replace(/,/g, ''));
    else n = parseFloat(token.replace(/,/g, '.'));
    if (isNaN(n)) return null;
    return token.includes('-') ? -Math.abs(n) : n;
  }

  function cellValue(td) {
    const raw = (td.textContent || '').trim().replace(/\s+/g, ' ');
    const n = parseNum(raw);
    return { num: n, txt: raw.toLowerCase() };
  }

  function initSort(table) {
    const thead = table.tHead;
    const tbody = table.tBodies[0];
    if (!thead || !tbody) return;

    thead.querySelectorAll('th').forEach((th, i) => {
      if (i === 0) return;                       // prima colonna = etichetta, non si ordina
      th.dataset.sort = '1';
      th.setAttribute('scope', 'col');
      th.setAttribute('tabindex', '0');
      th.setAttribute('role', 'columnheader');
      const ind = document.createElement('span');
      ind.className = 'sort-ind';
      ind.setAttribute('aria-hidden', 'true');
      ind.textContent = '↓';
      th.appendChild(ind);
    });

    let dir = 1, activeIdx = -1;

    function apply() {
      // La riga "Nessuna corrispondenza" vive nel tbody ma non e un dato:
      // senza questo filtro a.cells[activeIdx) e undefined e il sort muore.
      const rows = Array.from(tbody.rows).filter(r => !r.classList.contains('dash-empty-row'));
      rows.sort((a, b) => {
        const ca = a.cells[activeIdx], cb = b.cells[activeIdx];
        if (!ca || !cb) return 0;
        const va = cellValue(ca);
        const vb = cellValue(cb);
        if (va.num !== null && vb.num !== null && va.num !== vb.num) return (va.num - vb.num) * dir;
        if (va.num !== null && vb.num === null) return -1;
        if (va.num === null && vb.num !== null) return 1;
        return va.txt.localeCompare(vb.txt) * dir;
      });
      rows.forEach(r => tbody.appendChild(r));
    }

    function setActive(th, index) {
      thead.querySelectorAll('th').forEach(t => t.removeAttribute('aria-sort'));
      thead.querySelectorAll('.sort-ind').forEach(s => { s.textContent = '↓'; });
      activeIdx = index;
      th.setAttribute('aria-sort', dir === 1 ? 'ascending' : 'descending');
      th.querySelector('.sort-ind').textContent = dir === 1 ? '↑' : '↓';
    }

    thead.querySelectorAll('th[data-sort]').forEach((th, idx) => {
      const real = Array.from(thead.rows[0].cells).indexOf(th);
      function toggle() {
        if (activeIdx === real) { dir = -dir; }
        else { activeIdx = real; dir = 1; }
        setActive(th, real);
        apply();
        table.dispatchEvent(new CustomEvent('dash:sort', { bubbles: true }));
      }
      th.addEventListener('click', toggle);
      th.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
      void idx;
    });
  }

  /* ── 2. Intensità di colore sulla variazione ─────────────────────
     Il colore da solo dice la direzione; l'intensità dice la grandezza.
     Scala logaritmica perché +0.4% e +8.3% devono essere distinguibili
     senza che i valori piccoli spariscano. */
  function applyIntensity(table) {
    const cells = Array.from(table.querySelectorAll('tbody .td-up, tbody .td-dn'));
    // Magnitudine: preferisce il numero nella cella; se manca (freccia ▲/▼ o
    // etichetta testuale come "Alto"), prende il valore della colonna variazione
    // piu vicina a sinistra, cosi Trend e Var. 30gg condividono la scala.
    const mags = cells.map(c => {
      const own = Math.abs(parseNum(c.textContent) || 0);
      if (own) return own;
      // Freccia ▲/▼ o etichetta testuale ("Alto"): prende il valore della
      // colonna variazione piu vicina a sinistra, cosi Trend e Var. 30gg
      // stanno sulla stessa scala.
      const tr = c.closest('tr');
      if (!tr) return 0;
      const idx = Array.prototype.indexOf.call(tr.cells, c);
      for (let i = idx - 1; i >= 0; i--) {
        const n = Math.abs(parseNum(tr.cells[i].textContent) || 0);
        if (n) return n;
      }
      return 0;
    });
    const max = Math.max(...mags, 1);
    cells.forEach((c, i) => {
      const t = Math.log1p(mags[i]) / Math.log1p(max);   // 0..1
      // pavimento al 30% della scala: sotto quella soglia la tinta sparisce
      const scale = 0.3 + t * 0.7;
      c.style.setProperty('--intensita', (scale * 0.26).toFixed(3));
    });
  }

  /* ── 3. Ricerca live ───────────────────────────────────────────── */
  function initSearch(table, input, count) {
    if (!input || !table) return;
    const tbody = table.tBodies[0];
    const rowsAll = Array.from(tbody.rows);
    const empty = document.createElement('tr');
    empty.className = 'dash-empty-row';       // il filtro export la deve escludere
    empty.innerHTML = '<td colspan="' + table.tHead.rows[0].cells.length
      + '" class="dash-empty">Nessuna corrispondenza</td>';
    empty.hidden = true;
    tbody.appendChild(empty);

    function run() {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      rowsAll.forEach(r => {
        const hit = !q || r.textContent.toLowerCase().includes(q);
        r.hidden = !hit;
        if (hit) shown++;
      });
      empty.hidden = shown > 0;
      if (count) count.innerHTML = '<b>' + shown + '</b> / ' + rowsAll.length + ' righe';
      table.dispatchEvent(new CustomEvent('dash:filter', { bubbles: true }));
    }
    input.addEventListener('input', run);
    input.addEventListener('search', run);
    run();
  }

  /* ── 4. Export CSV di ciò che è visibile ─────────────────────────
     Se il CSV contiene solo i dati che l'utente sta guardando, l'export
     è utile. Zero dipendenze: Blob + URL.createObjectURL. */
  function initExport(table, btn) {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const head = Array.from(table.tHead.rows[0].cells)
        .map(th => th.textContent.replace(/\s*[↓↑]\s*$/, '').trim());
      const rows = Array.from(table.tBodies[0].rows)
        .filter(r => !r.hidden && !r.classList.contains('dash-empty-row'))
        .map(r => Array.from(r.cells).map(td => {
          const txt = (td.textContent || '').trim().replace(/\s+/g, ' ');
          return '"' + txt.replace(/"/g, '""') + '"';
        }));
      const meta = 'Dati dimostrativi - struttura API-ready, non quotazioni in tempo reale\n';
      const csv = meta + head.map(h => '"' + h + '"').join(';') + '\n' + rows.map(r => r.join(';')).join('\n');
      const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'dashboard-prato-' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  }

  /* main.js dichiara `let CFG` in uno script classico: le dichiarazioni let
     top-level vivono nel lexical scope globale e NON diventano proprieta di
     window, quindi window.CFG e undefined. Qui si rilegge config.json
     direttamente invece di modificare main.js (che e condiviso con le altre
     5 pagine). La richiesta e servita dalla cache HTTP. */
  let CFGL = window.CFG || null;
  function loadConfig() {
    if (CFGL) return Promise.resolve(CFGL);
    return fetch('data/config.json')
      .then(r => r.json())
      .then(j => { CFGL = j; return j; })
      .catch(() => null);
  }

  /* ── 5. Tooltip sui grafici ───────────────────────────────────────
     Ridisegna il canvas su hover con il punto escluso dal calcolo del
     min/max, così la verticale del cursore corrisponde davvero al dato. */
  function initChartTips(CFG) {
    const tip = document.createElement('div');
    tip.className = 'dash-tip';
    tip.setAttribute('role', 'status');
    document.body.appendChild(tip);

    document.querySelectorAll('.chart-card').forEach(card => {
      const canvas = card.querySelector('canvas.sparkline');
      if (!canvas || !CFG) return;
      // main.jsassegna id="wrap-<chartId>" alla card e id="<chartId>" al canvas:
      // e il canvas il riferimento corretto, non la card.
      const id = canvas.id;
      if (!id) return;
      const chart = (CFG.charts || []).find(c => c.id === id);
      if (!chart) return;
      const data = (CFG.series || {})[chart.series] || [];
      if (data.length < 2) return;

      const originalDraw = canvas.dataset.drawn;

      function draw(hl) {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.offsetWidth || 300, h = 72;
        canvas.width = w * dpr; canvas.height = h * dpr;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const min = Math.min(...data), max = Math.max(...data), range = (max - min) || 1;
        const padY = 8, W = w, H = h - padY * 2;
        const px = i => (i / (data.length - 1)) * W;
        const py = v => padY + H - (((v - min) / range) * H);

        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, chart.color + '2E');
        grad.addColorStop(1, chart.color + '00');
        ctx.beginPath();
        ctx.moveTo(px(0), py(data[0]));
        for (let i = 1; i < data.length; i++) {
          const cx = (px(i - 1) + px(i)) / 2;
          ctx.bezierCurveTo(cx, py(data[i - 1]), cx, py(data[i]), px(i), py(data[i]));
        }
        ctx.lineTo(px(data.length - 1), h); ctx.lineTo(0, h); ctx.closePath();
        ctx.fillStyle = grad; ctx.fill();

        ctx.beginPath();
        ctx.moveTo(px(0), py(data[0]));
        for (let i = 1; i < data.length; i++) {
          const cx = (px(i - 1) + px(i)) / 2;
          ctx.bezierCurveTo(cx, py(data[i - 1]), cx, py(data[i]), px(i), py(data[i]));
        }
        ctx.strokeStyle = chart.color; ctx.lineWidth = 1.75; ctx.lineJoin = 'round'; ctx.stroke();

        if (hl !== null && hl !== undefined) {
          ctx.strokeStyle = chart.color + '55'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(px(hl) + .5, 0); ctx.lineTo(px(hl) + .5, h); ctx.stroke();
          ctx.beginPath(); ctx.arc(px(hl), py(data[hl]), 3.5, 0, Math.PI * 2);
          ctx.fillStyle = chart.color; ctx.fill();
          ctx.strokeStyle = 'var(--bg)'; ctx.lineWidth = 1.5; ctx.stroke();
        }
      }

      canvas.addEventListener('mousemove', e => {
        const r = canvas.getBoundingClientRect();
        const i = Math.round(((e.clientX - r.left) / r.width) * (data.length - 1));
        const idx = Math.max(0, Math.min(data.length - 1, i));
        draw(idx);
        const first = data[0];
        const chg = ((data[idx] - first) / first) * 100;
        const sign = chg >= 0 ? '+' : '';
        const wk = idx + 1;
        tip.innerHTML = '<span class="w">settimana ' + wk + ' di ' + data.length + '</span><br><b>'
          + data[idx] + '</b> <span class="w">(' + sign + chg.toFixed(1) + '% dal primo punto)</span>';
        tip.style.left = e.clientX + 'px';
        tip.style.top = (r.top + 4) + 'px';
        tip.classList.add('on');
      });
      canvas.addEventListener('mouseleave', () => { draw(null); tip.classList.remove('on'); });
      canvas.addEventListener('blur', () => { draw(null); tip.classList.remove('on'); });
      canvas.setAttribute('tabindex', '0');
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', chart.title + ': andamento ultime ' + data.length + ' settimane, da '
        + data[0] + ' a ' + data[data.length - 1]);
      void originalDraw;
    });
  }

  /* ── 6. Colonna evidenziata al passaggio del mouse ─────────────── */
  function initColHighlight(table) {
    const ths = Array.from(table.tHead ? table.tHead.rows[0].cells : []);
    const tbody = table.tBodies[0];
    if (!ths.length || !tbody) return;
    ths.forEach((th, i) => {
      th.addEventListener('mouseenter', () => {
        th.classList.add('col-hover');
        Array.from(tbody.rows).forEach(r => {
          if (r.cells[i]) r.cells[i].style.boxShadow = 'inset 1px 0 0 var(--bdr-3)';
        });
      });
      th.addEventListener('mouseleave', () => {
        th.classList.remove('col-hover');
        Array.from(tbody.rows).forEach(r => {
          if (r.cells[i]) r.cells[i].style.boxShadow = '';
        });
      });
    });
  }

  /* ── 7. Bootstrap ──────────────────────────────────────────────── */
  function boot() {
    if (window.__dashReady) return;
    window.__dashReady = true;

    document.querySelectorAll('[data-dash-table]').forEach(table => {
      initSort(table);
      applyIntensity(table);
      initColHighlight(table);
      const search = document.querySelector(table.dataset.dashSearch || '#no-search');
      const count = document.querySelector(table.dataset.dashCount || '#no-count');
      const exp = document.querySelector(table.dataset.dashExport || '#no-export');
      if (search) initSearch(table, search, count);
      if (exp) initExport(table, exp);
      // ricalcola l'intensita se l'utente filtra (il max si restringe)
      table.addEventListener('dash:filter', () => applyIntensity(table));
    });

    loadConfig().then(cfg => initChartTips(cfg));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 120));
  } else {
    setTimeout(boot, 120);
  }
})();
