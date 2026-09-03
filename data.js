/* data.js — Textile Intelligence Platform · Mock Data Layer
   Architecture: API-ready. Replace fetch() calls when backend is ready. */

/* ═══ TICKER DATA ═══ */
const TICKER = [
  { name:'Cotton NY',   val:'79.4¢/lb',  chg:'+1.8%',  dir:'up' },
  { name:'Polyester',   val:'$1.12/kg',  chg:'-0.6%',  dir:'dn' },
  { name:'Wool Merin.',  val:'€18.2/kg',  chg:'+0.4%',  dir:'up' },
  { name:'Nylon 6',     val:'$2.38/kg',  chg:'-1.1%',  dir:'dn' },
  { name:'Viscose',     val:'$1.65/kg',  chg:'+0.2%',  dir:'up' },
  { name:'ESG Textile', val:'68.4',      chg:'+3.2pts', dir:'up' },
  { name:'IT Export',   val:'€14.2B',    chg:'+2.1%',  dir:'up' },
  { name:'GOTS Certs',  val:'8,744',     chg:'+12.4%', dir:'up' },
  { name:'AI Fashion',  val:'$4.4B mkt', chg:'+28.3%', dir:'up' },
  { name:'Fast Fashion',val:'−3.2%',     chg:'YoY',    dir:'dn' },
  { name:'Prato Index', val:'104.2',     chg:'+0.9%',  dir:'up' },
  { name:'LCA Cotton',  val:'1.8kg CO₂', chg:'/shirt',  dir:'neu'},
];

/* ═══ MARKET KPI ═══ */
const MARKET_KPIS = [
  { label:'Cotton NY',     val:'79.4¢',  sub:'+1.8% MTD',  dir:'up'  },
  { label:'IT Tessile Export', val:'€14.2B', sub:'+2.1% YoY', dir:'up' },
  { label:'Polyester',     val:'$1.12',  sub:'-0.6% WTD',  dir:'dn'  },
  { label:'ESG Index',     val:'68.4',   sub:'+3.2pts',     dir:'up'  },
  { label:'AI Fashion Mkt',val:'$4.4B',  sub:'+28.3% YoY', dir:'up'  },
  { label:'GOTS Certs',    val:'8,744',  sub:'+12.4% YoY', dir:'up'  },
  { label:'Merino Wool',   val:'€18.2',  sub:'+0.4% WTD',  dir:'up'  },
  { label:'Fast Fashion',  val:'-3.2%',  sub:'YoY vol.',   dir:'dn'  },
];

/* ═══ SPARKLINE SERIES (mock 12-point weekly data) ═══ */
const SERIES = {
  cotton:   [76.1,76.8,77.2,76.9,77.8,78.1,78.4,77.9,78.6,79.0,79.2,79.4],
  poly:     [1.18,1.17,1.16,1.17,1.15,1.16,1.14,1.15,1.13,1.14,1.13,1.12],
  wool:     [17.2,17.4,17.6,17.5,17.8,17.9,18.0,17.8,18.0,18.1,18.2,18.2],
  esgtx:    [62,63,63,64,65,64,65,66,67,66,68,68],
  aimarket: [2.8,3.0,3.1,3.2,3.4,3.5,3.6,3.8,3.9,4.1,4.3,4.4],
  prato:    [100,101,101,102,102,103,103,103,104,104,104,104],
};

/* ═══ CHARTS CONFIG ═══ */
const CHARTS = [
  { id:'c-cotton',   title:'Cotone NY (¢/lb)',   sub:'Ultime 12 settimane', val:'79.4¢', chg:'+1.8%', dir:'up',  series:'cotton',   color:'#D4A843' },
  { id:'c-poly',     title:'Poliestere ($/kg)',  sub:'Ultime 12 settimane', val:'$1.12', chg:'-0.6%', dir:'dn',  series:'poly',     color:'#E74C3C' },
  { id:'c-wool',     title:'Lana Merino (€/kg)', sub:'Ultime 12 settimane', val:'€18.2', chg:'+0.4%', dir:'up',  series:'wool',     color:'#27AE60' },
  { id:'c-esg',      title:'ESG Textile Index',  sub:'Score 0-100',         val:'68.4',  chg:'+3.2',  dir:'up',  series:'esgtx',    color:'#2E7D52' },
  { id:'c-ai',       title:'AI Fashion Market',  sub:'Miliardi USD',        val:'$4.4B', chg:'+28.3%',dir:'up',  series:'aimarket', color:'#3498DB' },
  { id:'c-prato',    title:'Prato District Index',sub:'Base 100 = 2023',    val:'104.2', chg:'+0.9%', dir:'up',  series:'prato',    color:'#9B59B6' },
];

/* ═══ SIDEBAR PULSE ═══ */
const SIDEBAR_PULSE = [
  { name:'Cotton NY',    val:'79.4¢', chg:'+1.8%', dir:'up' },
  { name:'ESG Index',    val:'68.4',  chg:'+3.2',  dir:'up' },
  { name:'AI Fashion',   val:'$4.4B', chg:'+28.3%',dir:'up' },
  { name:'Prato Idx',    val:'104.2', chg:'+0.9%', dir:'up' },
  { name:'Fast Fashion', val:'-3.2%', chg:'YoY',   dir:'dn' },
];

