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
    title:'Computer Vision rileva difetti nel tessuto con 98% di accuratezza',
    summary:'Un nuovo sistema di visione artificiale sviluppato da un consorzio europeo identifica difetti di trama, colore e densità nei tessuti industriali in tempo reale, superando le capacità dell\'ispezione umana e riducendo gli scarti del 34%.',
    date:'24 mag 2026', readTime:'5 min',
    source:'Textile World',
    tags:['Computer Vision','QC','Industry 4.0'],
  },
  {
    id:'n02', featured:false,
    cat:'sus', catLabel:'Sostenibilità',
    title:'GOTS certifica 8.744 aziende: record storico per la moda biologica',
    summary:'Il Global Organic Textile Standard ha pubblicato il suo report annuale 2025, registrando un aumento del 12.4% delle certificazioni globali. L\'Italia si conferma quarta per numero di aziende certificate, con Prato come polo principale.',
    date:'22 mag 2026', readTime:'3 min',
    source:'Textile Exchange',
    tags:['GOTS','Certificazioni','Sostenibilità'],
  },
  {
    id:'n03', featured:false,
    cat:'mfg', catLabel:'Produzione',
    title:'Il Distretto di Prato: export +2.1% nel Q1 2026 nonostante il calo europeo',
    summary:'I dati Confindustria Toscana mostrano una tenuta del distretto tessile pratese con crescita delle esportazioni verso mercati extra-UE, in particolare Middle East e Asia Pacifico, compensando il calo della domanda intraeuropea.',
    date:'20 mag 2026', readTime:'4 min',
    source:'Il Sole 24 Ore',
    tags:['Distretto Prato','Export','Mercati'],
  },
  {
    id:'n04', featured:false,
    cat:'ai', catLabel:'AI & Tessile',
    title:'Generative AI per il fashion design: H&M taglia i tempi di sviluppo del 45%',
    summary:'Il colosso svedese ha integrato modelli generativi nell\'intero processo di concept design, dalla mood board al campionario digitale. Il risultato è una riduzione del 45% nel time-to-sample e un risparmio stimato di €28M annui.',
    date:'18 mag 2026', readTime:'6 min',
    source:'Business of Fashion',
    tags:['Gen AI','Fashion Design','Efficienza'],
  },
  {
    id:'n05', featured:false,
    cat:'circ', catLabel:'Economia Circolare',
    title:'Digital Product Passport obbligatorio in UE dal 2027: cosa cambia per i brand',
    summary:'Il regolamento europeo ESPR entrerà in vigore per il settore tessile nel 2027. Ogni capo dovrà avere un DPP con dati su composizione, tracciabilità, riparabilità e impatto ambientale. Analisi degli impatti per le PMI italiane.',
    date:'16 mag 2026', readTime:'7 min',
    source:'Euratex',
    tags:['DPP','Regolamentazione','EU','Tracciabilità'],
  },
  {
    id:'n06', featured:false,
    cat:'lux', catLabel:'Luxury',
    title:'Hermès, Loro Piana e Zegna investono nella fibre di recupero ultra-premium',
    summary:'I tre brand di lusso hanno annunciato partnership con startup di fibre rigenerate di fascia alta per ridurre la dipendenza dalla lana vergine senza rinunciare alla qualità. Il mercato luxury sustainable cresce del 18% YoY.',
    date:'14 mag 2026', readTime:'4 min',
    source:'WWD',
    tags:['Luxury','Fibre Rigenerate','Sostenibilità'],
  },
  {
    id:'n07', featured:false,
    cat:'cert', catLabel:'Certificazioni',
    title:'ZDHC lancia MRSL 4.0: nuovi limiti per le sostanze chimiche in tintoria',
    summary:'La nuova versione della Manufacturing Restricted Substances List introduce 47 nuove sostanze regolamentate e abbassa i limiti per altre 23. Le aziende hanno 18 mesi per adeguarsi. Prato è tra i distretti più preparati.',
    date:'12 mag 2026', readTime:'5 min',
    source:'ZDHC Foundation',
    tags:['ZDHC','Chimica','Tintoria','Compliance'],
  },
  {
    id:'n08', featured:false,
    cat:'scm', catLabel:'Supply Chain',
    title:'Reshoring tessile in Italia: +340 aziende rientrate in 3 anni',
    summary:'Il rapporto Confindustria Moda registra un trend significativo di ritorno della produzione in Italia, trainato dall\'aumento dei costi logistici asiatici, dall\'ESG compliance e dalla crescente valorizzazione del "Made in Italy" autentico.',
    date:'10 mag 2026', readTime:'4 min',
    source:'Confindustria Moda',
    tags:['Reshoring','Made in Italy','Supply Chain'],
  },
];

