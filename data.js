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

/* ═══ BIBLIOTECA TESSILE — 12 ARTICOLI ═══ */
const ARTICLES = [
  {
    id: 'a01',
    num: '01',
    cat: 'distretto',
    catLabel: 'Distretto',
    catColor: '#D4A843',
    title: 'La Tessitura a Prato: Tradizione Industriale e Futuro Digitale',
    readTime: '6 min',
    tags: ['Prato', 'Distretto', 'Digitalizzazione', 'Export'],
    preview: 'Prato è il distretto tessile più importante d\'Europa. Con oltre 7.000 aziende attive, più di 42.000 addetti e un export che supera i 2 miliardi di euro annui, rappresenta un ecosistema produttivo unico al mondo.',
    body: `<p>Prato è il distretto tessile più importante d'Europa e uno dei più significativi al mondo. Con oltre 7.000 aziende attive, più di 42.000 addetti e un export che supera i 2 miliardi di euro annui, il distretto pratese rappresenta un ecosistema produttivo unico, fondato sulla specializzazione, sulla prossimità geografica e su una filiera corta che non ha eguali.</p>
<p>La storia della tessitura pratese affonda le radici nel Medioevo, quando la città divenne uno dei principali centri lanieri europei. Il segreto del successo di Prato non è mai stato il costo del lavoro, ma la straordinaria concentrazione di know-how specializzato: ogni anello della catena — dalla filatura alla nobilitazione, dalla confezione all'etichettatura — è rappresentato da aziende altamente specializzate che collaborano in un ecosistema denso di terzisti e subfornitori.</p>
<p>Oggi il distretto è alle prese con una doppia transizione: sostenibile e digitale. Sul fronte sostenibile, Prato è già leader mondiale nel riciclo della lana: oltre il 60% delle fibre lavorate proviene da materiale post-consumo, riciclato e rigenerato. Sul fronte digitale, ERP integrati, sistemi di tracciabilità IoT, dashboard KPI e strumenti AI per il controllo qualità stanno trasformando processi centenari in operazioni data-driven.</p>
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