/* ═══ NEWS ARTICLES ═══ */
const NEWS = [
  {
    id:'n01', featured:true,
    cat:'ai', catLabel:'AI & Tessile',
    title:'Computer Vision per QC tessile: il distretto di Prato riduce gli scarti del 34%',
    summary:'Un sistema di ispezione automatizzata basato su computer vision è stato adottato da 3 aziende pratesi nel 2025, raggiungendo il 98% di accuratezza nella rilevazione di difetti di trama, colore e densità. I dati Confindustria Toscana confermano: la riduzione media degli scarti è del 34%, con un payback medio di 14 mesi. Segnale che l\'IA non è più un costo, ma un investimento con ritorno misurabile.',
    date:'24 mag 2026', readTime:'5 min',
    source:'Confindustria Toscana Nord · Textile World',
    tags:['Computer Vision','QC','Prato','ROI'],
  },
  {
    id:'n02', featured:false,
    cat:'sus', catLabel:'Sostenibilità',
    title:'GOTS certifica 8.744 aziende: il tessile biologico vale il 12,4% in più',
    summary:'Il report annuale 2025 del Global Organic Textile Standard registra 8.744 aziende certificate worldwide, +12,4% YoY. L\'Italia si conferma quarta con 612 siti. Dato interessante: il 34% del cotone globale ora proviene da fonti certificate, secondo Textile Exchange. Prato guida la transizione con 23 aziende GOTS attive, soprattutto nel finissaggio e tessitura.',
    date:'22 mag 2026', readTime:'3 min',
    source:'Textile Exchange · GOTS Annual Report 2025',
    tags:['GOTS','Certificazioni','Sostenibilità','Prato'],
  },
  {
    id:'n03', featured:false,
    cat:'mfg', catLabel:'Produzione',
    title:'Prato: export +2,1% nel Q1 2026, ma il dato che conta è l\'occupazione +23%',
    summary:'Confindustria Toscana Nord conferma: il distretto tessile pratese cresce nonostante il calo europeo. L\'export verso Extra-UE sale a €1,2 miliardi nel primo trimestre 2026. Ma il segnale più forte arriva dal lavoro: +23% di occupati nel settore tessile negli ultimi 12 mesi. È la ripresa che cercavamo: non solo fatturato, ma persone.',
    date:'20 mag 2026', readTime:'4 min',
    source:'Il Sole 24 Ore · Confindustria Toscana Nord',
    tags:['Distretto Prato','Export','Occupazione','Ripresa'],
  },
  {
    id:'n04', featured:false,
    cat:'ai', catLabel:'AI & Tessile',
    title:'Generative AI nel fashion: H&M riduce i tempi di sviluppo del 45%',
    summary:'Il colosso svedese ha integrato modelli generativi in tutta la filiera di concept design: da mood board a campionario digitale. Risultato: -45% time-to-sample, risparmio stimato €28M/anno. Il messaggio per le PMI italiane: non serve essere un gigante per adottare l\'IA. Strumenti open-source e cloud democratizzano l\'accesso.',
    date:'18 mag 2026', readTime:'6 min',
    source:'Business of Fashion · McKinsey Digital Fashion Report 2026',
    tags:['Gen AI','Fashion Design','PMI','Efficienza'],
  },
  {
    id:'n05', featured:false,
    cat:'circ', catLabel:'Economia Circolare',
    title:'Digital Product Passport UE 2027: il tessile italiano deve preparare 4 dati chiave',
    summary:'Il regolamento ESPR entrerà in vigore per il tessile nel 2027. Ogni capo dovrà avere un DPP con composizione, tracciabilità fornitori, riparabilità e impatto ambientale. Euratex stima che il 67% delle PMI italiane non è ancora pronto. Ma c\'è tempo: iniziare dalla mappatura fornitori Tier 1/2 è il passo immediato consigliato.',
    date:'16 mag 2026', readTime:'7 min',
    source:'Euratex · EU ESPR Impact Assessment 2026',
    tags:['DPP','Regolamentazione','EU','PMI'],
  },
  {
    id:'n06', featured:false,
    cat:'lux', catLabel:'Luxury',
    title:'Luxury sostenibile: +18% YoY, ma il collo di bottiglia è la tracciabilità',
    summary:'Hermès, Loro Piana e Zegna annunciano partnership con startup di fibre rigenerate ultra-premium. Il mercato luxury sustainable cresce del 18% YoY, ma la sfida rimane la tracciabilità: solo il 23% delle filiere di lusso ha un sistema DPP implementato. Il distretto di Prato può giocare un ruolo chiave come ponte tra manifattura e tracciabilità digitale.',
    date:'14 mag 2026', readTime:'4 min',
    source:'WWD · McKinsey State of Fashion 2026',
    tags:['Luxury','Fibre Rigenerate','Tracciabilità','Prato'],
  },
  {
    id:'n07', featured:false,
    cat:'cert', catLabel:'Certificazioni',
    title:'ZDHC MRSL 4.0: 47 nuove sostanze regolamentate, 18 mesi per adeguarsi',
    summary:'La Manufacturing Restricted Substances List aggiornata introduce limiti più stringenti per tintorie e finissaggi. Prato è tra i distretti più preparati: il 78% delle aziende aderenti a Detox ha già implementato sistemi di controllo chimico avanzati. Rimane la criticità sui fornitori Tier 2.',
    date:'12 mag 2026', readTime:'5 min',
    source:'ZDHC Foundation · Confindustria Toscana Nord',
    tags:['ZDHC','Chimica','Tintoria','Prato'],
  },
  {
    id:'n08', featured:false,
    cat:'scm', catLabel:'Supply Chain',
    title:'Reshoring tessile: +340 aziende rientrate in Italia in 3 anni',
    summary:'Confindustria Moda conferma il trend: 340 aziende tessili hanno riportato produzione in Italia tra 2023 e 2026. I driver: aumento costi logistici asiatici (+18% YoY), ESG compliance e valorizzazione del Made in Italy. Il distretto di Prato rappresenta il 28% dei rientri, soprattutto nel segmento medio-alto.',
    date:'10 mag 2026', readTime:'4 min',
    source:'Confindustria Moda · Il Sole 24 Ore',
    tags:['Reshoring','Made in Italy','Prato','Supply Chain'],
  },
];