/* ═══ RESEARCH PAPERS ═══ */
const RESEARCH = [
  {
    id:'r01',
    type:'AI Application',
    title:'AI per il Controllo Qualità Tessile: Stato dell\'Arte e ROI Industriale',
    abstract:'Analisi sistematica delle applicazioni di computer vision, deep learning e machine learning per l\'ispezione automatizzata dei difetti tessili. Include benchmark su 12 sistemi commerciali e case studies di implementazione in distretto industriale.',
    tags:['Computer Vision','Deep Learning','QC','ROI'],
    date:'Mag 2026', readTime:'12 min',
    pages:28, type2:'Report'
  },
  {
    id:'r02',
    type:'Sustainability',
    title:'Digital Product Passport nel Tessile: Architettura Tecnica e Roadmap 2027',
    abstract:'Studio tecnico sull\'implementazione del Digital Product Passport (ESPR) nel settore moda-tessile italiano. Architettura dati, standard interoperabili, costi di implementazione stimati per PMI e grandi gruppi.',
    tags:['DPP','ESPR','Tracciabilità','Blockchain'],
    date:'Apr 2026', readTime:'15 min',
    pages:34, type2:'White Paper'
  },
  {
    id:'r03',
    type:'Market Intelligence',
    title:'AI Adoption Index — Industria Tessile Europea 2026',
    abstract:'Prima survey sistematica sull\'adozione di strumenti AI nell\'industria tessile europea: 847 aziende intervistate in Italia, Germania, Francia, Spagna. Mappa le tecnologie più utilizzate, le barriere all\'adozione e il ROI percepito.',
    tags:['AI Adoption','Survey','Europa','Industria'],
    date:'Mar 2026', readTime:'10 min',
    pages:22, type2:'Survey'
  },
  {
    id:'r04',
    type:'Supply Chain',
    title:'Lean Manufacturing nel Distretto di Prato: Impatto di Kanban e 5S',
    abstract:'Studio longitudinale (2022-2025) sull\'implementazione di metodologie Lean in 23 aziende del distretto pratese. Misura riduzione lead time, scarti, OEE e impatto su fatturato. Include template di implementazione.',
    tags:['Lean','Kanban','5S','Distretto Prato'],
    date:'Feb 2026', readTime:'9 min',
    pages:18, type2:'Case Study'
  },
  {
    id:'r05',
    type:'AI Application',
    title:'Demand Forecasting per il Pronto Moda: ML vs. Metodi Tradizionali',
    abstract:'Confronto tra approcci di machine learning (LSTM, XGBoost, Transformer) e metodi tradizionali di previsione della domanda per il pronto moda. Dataset reale di 3 aziende pratesi. Riduzione dell\'errore previsionale del 31%.',
    tags:['ML','Forecasting','Fast Fashion','LSTM'],
    date:'Gen 2026', readTime:'14 min',
    pages:31, type2:'Research'
  },
  {
    id:'r06',
    type:'Sustainability',
    title:'LCA Comparativa: Cotone vs. Fibre Riciclate nel Contesto Italiano',
    abstract:'Life Cycle Assessment comparativa di 8 tipologie di fibra considerando il contesto energetico italiano. Integra impatti idrici, CO₂, uso del suolo e fine vita. Dati aggiornati con coefficienti 2025 del IPCC.',
    tags:['LCA','Cotone','GRS','Carbon Footprint'],
    date:'Dic 2025', readTime:'11 min',
    pages:26, type2:'Report'
  },
  {
    id:'r07',
    type:'Technology',
    title:'AI Color Matching nel Tessile: Dal Lab alle Applicazioni Industriali',
    abstract:'Review delle tecnologie di color matching assistito da AI: spettrofotometria + ML, transfer learning da immagini, generazione automatica di ricette tintoriali. Applicazioni in tintoria, campionatura e catalogo digitale.',
    tags:['Color Matching','Tintoria','Spettrofotometria','AI'],
    date:'Nov 2025', readTime:'8 min',
    pages:16, type2:'Review'
  },
  {
    id:'r08',
    type:'Supply Chain',
    title:'Tracciabilità Blockchain nel Tessile: Standard, Costi e Implementazione',
    abstract:'Analisi comparativa dei principali standard blockchain per la tracciabilità tessile (Textile Genesis, TextileGenesis, FibreTrace). Include modello di costo, integrazione con ERP esistenti e valutazione per PMI del distretto pratese.',
    tags:['Blockchain','Tracciabilità','Standard','PMI'],
    date:'Ott 2025', readTime:'10 min',
    pages:20, type2:'Analysis'
  },
];