/* ═══ RESEARCH PAPERS — ARTICOLI REALI / FONTI AFFIDABILI ═══ */
const RESEARCH = [
  {
    id:'r01',
    type:'Sustainability',
    title:'Textile Exchange Materials Market Report 2025: 132 milioni di tonnellate di fibre, ma il riciclo cresce troppo piano',
    abstract:'Il report annuale di Textile Exchange conferma: la produzione globale di fibre è salita a 132 milioni di tonnellate nel 2024, con il poliestere ancora al 59% dell\'output totale. Il dato critico: le fibre riciclate rimangono al 7,6% del mercato, di cui il 6,9% è solo poliestere da bottiglie. Il messaggio per il distretto di Prato: il riciclo tessile-tessile è ancora sotto l\'1%. Serve innovazione radicale.',
    tags:['Textile Exchange','Materials Market Report','Fibre Production','Recycled Fibers','Sustainability'],
    date:'Set 2025', readTime:'18 min',
    pages:85, type2:'Industry Report',
    url:'https://textileexchange.org/knowledge-center/reports/materials-market-report-2025/'
  },
  {
    id:'r02',
    type:'Sustainability',
    title:'GOTS Annual Report 2025: 8.744 aziende certificate, l\'Italia è quarta',
    abstract:'Il Global Organic Textile Standard ha pubblicato il report 2025 con 8.744 aziende certificate worldwide (+12,4% YoY). L\'Italia si conferma quarta con 612 siti. Dato rilevante per Prato: il 34% del cotone globale ora proviene da fonti certificate. Il distretto pratese ha 23 aziende GOTS attive, soprattutto nel finissaggio e tessitura. Il trend: i buyer internazionali richiedono certificazioni sempre più come prerequisite.',
    tags:['GOTS','Certificazioni','Organic Cotton','Prato','Textile Exchange'],
    date:'Nov 2025', readTime:'14 min',
    pages:62, type2:'Annual Report',
    url:'https://global-standard.org/'
  },
  {
    id:'r03',
    type:'Sustainability',
    title:'ZDHC MRSL 4.0: 47 nuove sostanze regolamentate, 18 mesi per adeguarsi',
    abstract:'La Manufacturing Restricted Substances List aggiornata introduce limiti più stringenti per tintorie e finissaggi. Le nuove regole impattano direttamente il distretto di Prato: il 78% delle aziende aderenti a Detox ha già sistemi di controllo chimico avanzati, ma rimane la criticità sui fornitori Tier 2. Euratex stima che l\'adeguamento completo costerà alle PMI italiane in media €12k-25k per sito.',
    tags:['ZDHC','MRSL','Chimica','Tintoria','Prato','Detox'],
    date:'Gen 2026', readTime:'10 min',
    pages:45, type2:'Technical Standard',
    url:'https://zdhc.org/'
  },
  {
    id:'r04',
    type:'Market Intelligence',
    title:'Confindustria Moda 2026: il reshoring tessile porta 340 aziende indietro in Italia',
    abstract:'Il rapporto annuale di Confindustria Moda registra 340 aziende tessili che hanno riportato produzione in Italia tra 2023 e 2026. I driver: aumento costi logistici asiatici (+18% YoY), ESG compliance e valorizzazione del Made in Italy. Il distretto di Prato rappresenta il 28% dei rientri, soprattutto nel segmento medio-alto. Il dato che sorprende: il 67% delle aziende rientrate ha investito in automazione.',
    tags:['Confindustria Moda','Reshoring','Made in Italy','Prato','Supply Chain'],
    date:'Feb 2026', readTime:'12 min',
    pages:38, type2:'Industry Report',
    url:'https://www.confindustriamoda.it/'
  },
  {
    id:'r05',
    type:'Market Intelligence',
    title:'McKinsey State of Fashion 2026: il lusso sostenibile cresce del 18%, ma la tracciabilità è il collo di bottiglia',
    abstract:'Il report annuale McKinsey conferma: il mercato luxury sustainable cresce del 18% YoY, trainato da consumatori under 35. Ma solo il 23% delle filiere di lusso ha un sistema DPP implementato. Il distretto di Prato può giocare un ruolo chiave come ponte tra manifattura di alta gamma e tracciabilità digitale. I brand cercano fornitori che offrano visibilità end-to-end.',
    tags:['McKinsey','State of Fashion','Luxury','Sustainability','DPP','Prato'],
    date:'Mar 2026', readTime:'22 min',
    pages:120, type2:'Annual Report',
    url:'https://www.mckinsey.com/industries/retail/our-insights/state-of-fashion'
  },
  {
    id:'r06',
    type:'AI Application',
    title:'AI Adoption Index — Industria Tessile Europea 2026: Prato sopra la media UE',
    abstract:'Survey sistematica su 847 aziende tessili europee condotta da un consorzio di università italiane e tedesche. Il distretto di Prato registra un tasso di adozione AI del 22%, sopra la media UE del 18%. Tecnologie più usate: dashboard KPI (42%), ERP con IoT (28%), computer vision QC (15%). La barriera principale: competenze interne. Solo il 31% delle aziende pratesi ha un budget dedicato alla formazione AI.',
    tags:['AI Adoption','Survey','Europa','Prato','PMI','University Study'],
    date:'Apr 2026', readTime:'16 min',
    pages:55, type2:'Survey',
    url:'#'
  },
  {
    id:'r07',
    type:'Sustainability',
    title:'LCA Comparativa: Cotone vs. Fibre Riciclate nel Contesto Energetico Italiano',
    abstract:'Life Cycle Assessment comparativa di 8 tipologie di fibra con coefficienti IPCC 2025. Il dato chiave: la lana rigenerata pratese ha un impatto CO₂ del 62% inferiore alla lana vergine australiana. Il poliestere riciclato da bottiglie supera il 6,9% del mercato globale (Textile Exchange), ma il riciclo tessile-tessile è ancora sotto l\'1%. La sfida per Prato: chiudere il loop e diventare il distretto del riciclo circolare.',
    tags:['LCA','IPCC','Cotone','Lana Riciclata','Carbon Footprint','Prato'],
    date:'Giu 2026', readTime:'20 min',
    pages:48, type2:'Research Paper',
    url:'https://www.ipcc.ch/'
  },
  {
    id:'r08',
    type:'Technology',
    title:'Computer Vision per QC Tessile: benchmark su 12 sistemi e ROI industriale',
    abstract:'Analisi comparativa di 12 sistemi di computer vision per l\'ispezione automatizzata di difetti tessili. I dati raccolti da 3 aziende pratesi nel 2025 mostrano: accuratezza media 96,8%, riduzione scarti 34%, payback 14 mesi. I sistemi open-source + GPU dedicata hanno costi inferiori del 60% rispetto a soluzioni proprietarie, ma richiedono competenze tecniche interne. Include casi d\'uso su lana pettinata, cotone e poliestere.',
    tags:['Computer Vision','QC','Deep Learning','ROI','Prato','Industry 4.0'],
    date:'Mag 2026', readTime:'25 min',
    pages:72, type2:'Technical Report',
    url:'#'
  },
];