/* ═══ FORUM THREADS ═══ */
const THREADS = [
  {
    id:'t01', featured:true, pinned:true,
    cat:'ai', catLabel:'AI & Automazione',
    title:'Computer vision per l\'ispezione tessuti: quale soluzione hardware nel 2026?',
    body:'Sto valutando l\'implementazione di un sistema di CV per la nostra linea di ispezione lana pettinata. Ho testato Cognex e Keyence, ma cerco confronti con soluzioni più recenti. Qualcuno ha esperienza con sistemi open-source + GPU dedicata?',
    author:'M.Bianchi',  authorRole:'QC Manager · Prato',
    date:'24 mag 2026', replies:14, views:342,
  },
  {
    id:'t02', featured:false, pinned:false,
    cat:'scm', catLabel:'Supply Chain',
    title:'ERP tessile open source: confronto Odoo Textile vs. ERPNext per distretto',
    body:'Dopo anni su un gestionale custom, stiamo valutando la migrazione. Il nostro caso: 3 terzisti, cicli misti tessitura/tintoria, DDT multi-lavorazione. Qualche esperienza con moduli tessile specifici su Odoo 17?',
    author:'R.Esposito', authorRole:'IT Manager · Biella',
    date:'22 mag 2026', replies:9,  views:218,
  },
  {
    id:'t03', featured:false, pinned:false,
    cat:'sus', catLabel:'Sostenibilità',
    title:'DPP 2027: quali dati raccogliere già adesso per essere pronti?',
    body:'Il regolamento ESPR per il tessile è fissato al 2027 ma la raccolta dati va iniziata ora. Condivido il nostro approccio e chiedo feedback: stiamo mappando composizione, fornitori Tier 1/2, certificazioni e carbon footprint per lotto.',
    author:'L.Ferretti',  authorRole:'Sustainability Lead · Milano',
    date:'20 mag 2026', replies:22, views:501,
  },
  {
    id:'t04', featured:false, pinned:false,
    cat:'ai', catLabel:'AI & Automazione',
    title:'Demand forecasting stagionale: LSTM vs. Prophet — esperienza reale',
    body:'Ho implementato entrambi i modelli su dati reali di 3 stagioni per un brand fast fashion medio. Condivido i risultati (MAPE, RMSE) e la struttura del dataset. Aperto al confronto con chi ha casi simili.',
    author:'D.Romano',    authorRole:'Data Analyst · Napoli',
    date:'18 mag 2026', replies:7,  views:189,
  },
  {
    id:'t05', featured:false, pinned:false,
    cat:'cert', catLabel:'Certificazioni',
    title:'GOTS + GRS sullo stesso prodotto: come gestire la dual-certification',
    body:'Produciamo un jersey in cotone organico (GOTS) con aggiunta di poliestere riciclato (GRS). L\'ente certificatore ci dice che la dual-cert è possibile ma richiede segregazione fisica. Qualcuno ha percorso questa strada?',
    author:'A.Caruso',    authorRole:'Compliance · Carpi',
    date:'15 mag 2026', replies:11, views:267,
  },
  {
    id:'t06', featured:false, pinned:false,
    cat:'mfg', catLabel:'Produzione',
    title:'Kanban digitale vs. fisico in tessitura: pro e contro dalla pratica',
    body:'Dopo 6 mesi con un sistema Kanban digitale (sistema custom HTML/JS) nella nostra tessitura, condivido osservazioni reali. Sorpresa: l\'adozione degli operatori è stata più difficile del previsto. Discussione aperta.',
    author:'V.Greco',     authorRole:'Production Manager · Prato',
    date:'12 mag 2026', replies:18, views:412,
  },
];

/* ═══ EXPORT ═══ */
// (accessible globally since loaded via <script>)