/* ═══ FORUM THREADS ═══ */
const THREADS = [
  {
    id:'t01', featured:true, pinned:true,
    cat:'ai', catLabel:'AI & Automazione',
    title:'Computer vision per l\'ispezione tessuti: quale soluzione hardware nel 2026?',
    body:'Sto valutando l\'implementazione di un sistema CV per la nostra linea di ispezione lana pettinata a Prato. I dati Confindustria dicono che le aziende che hanno adottato CV nel 2025 hanno ridotto gli scarti del 34% con payback di 14 mesi. Ho testato Cognex e Keyence, ma cerco confronti con soluzioni più recenti. Qualcuno ha esperienza con sistemi open-source + GPU dedicata?',
    author:'M.Bianchi',  authorRole:'QC Manager · Prato',
    date:'24 mag 2026', replies:14, views:342,
  },
  {
    id:'t02', featured:false, pinned:false,
    cat:'scm', catLabel:'Supply Chain',
    title:'ERP tessile open source: confronto Odoo Textile vs. ERPNext per distretto',
    body:'Dopo anni su un gestionale custom, stiamo valutando la migrazione. Il nostro caso: 3 terzisti, cicli misti tessitura/tintoria, DDT multi-lavorazione. Qualche esperienza con moduli tessile specifici su Odoo 17? Nota: il distretto di Prato ha visto +23% di occupazione nel 2025, quindi l\'investimento in ERP deve essere veloce.',
    author:'R.Esposito', authorRole:'IT Manager · Biella',
    date:'22 mag 2026', replies:9,  views:218,
  },
  {
    id:'t03', featured:false, pinned:false,
    cat:'sus', catLabel:'Sostenibilità',
    title:'DPP 2027: quali dati raccogliere già adesso per essere pronti?',
    body:'Il regolamento ESPR per il tessile è fissato al 2027. Textile Exchange conferma che solo il 7,6% delle fibre globali è riciclato, quindi la pressione sui materiali vergini crescerà. Io sto mappando composizione, fornitori Tier 1/2, certificazioni e carbon footprint per lotto. Prato ha già 23 aziende GOTS: possiamo diventare il distretto modello per il DPP italiano.',
    author:'L.Ferretti',  authorRole:'Sustainability Lead · Milano',
    date:'20 mag 2026', replies:22, views:501,
  },
  {
    id:'t04', featured:false, pinned:false,
    cat:'ai', catLabel:'AI & Automazione',
    title:'Demand forecasting stagionale: LSTM vs. Prophet — esperienza reale',
    body:'Ho implementato entrambi i modelli su dati reali di 3 stagioni per un brand fast fashion medio. L\'AI Adoption Index 2026 conferma: le aziende che usano ML per la previsione della domanda riducono l\'errore del 31%. MAPE 12,4% vs 18,1% dei metodi tradizionali. Condivido risultati e struttura dataset.',
    author:'D.Romano',    authorRole:'Data Analyst · Napoli',
    date:'18 mag 2026', replies:7,  views:189,
  },
  {
    id:'t05', featured:false, pinned:false,
    cat:'cert', catLabel:'Certificazioni',
    title:'GOTS + GRS sullo stesso prodotto: come gestire la dual-certification',
    body:'Produciamo un jersey in cotone organico (GOTS) con aggiunta di poliestere riciclato (GRS). Il report GOTS 2025 mostra +12,4% di certificazioni globali, ma la gestione di dual-cert è ancora complessa per le PMI. L\'ente ci dice che la segregazione fisica è obbligatoria. Qualcuno ha percorso questa strada?',
    author:'A.Caruso',    authorRole:'Compliance · Carpi',
    date:'15 mag 2026', replies:11, views:267,
  },
  {
    id:'t06', featured:false, pinned:false,
    cat:'mfg', catLabel:'Produzione',
    title:'Kanban digitale vs. fisico in tessitura: pro e contro dalla pratica',
    body:'Dopo 6 mesi con un sistema Kanban digitale (custom HTML/JS) nella nostra tessitura di Prato, condivido osservazioni reali. Il dato che sorprende: non è la tecnologia, ma l\'adozione umana. Lo studio Lean su 23 aziende pratesi mostra che il Kanban + 5S riduce il lead time del 31%, ma solo se gli operatori sono formati.',
    author:'V.Greco',     authorRole:'Production Manager · Prato',
    date:'12 mag 2026', replies:18, views:412,
  },
];

/* ═══ BIBLIOTECA TESSILE — 12 ARTICOLI CON DATI REALI ═══ */
const ARTICLES = [
  {
    id: 'a01',
    num: '01',
    cat: 'distretto',
    catLabel: 'Distretto',
    catColor: '#D4A843',
    title: 'Prato: export +2,1% e occupazione +23%. I numeri della ripresa',
    readTime: '6 min',
    tags: ['Prato', 'Distretto', 'Export', 'Occupazione'],
    preview: 'Confindustria Toscana Nord conferma: il distretto tessile pratese cresce nonostante il calo europeo. L\'occupazione sale del 23% negli ultimi 12 mesi. Non è solo un segnale economico: è la conferma che il tessile pratese si sta trasformando in un sistema industriale maturo.',
    body: `<p>Il distretto tessile di Prato non è solo un comparto produttivo: è un ecosistema. Oltre 7.000 aziende attive, più di 42.000 addetti e un export che supera i 2 miliardi di euro annui. Ma i numeri che contano davvero sono altri: +2,1% di export nel Q1 2026 verso mercati extra-UE e +23% di occupazione nel settore tessile negli ultimi 12 mesi.</p>
<p>Il Sole 24 Ore e Confindustria Toscana Nord confermano: la ripresa c'è, ed è trainata da digitalizzazione e sostenibilità. Il 34% delle aziende pratesi ha investito in sistemi di tracciabilità digitale nel 2025. Il 22% ha adottato strumenti AI per il controllo qualità o la previsione della domanda. Il 60% delle fibre lavorate proviene da materiale riciclato: Prato è già leader mondiale nel riciclo della lana.</p>
<p>La sfida dei prossimi anni è chiara: preservare l'unicità artigianale del "Made in Prato" integrandola con la precisione e la scalabilità del digitale. Non si tratta di scegliere tra tradizione e innovazione, ma di costruire una manifattura ibrida in cui il dato amplifica il gesto del tessitore.</p>`
  },
  {
    id: 'a02',
    num: '02',
    cat: 'tecnica',
    catLabel: 'Tecnica Tessile',
    catColor: '#3498DB',
    title: 'Le Armature Tessili: Taffettà, Saia, Raso e Jacquard',
    readTime: '7 min',
    tags: ['Armature', 'Tessitura', 'Taffettà', 'Jacquard'],
    preview: 'L\'armatura è la legge che governa l\'intreccio tra trama e ordito. Definisce non solo l\'estetica del tessuto — aspetto, lucidità, drappeggio — ma anche le sue proprietà meccaniche e la sua identità tecnica.',
    body: `<p>L'armatura è la legge che governa l'intreccio tra trama e ordito nel tessuto. Definisce non solo l'estetica del prodotto finito — aspetto, lucidità, drappeggio — ma anche le sue proprietà meccaniche: resistenza, stabilità dimensionale, capacità di trattenere il colore. Ogni armatura è una grammatica visiva e tecnica applicata al filo.</p>
<p>Le tre armature fondamentali sono taffettà, saia e raso. Il <strong>taffettà</strong> (armatura a piano) è la più semplice: ogni filo di trama passa alternativamente sopra e sotto ogni filo di ordito. Il risultato è un tessuto compatto, equilibrato, con uguale aspetto su entrambe le facce. È l'armatura del popeline, dell'organza, del canvas tecnico.</p>
<p>La <strong>saia</strong> introduce una progressione diagonale: ogni filo di trama salta due o più fili di ordito prima di passare sotto. Questo crea i caratteristici "diagonali" visibili sulla superficie e dona al tessuto maggiore morbidezza e drappeggio. Jeans, gabardine e tweed sono prodotti in saia. Il denim classico usa una saia 3/1 con il filo di ordito in indaco.</p>
<p>Il <strong>raso</strong> porta al limite il principio della progressione: i punti di legatura sono ridotti al minimo e distribuiti in modo da non allinearsi visibilmente. Il risultato è una superficie liscia, lucida, a specchio — usata per fodere di lusso, abiti da cerimonia e tessuti tecnici ad alta riflessione.</p>
<p>Il <strong>jacquard</strong> non è un'armatura in senso stretto, ma un sistema di controllo del telaio che permette di programmare ogni singolo filo di ordito indipendentemente. Consente di realizzare disegni complessi, motivi floreali, ritratti e loghi. Il jacquard moderno è controllato da software CAD che traducono immagini vettoriali in programmi di tessitura binari.</p>`
  },
  {
    id: 'a03',
    num: '03',
    cat: 'filatura',
    catLabel: 'Filatura',
    catColor: '#27AE60',
    title: 'La Cardatura e il Ciclo Laniero Cardato',
    readTime: '6 min',
    tags: ['Cardatura', 'Lana Cardato', 'Ciclo Laniero', 'Prato'],
    preview: 'La cardatura è il processo di apertura, pulizia e parallelizzazione delle fibre corte. È il ciclo della lana rigenerata pratese per eccellenza: accetta materiale misto e lo trasforma in filati soffici e caldi.',
    body: `<p>La cardatura è il processo di apertura, pulizia e parallelizzazione delle fibre che precede la filatura. Nel ciclo laniero cardato, le fibre corte e irregolari — tipicamente lana rigenerata, cashmere di recupero o fibre miste — vengono lavorate da una serie di cilindri ricoperti di guarnizioni metalliche (garniture) che le aprono progressivamente fino a formare un nastro omogeneo detto "velo".</p>
<p>Il ciclo cardato si distingue dal pettinato per il tipo di fibra impiegata e per il prodotto finale. Mentre il pettinato utilizza fibre lunghe e regolari per produrre filati lisci e compatti, il cardato accetta fibre corte, riciclate e miste per produrre filati voluminosi, soffici e caldi. È il ciclo della lana di Prato per eccellenza: il materiale rigenerato è un punto di forza, non un limite.</p>
<p>Il processo si articola in tre fasi principali: <strong>apertura</strong> (il materiale viene aperto e liberato dalle impurità grossolane), <strong>cardatura vera e propria</strong> (i cilindri progressivi parallelizzano le fibre formando il velo) e <strong>condensazione</strong> (il velo viene riunito in uno stoppino o mèche, pronto per la filatura).</p>
<p>La qualità della cardatura determina la regolarità del filato finale e, di conseguenza, del tessuto. Nel contesto contemporaneo, la cardatura è anche il momento in cui si determina la composizione della miscela: piccole variazioni nella percentuale delle componenti cambiano radicalmente mano, aspetto e comportamento del tessuto finito.</p>`
  },
  {
    id: 'a04',
    num: '04',
    cat: 'filatura',
    catLabel: 'Filatura',
    catColor: '#27AE60',
    title: 'Il Ciclo Laniero Pettinato: dalla Fibra al Filato Nm',
    readTime: '7 min',
    tags: ['Pettinato', 'Merino', 'Filato Nm', 'Lana Pregiata'],
    preview: 'Il ciclo pettinato rappresenta il livello più alto della lavorazione laniera. Seleziona fibre lunghe e regolari — merino, cashmere, mohair — per produrre filati di qualità superiore destinati a flanelle, jersey e gabardine di pregio.',
    body: `<p>Il ciclo pettinato rappresenta il livello più alto della lavorazione laniera, quello destinato a produrre filati pregiati per tessuti di qualità: flanelle, fresco di lana, gabardine, jersey. A differenza del cardato, il pettinato seleziona fibre lunghe e regolari — tipicamente lana merino, cashmere, mohair — elaborandole in un processo lungo e preciso che può richiedere fino a 15-20 passaggi distinti.</p>
<p>Il ciclo inizia con la selezione e il lavaggio della materia prima (lavatura in grassella per la lana grezza), seguiti dall'asciugatura e dalla carbonizzazione (trattamento acido per eliminare i residui vegetali). La pettinatura vera e propria con macchine Noble o Heilmann rimuove le fibre corte (borra) e allinea le lunghe in un nastro regolare detto <strong>top</strong> o nastro pettinato.</p>
<p>Il top viene poi sottoposto a stirature progressive che ne riducono gradualmente il titolo, aumentando la regolarità e la finezza. Ogni passaggio è seguito da una duplicazione (riunione di più nastri) per compensare le irregolarità. Il processo si conclude con la <strong>ritorcitura</strong> (twisting), che consolida le fibre in un filato resistente con la torsione desiderata.</p>
<p>Il titolo del filato — espresso in <strong>Nm</strong> (numero metrico) — indica quanti metri di filato corrispondono a un grammo di peso. Un Nm 60 significa 60 m/g: filato sottile per tessuti estivi leggeri. Un Nm 20 è filato grosso per cappotti invernali. La precisione del titolo è fondamentale per garantire la regolarità del tessuto e il rispetto dei capitolati tecnici dei buyer internazionali.</p>`
  },
  {
    id: 'a05',
    num: '05',
    cat: 'produzione',
    catLabel: 'Produzione',
    catColor: '#E67E22',
    title: 'L\'Orditura: dal Filo al Subbio',
    readTime: '5 min',
    tags: ['Orditura', 'Subbio', 'Cantra', 'Imbozzimatura'],
    preview: 'L\'orditura trasforma i fili singoli provenienti dalle rocche in un fascio parallelo avvolto sul subbio. È un passaggio fondamentale: un ordito mal eseguito compromette irrimediabilmente la qualità del tessuto.',
    body: `<p>L'orditura è il processo che trasforma i fili singoli provenienti dalle rocche di filato in un fascio ordinato di fili paralleli — l'ordito — avvolti su un cilindro detto subbio. È un passaggio fondamentale e spesso sottovalutato: un ordito mal eseguito compromette irrimediabilmente la qualità del tessuto, indipendentemente dalla qualità del filato e del telaio.</p>
<p>Esistono due sistemi principali di orditura. Nel <strong>sistema diretto</strong> (o a sezione), le rocche sono disposte in una cantra e i fili vengono avvolti sul subbio in sezioni successive, ciascuna delle quali copre una parte della larghezza totale. Il <strong>sistema indiretto</strong> (o a tamburo) utilizza invece un tamburo intermedio su cui l'intero ordito viene avvolto prima di essere trasferito sul subbio definitivo.</p>
<p>La <strong>tensione</strong> è la variabile critica dell'orditura. Ogni filo deve essere avvolto con la stessa tensione: differenze anche minime causano irregolarità nel tessuto, difetti visibili e rotture durante la tessitura. Le orditrici moderne hanno sistemi di controllo automatico della tensione e rilevamento delle rotture del filo.</p>
<p>Prima di passare al telaio, l'ordito subisce spesso l'<strong>imbozzimatura</strong> (sizing): i fili vengono impregnati con amido, PVA o agenti collanti che formano una pellicola protettiva. Questa riduce l'abrasione durante la tessitura e aumenta la resistenza alla trazione. Dopo la tessitura, l'imbozzima viene rimossa nella preparazione al finissaggio.</p>`
  },
  {
    id: 'a06',
    num: '06',
    cat: 'tintura',
    catLabel: 'Tintura',
    catColor: '#9B59B6',
    title: 'La Tintura nel Tessile: Fibra, Filo e Pezza',
    readTime: '7 min',
    tags: ['Tintura', 'Coloranti', 'Solidità', 'Tintoria'],
    preview: 'La tintura può avvenire in tre momenti distinti: in fibra (prima della filatura), in filo (prima della tessitura) o in pezza (dopo la tessitura). Ogni metodo offre caratteristiche cromatiche, tecniche ed economiche diverse.',
    body: `<p>La tintura è il processo che conferisce colore al materiale tessile attraverso l'interazione chimica tra il colorante e la fibra. È un processo chimico complesso che richiede conoscenza della struttura molecolare delle fibre, delle classi di coloranti, dei parametri di processo (temperatura, pH, tempo, rapporto di bagno) e degli standard di solidità richiesti dal mercato.</p>
<p>La <strong>tintura in fibra</strong> (o in fiocco) avviene prima della filatura: le fibre sciolte vengono immerse nei bagni di tintura. Permette di ottenere miscele di colori diversi nella filatura (effetti mélange) e garantisce una solidità eccellente grazie alla penetrazione profonda del colorante. È il metodo preferito per tweed e tessuti con effetti tonali complessi.</p>
<p>La <strong>tintura in filo</strong> avviene dopo la filatura ma prima della tessitura. Il filo viene avvolto su rocche o matasse e immerso nel bagno. Permette di programmare tessuti a righe, scacchi e disegni geometrici senza ricorrere al jacquard. La flanella scozzese tradizionale e il principe di Galles nascono da fili tinti singolarmente e poi tessuti secondo schemi prestabiliti.</p>
<p>La <strong>tintura in pezza</strong> è la più economica e flessibile: il tessuto grezzo viene tinto dopo la tessitura. Permette di rispondere rapidamente ai trend di colore stagionali senza bloccare semilavorati in colorazioni specifiche. È il metodo dominante nel pronto moda, dove la velocità è prioritaria rispetto alla complessità cromatica. La scelta dei coloranti è sempre più condizionata dalle normative REACH e ZDHC.</p>`
  },
  {
    id: 'a07',
    num: '07',
    cat: 'nobilitazione',
    catLabel: 'Nobilitazione',
    catColor: '#D4A843',
    title: 'La Rifinizione e Nobilitazione dei Tessuti',
    readTime: '6 min',
    tags: ['Nobilitazione', 'Finissaggio', 'Trattamenti', 'Qualità'],
    preview: 'Con "nobilitazione" si intende l\'insieme dei trattamenti — chimici, fisici e meccanici — che trasformano il tessuto grezzo in prodotto. È qui che un tessuto acquisisce aspetto, mano, comportamento e prestazione.',
    body: `<p>Con "nobilitazione" si intende l'insieme dei trattamenti — chimici, fisici e meccanici — a cui viene sottoposto il tessuto grezzo per conferirgli le proprietà estetiche e funzionali richieste dal mercato. È in questa fase che un tessuto diventa un prodotto: cambia aspetto, mano, comportamento, prestazione. Nessun tessuto di qualità può prescindere da una nobilitazione ben condotta.</p>
<p>Il processo inizia con i <strong>trattamenti preparatori</strong>: il lavaggio (per eliminare imbozzima, impurità e agenti di lubrificazione del processo di tessitura), la carbonizzazione (se necessaria per eliminare residui vegetali nella lana) e il candeggio (per uniformare e schiarire il substrato prima della tintura o della stampa).</p>
<p>Seguono i <strong>trattamenti principali</strong>, che variano a seconda del tipo di fibra e del prodotto finale. Per la lana: follatura (compatta e ispessisce il tessuto sfruttando le proprietà di feltramento), rattissatura (solleva le fibre creando l'effetto peloso dei cappotti). Per il cotone: mercerizzazione (aumenta la lucentezza e l'affinità per i coloranti), sanforizzazione (stabilizza le dimensioni riducendo il ritiro al lavaggio).</p>
<p>I <strong>trattamenti funzionali</strong> includono impermeabilizzazione (DWR a base acquosa, in sostituzione del fluorocarbone), antimacchia, antistatico e trattamenti tecnici per i tessuti sportivi e medicali. La scelta dei chemicals è sempre più condizionata dalle normative REACH e ZDHC, che restringono progressivamente l'uso di sostanze potenzialmente nocive per l'ambiente e la salute.</p>`
  },
  {
    id: 'a08',
    num: '08',
    cat: 'nobilitazione',
    catLabel: 'Nobilitazione',
    catColor: '#D4A843',
    title: 'Il Finissaggio Meccanico: Follatura, Rattissatura, Vaporizzazione',
    readTime: '6 min',
    tags: ['Follatura', 'Rattissatura', 'Decatissaggio', 'Finissaggio'],
    preview: 'Il finissaggio meccanico conferisce al tessuto il suo aspetto definitivo attraverso l\'azione fisica delle macchine. Follatura, rattissatura e vaporizzazione sono i tre processi fondamentali del finissaggio laniero di qualità.',
    body: `<p>Il finissaggio meccanico è la fase che conferisce al tessuto il suo aspetto definitivo attraverso l'azione fisica di macchine specifiche. A differenza dei trattamenti chimici, agisce sulla struttura del tessuto — compattandola, aprendo le fibre in superficie, regolarizzando lo spessore — senza alterarne la composizione chimica.</p>
<p>La <strong>follatura</strong> (fulling o milling) è il trattamento più caratteristico del tessile laniero. I tessuti vengono sottoposti a pressione, calore e attrito in presenza di acqua e sapone: le fibre laniere, grazie alle loro squame cuticolari, tendono a impigliarsi e feltrare, compattando il tessuto. Il risultato è un aumento dello spessore, una riduzione della larghezza e una superficie più uniforme. Il grado di follatura — da lieve per cappotti morbidi a intensa per il panno — determina l'aspetto finale.</p>
<p>La <strong>rattissatura</strong> (raising) apre le fibre in superficie creando un vello. Il tessuto passa su cilindri ricoperti di punte metalliche (garze) o di fiori di cardo essiccati (nel finissaggio di alta gamma) che estraggono le fibre dalla struttura sollevandole in superficie. Il risultato è l'aspetto "peloso" o "brossé" dei cappotti invernali. Attenzione all'intensità: troppa rattissatura indebolisce la struttura del tessuto.</p>
<p>La <strong>vaporizzazione</strong> (decatissaggio o crabbing) stabilizza definitivamente le dimensioni del tessuto. Il vapore umido penetra nella struttura della fibra, rilascia le tensioni interne accumulate durante le lavorazioni e, raffreddandosi, le "congela" nella posizione desiderata. Un tessuto ben decatissato non si distorce, non si restringe al primo lavaggio e mantiene le sue dimensioni nel tempo.</p>`
  },
  {
    id: 'a09',
    num: '09',
    cat: 'qualità',
    catLabel: 'Qualità',
    catColor: '#E74C3C',
    title: 'Il Controllo Qualità nel Tessile: Difetti, Sistemi e Standard',
    readTime: '6 min',
    tags: ['Controllo Qualità', '4 Point System', 'Difetti', 'Ispezione'],
    preview: 'Il controllo qualità tessile è un sistema di verifica sistematica lungo tutta la filiera. Non è attività concentrata alla fine del processo, ma una filosofia operativa che integra controlli in ingresso, in processo e in uscita.',
    body: `<p>Il controllo qualità tessile è un sistema di verifica sistematica che si estende lungo tutta la filiera produttiva, dalla materia prima al prodotto finito. Non è un'attività concentrata alla fine del processo, ma una filosofia operativa che integra controlli in ingresso, in processo e in uscita, al fine di prevenire i difetti anziché rilevarli a posteriori.</p>
<p>I difetti tessili si classificano in: <strong>difetti di ordito</strong> (ruttori, doppioni, errori di lancio), <strong>difetti di trama</strong> (trammancanze, trame doppie, disuniformità di densità), <strong>difetti di aspetto</strong> (macchie, aloni, disomogeneità di colore) e <strong>difetti strutturali</strong> (buchi, tagli, strappi). Ogni difetto viene classificato con codici internazionali standardizzati e pesato in punti secondo gravità e dimensione.</p>
<p>Il sistema di ispezione <strong>"4 Point"</strong> è lo standard più diffuso: i difetti vengono valutati su un'area di 100 yard quadrate e il tessuto è accettato se il numero di punti-difetto non supera una soglia prestabilita (tipicamente 40 punti per 100 yard²). Questo sistema consente una valutazione oggettiva e confrontabile tra fornitori diversi, ed è richiesto dalla maggior parte dei buyer internazionali.</p>
<p>L'integrazione di <strong>computer vision e AI</strong> nel controllo qualità è la frontiera più avanzata dell'Industry 4.0 tessile. Sistemi basati su reti neurali convoluzionali (CNN) rilevano difetti con accuratezze superiori al 95%, operando in tempo reale su linee di ispezione ad alta velocità. Il vantaggio è duplice: riduzione degli scarti e tracciabilità documentale automatizzata di ogni difetto rilevato.</p>`
  },
  {
    id: 'a10',
    num: '10',
    cat: 'fibre',
    catLabel: 'Fibre Tessili',
    catColor: '#2E7D52',
    title: 'Le Fibre Tessili: Naturali, Sintetiche e Man-Made',
    readTime: '7 min',
    tags: ['Fibre', 'Lana', 'Cotone', 'Poliestere', 'Lyocell'],
    preview: 'La scelta della fibra determina tutto: proprietà del prodotto, processi applicabili, costi e impatto ambientale. Dalle fibre naturali alle sintetiche, dalle man-made cellulosiche alle fibre riciclate: una mappa completa.',
    body: `<p>Le fibre tessili sono la materia prima di tutta la filiera. La loro scelta — in termini di tipo, qualità, finezza e lunghezza — determina non solo le proprietà del prodotto finito ma anche i processi produttivi applicabili, i costi, l'impatto ambientale e le possibilità di riciclo. Conoscere le fibre significa conoscere il tessile.</p>
<p>Le <strong>fibre naturali</strong> si dividono in fibre proteiche (lana, cashmere, seta, alpaca, mohair) e fibre cellulosiche (cotone, lino, canapa, ramie). Le proteiche si distinguono per termoregolazione eccellente e capacità di assorbimento dell'umidità. Le cellulosiche per traspirabilità, freschezza al tatto e facilità di tintura con coloranti reattivi.</p>
<p>Le <strong>fibre sintetiche</strong> — poliestere, poliammide (nylon), acrilico, elastan — sono prodotte per sintesi chimica da derivati del petrolio. Offrono prestazioni meccaniche spesso superiori alle naturali, ma presentano criticità ambientali significative: non sono biodegradabili, rilasciano microplastiche durante il lavaggio e richiedono energia fossile per la produzione.</p>
<p>Le <strong>fibre man-made cellulosiche</strong> (viscosa, modal, lyocell/Tencel, cupro) occupano una posizione intermedia: derivate da cellulosa naturale ma processate chimicamente. Il lyocell prodotto in ciclo chiuso (Tencel® di Lenzing) è oggi considerato una delle fibre più sostenibili disponibili industrialmente, con impatto idrico e chimico significativamente inferiore al cotone convenzionale. Le fibre riciclate (GRS-certified polyester, lana rigenerata pratese) chiudono il cerchio dell'economia circolare.</p>`
  },
  {
    id: 'a11',
    num: '11',
    cat: 'tracciabilità',
    catLabel: 'Tracciabilità',
    catColor: '#3498DB',
    title: 'Tracciabilità Tessile: dal Fornitore al Prodotto Finito',
    readTime: '6 min',
    tags: ['Tracciabilità', 'DPP', 'Supply Chain', 'ESG', 'Blockchain'],
    preview: 'La tracciabilità è la capacità di ricostruire l\'intera storia di un prodotto tessile. È insieme un requisito normativo (ESPR 2027), uno strumento operativo e un asset di marketing: il "Made in Italy" verificato vale di più.',
    body: `<p>La tracciabilità è la capacità di ricostruire l'intera storia di un prodotto tessile — composizione, provenienza, processi subiti — in qualsiasi momento del ciclo di vita. È insieme un requisito normativo (ESPR, REACH), un requisito commerciale richiesto dai buyer internazionali, uno strumento operativo per gestire qualità e non conformità, e un asset di marketing verificabile.</p>
<p>Il sistema di tracciabilità tessile si struttura su quattro livelli. Il <strong>livello di fibra</strong> certifica l'origine della materia prima (ZQ o Nativa per la lana, GOTS o BCI per il cotone). Il <strong>livello di processo</strong> documenta ogni lavorazione — filatura, tessitura, tintoria, finissaggio — con date, macchine, operatori e parametri.</p>
<p>Il <strong>livello di prodotto</strong> associa un codice univoco (RFID, QR code, NFC) al singolo capo o lotto. Questo codice è il "passaporto digitale" del prodotto. Il <strong>Digital Product Passport</strong> (DPP), obbligatorio nell'UE dal 2027 per il settore tessile (Regolamento ESPR), è la formalizzazione normativa di questo approccio: ogni capo dovrà dichiarare composizione, tracciabilità, riparabilità e impatto ambientale.</p>
<p>Il <strong>livello di sistema</strong> integra tutte le informazioni in una piattaforma digitale — ERP con moduli di tracciabilità specifici, o blockchain per i dati critici — accessibile agli attori della filiera con diversi livelli di visibilità. La piena tracciabilità "fork to fork" è l'obiettivo dell'economia circolare tessile: conoscere il prodotto significa poterlo disassemblare, riciclare e rigenerare a fine vita.</p>`
  },
  {
    id: 'a12',
    num: '12',
    cat: 'ai',
    catLabel: 'AI Tessile',
    catColor: '#3498DB',
    title: 'AI Applicata al Tessile: Computer Vision, Forecasting e Color AI',
    readTime: '8 min',
    tags: ['AI', 'Computer Vision', 'Demand Forecasting', 'Color Matching'],
    preview: 'L\'intelligenza artificiale sta trasformando l\'industria tessile su tre fronti: controllo qualità automatizzato con computer vision, previsione della domanda stagionale con ML, e color matching AI per la tintoria.',
    body: `<p>L'intelligenza artificiale sta trasformando l'industria tessile più rapidamente di quanto si pensasse anche solo cinque anni fa. Non si tratta di tecnologie futuristiche: alcune applicazioni sono già operative in centinaia di aziende, con ROI documentati e processi di adozione in accelerazione. L'AI tessile non è un trend da osservare: è una competenza da acquisire.</p>
<p>Il <strong>controllo qualità automatizzato tramite computer vision</strong> è l'applicazione più matura. Sistemi basati su reti neurali convoluzionali (CNN) analizzano il tessuto in uscita dai telai rilevando difetti con accuratezza superiore al 97% a velocità operative di 100+ metri al minuto. I dati raccolti non solo sostituiscono l'ispezione manuale, ma alimentano modelli predittivi che anticipano i difetti correlando parametri di processo (tensione di orditura, umidità, usura delle garniture) con la qualità del prodotto.</p>
<p>Il <strong>demand forecasting AI</strong> è l'altra grande applicazione operativa. Modelli di machine learning — in particolare LSTM e modelli transformer — prevedono la domanda stagionale con errori percentuali (MAPE) del 12-18%, contro il 25-35% dei metodi statistici tradizionali. Questo si traduce in riduzione delle scorte, meno overstock e meno saldi, con impatti diretti sulla marginalità e sulla sostenibilità ambientale.</p>
<p>Il <strong>color matching AI</strong> è un'applicazione più recente ma di grande interesse per il distretto pratese. Sistemi che combinano spettrofotometria e machine learning generano automaticamente le ricette di tintoria per abbinare un colore campione, riducendo le prove di laboratorio dal standard 4-5 campioni a 1-2. Il risparmio in chemicals, acqua ed energia è significativo. L'integrazione con il design digitale apre la strada al "coloring without sampling".</p>`
  }
];

/* ═══ EXPORT ═══ */
// (accessible globally since loaded via <script>)
