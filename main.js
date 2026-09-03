/* main.js v3.0 — Textile Intelligence Platform */
'use strict';

/* ═══ THEME ═══ */
(function(){ const t=localStorage.getItem('tip-theme')||'dark'; document.documentElement.setAttribute('data-theme',t); })();

function syncTheme(){
  const t=document.documentElement.getAttribute('data-theme')||'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach(b=>{b.textContent=t==='dark'?'☀ Light':'● Dark';});
}
document.addEventListener('click',e=>{
  if(!e.target.matches('[data-theme-toggle]'))return;
  const n=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',n);
  localStorage.setItem('tip-theme',n);
  syncTheme();
  requestAnimationFrame(()=>renderCharts());
});

/* ═══ INIT ═══ */
document.addEventListener('DOMContentLoaded',()=>{
  syncTheme();
  setYear();
  initTicker();
  initSidebar();
  initReveal();
  initCharts();
  renderNews();
  renderResearch();
  renderForum();
  renderKpis();
  renderArticles();
  populateSidebarPulse();
  highlightNavLink();
  initMobMenu();
});

/* ═══ YEAR ═══ */
function setYear(){
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
}

/* ═══ TICKER ═══ */
function initTicker(){
  const track=document.querySelector('.ticker-items');
  if(!track||typeof TICKER==='undefined')return;
  const build=items=>items.map(t=>`
    <span class="ticker-item">
      <span class="t-name">${t.name}</span>
      <span class="t-val">${t.val}</span>
      <span class="t-chg t-${t.dir}">${t.dir==='up'?'▲':t.dir==='dn'?'▼':'●'} ${t.chg}</span>
    </span>`).join('');
  // duplicate for seamless loop
  track.innerHTML=build(TICKER)+build(TICKER);
}

/* ═══ SIDEBAR ═══ */
function initSidebar(){
  const sb=document.querySelector('.platform-sidebar');
  if(!sb)return;
  // close on backdrop click (mobile)
  document.addEventListener('click',e=>{
    if(window.innerWidth>900)return;
    if(!sb.contains(e.target)&&!e.target.matches('.mob-menu-toggle')){
      sb.classList.remove('open');
    }
  });
}
function initMobMenu(){
  const btn=document.querySelector('.mob-menu-toggle');
  const sb=document.querySelector('.platform-sidebar');
  if(!btn||!sb)return;
  btn.addEventListener('click',()=>sb.classList.toggle('open'));
}
function populateSidebarPulse(){
  const el=document.querySelector('[data-sidebar-pulse]');
  if(!el||typeof SIDEBAR_PULSE==='undefined')return;
  el.innerHTML=SIDEBAR_PULSE.map(p=>`
    <div class="sb-pulse-item">
      <span class="spi-name">${p.name}</span>
      <div style="text-align:right">
        <div class="spi-val">${p.val}</div>
        <div class="spi-chg ${p.dir==='up'?'kpi-up':p.dir==='dn'?'kpi-dn':'kpi-neu'}">
          ${p.dir==='up'?'▲':p.dir==='dn'?'▼':'●'} ${p.chg}
        </div>
      </div>
    </div>`).join('');
}

/* ═══ ACTIVE NAV LINK ═══ */
function highlightNavLink(){
  const page=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.sb-link').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('#')[0];
    if(href===page||(page===''&&href==='index.html')||(page==='index.html'&&href==='index.html'))
      a.classList.add('active');
  });
}

/* ═══ REVEAL ON SCROLL ═══ */
let revealObserver = null;

function initReveal(){
  const els=document.querySelectorAll('.reveal');
  if(!els.length)return;

  revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target;
      const siblings=[...el.parentElement.querySelectorAll(':scope > .reveal')];
      el.style.transitionDelay=`${Math.min(siblings.indexOf(el)*0.06,0.36)}s`;
      el.classList.add('visible');
      revealObserver.unobserve(el);
    });
  },{threshold:0.10,rootMargin:'0px 0px -30px 0px'});

  els.forEach(el=>revealObserver.observe(el));
}

/* Helper: observe reveals injected after init (news, research, forum, kpis) */
function observeNewReveals(container){
  if(!revealObserver) return;
  container.querySelectorAll('.reveal:not(.visible)').forEach(el=>{
    revealObserver.observe(el);
  });
}

/* ═══ KPI CARDS ═══ */
function renderKpis(){
  const grid = document.querySelector('[data-kpi-grid]');
  if(!grid || typeof MARKET_KPIS === 'undefined') return;

  grid.innerHTML = MARKET_KPIS.map((k,i) => `
    <div class="kpi-box" style="animation:fadeKpi .4s ${i*0.06}s both">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-val">${k.val}</div>
      <div class="kpi-sub">
        <span class="kpi-${k.dir}">${k.dir==='up'?'▲':k.dir==='dn'?'▼':'●'}</span>
        ${k.sub}
      </div>
      <div class="kpi-trend">${k.dir==='up'?'↑':k.dir==='dn'?'↓':'→'}</div>
    </div>`).join('');
}

/* ═══ CHARTS ═══ */
function initCharts(){
  const wrap = document.querySelector('[data-charts-grid]');
  if(wrap && typeof CHARTS !== 'undefined'){
    wrap.innerHTML = CHARTS.map(c=>`
      <div class="chart-card" id="wrap-${c.id}">
        <div class="chart-card-hdr">
          <div>
            <div class="chart-card-title">${c.title}</div>
            <div class="chart-card-sub">${c.sub}</div>
          </div>
          <div>
            <div class="chart-card-val">${c.val}</div>
            <div class="chart-card-chg kpi-${c.dir}">${c.dir==='up'?'▲':c.dir==='dn'?'▼':'●'} ${c.chg}</div>
          </div>
        </div>
        <canvas class="sparkline" id="${c.id}" aria-label="${c.title}"></canvas>
      </div>`).join('');

    /* chart-card non usa .reveal — visibili subito, poi disegno sparkline
       dopo un frame per garantire che il layout sia calcolato e offsetWidth > 0 */
    setTimeout(renderCharts, 60);
  }
}

function renderCharts(){
  if(typeof CHARTS==='undefined'||typeof SERIES==='undefined')return;
  CHARTS.forEach(c=>{
    const canvas=document.getElementById(c.id);
    if(!canvas)return;
    drawSparkline(canvas,SERIES[c.series]||[],c.color,c.dir==='dn');
  });
}

function drawSparkline(canvas,data,color,inverted=false){
  const dpr=window.devicePixelRatio||1;
  const w=canvas.offsetWidth||260;
  const h=60;
  canvas.width=w*dpr; canvas.height=h*dpr;
  canvas.style.width=w+'px'; canvas.style.height=h+'px';
  const ctx=canvas.getContext('2d');
  ctx.scale(dpr,dpr);

  if(!data||data.length<2)return;

  const min=Math.min(...data);
  const max=Math.max(...data);
  const range=max-min||1;
  const padX=4; const padY=6;
  const W=w-padX*2; const H=h-padY*2;

  const px=i=>padX+(i/(data.length-1))*W;
  const py=v=>padY+H-(((v-min)/range)*H);

  // Gradient fill
  const grad=ctx.createLinearGradient(0,padY,0,padY+H);
  grad.addColorStop(0,color+'44');
  grad.addColorStop(1,color+'00');

  ctx.beginPath();
  ctx.moveTo(px(0),py(data[0]));
  for(let i=1;i<data.length;i++){
    // smooth curve
    const cpx=(px(i-1)+px(i))/2;
    ctx.bezierCurveTo(cpx,py(data[i-1]),cpx,py(data[i]),px(i),py(data[i]));
  }
  ctx.lineTo(px(data.length-1),padY+H);
  ctx.lineTo(px(0),padY+H);
  ctx.closePath();
  ctx.fillStyle=grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(px(0),py(data[0]));
  for(let i=1;i<data.length;i++){
    const cpx=(px(i-1)+px(i))/2;
    ctx.bezierCurveTo(cpx,py(data[i-1]),cpx,py(data[i]),px(i),py(data[i]));
  }
  ctx.strokeStyle=color;
  ctx.lineWidth=2;
  ctx.stroke();

  // Last dot
  const lx=px(data.length-1); const ly=py(data[data.length-1]);
  ctx.beginPath();
  ctx.arc(lx,ly,3.5,0,Math.PI*2);
  ctx.fillStyle=color;
  ctx.fill();
}

/* ═══ NEWS ═══ */
function renderNews(){
  if(typeof NEWS==='undefined')return;

  // Featured article (newsroom page)
  const fa=document.querySelector('[data-featured-article]');
  if(fa){
    const f=NEWS.find(n=>n.featured)||NEWS[0];
    fa.innerHTML=`
      <div>
        <div class="fa-label">📰 Articolo in evidenza</div>
        <h2 class="fa-title">${f.title}</h2>
        <p class="fa-summary">${f.summary}</p>
        <div class="fa-meta">
          <span>📅 ${f.date}</span>
          <span>🕐 ${f.readTime} di lettura</span>
          <span>📌 ${f.source}</span>
        </div>
        <div style="margin-top:1.25rem">
          <a class="btn btn-gold btn-sm" href="#">Leggi articolo →</a>
        </div>
      </div>
      <div class="nc-cat cat-${f.cat}" style="font-size:.75rem;font-weight:700;writing-mode:vertical-rl;
           padding:1rem .5rem;opacity:.6">${f.catLabel}</div>`;
  }

  // News grid
  document.querySelectorAll('[data-news-grid]').forEach(grid=>{
    const limit=parseInt(grid.dataset.limit||'99');
    const items=NEWS.filter(n=>!n.featured).slice(0,limit);
    grid.innerHTML=items.map(buildNewsCard).join('');
    setupNewsFilter(grid);
  });

  // Filter bar
  const bar=document.querySelector('[data-news-filter]');
  if(bar) buildNewsFilterBar(bar);
}

function buildNewsCard(n){
  return `
<article class="news-card reveal" data-cat="${n.cat}">
  <div class="nc-cat cat-${n.cat}">${n.catLabel}</div>
  <h3 class="nc-title">${n.title}</h3>
  <p class="nc-summary">${n.summary.slice(0,140)}…</p>
  <div class="nc-meta">
    <span>${n.date} · ${n.source}</span>
    <span class="nc-read">${n.readTime} →</span>
  </div>
</article>`.trim();
}

function buildNewsFilterBar(bar){
  const cats=[
    {key:'all',label:'Tutte'},
    {key:'ai',label:'AI'},
    {key:'sus',label:'Sostenibilità'},
    {key:'mfg',label:'Produzione'},
    {key:'lux',label:'Luxury'},
    {key:'cert',label:'Certificazioni'},
    {key:'scm',label:'Supply Chain'},
    {key:'circ',label:'Economia Circ.'},
  ];
  bar.innerHTML=cats.map(c=>`
    <button class="filter-btn${c.key==='all'?' active':''}" data-filter="${c.key}">${c.label}</button>`
  ).join('');
  bar.addEventListener('click',e=>{
    const btn=e.target.closest('.filter-btn');
    if(!btn)return;
    bar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('[data-news-grid] .news-card').forEach(card=>{
      const match=f==='all'||card.dataset.cat===f;
      card.style.display=match?'':'none';
    });
  });
}

function setupNewsFilter(grid){
  setTimeout(()=>{
    observeNewReveals(grid);
  },60);
}

/* ═══ RESEARCH ═══ */
function renderResearch(){
  if(typeof RESEARCH==='undefined')return;

  document.querySelectorAll('[data-research-grid]').forEach(grid=>{
    const limit=parseInt(grid.dataset.limit||'99');
    grid.innerHTML=RESEARCH.slice(0,limit).map(r=>`
<article class="rc reveal" data-type="${r.type}">
  <div class="rc-type">${r.type}</div>
  <h3 class="rc-title">${r.title}</h3>
  <p class="rc-abstract">${r.abstract.slice(0,180)}…</p>
  <div class="rc-tags">${r.tags.map(t=>`<span class="rc-tag">${t}</span>`).join('')}</div>
  <div class="rc-footer">
    <span>${r.date} · ${r.pages}p · ${r.readTime}</span>
    <a class="rc-cta" href="${r.url || '#'}" target="_blank" rel="noopener">Leggi</a>
  </div>
</article>`).join('');

    setTimeout(()=>{
      observeNewReveals(grid);
    },80);
  });

  // Filter bar
  const bar=document.querySelector('[data-research-filter]');
  if(bar&&typeof RESEARCH!=='undefined'){
    const types=['All',...new Set(RESEARCH.map(r=>r.type))];
    bar.innerHTML=types.map((t,i)=>`
      <button class="filter-btn${i===0?' active':''}" data-filter="${t==='All'?'all':t}">${t}</button>`
    ).join('');
    bar.addEventListener('click',e=>{
      const btn=e.target.closest('.filter-btn');
      if(!btn)return;
      bar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      document.querySelectorAll('[data-research-grid] .rc').forEach(card=>{
        card.style.display=f==='all'||card.dataset.type===f?'':'none';
      });
    });
  }
}

/* ═══ FORUM ═══ */
function renderForum(){
  if(typeof THREADS==='undefined')return;

  document.querySelectorAll('[data-forum-threads]').forEach(list=>{
    const limit=parseInt(list.dataset.limit||'99');
    list.innerHTML=THREADS.slice(0,limit).map(t=>`
<div class="thread${t.featured?' thread-featured':''} reveal" data-cat="${t.cat}">
  <div>
    ${t.pinned?'<div style="font-family:var(--f-m);font-size:.52rem;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;margin-bottom:.2rem">📌 In evidenza</div>':''}
    <div class="th-cat nc-cat cat-${t.cat}">${t.catLabel}</div>
    <div class="th-title">${t.title}</div>
    <div class="th-meta">
      <span>${t.author} · ${t.authorRole}</span>
      <span>${t.date}</span>
      <span>${t.views} visualizzazioni</span>
    </div>
  </div>
  <div class="th-stats">
    <div class="th-replies">${t.replies}</div>
    <div class="th-replies-lbl">risposte</div>
  </div>
</div>`).join('');

    setTimeout(()=>{
      observeNewReveals(list);
    },80);
  });

  // Forum category filter
  const fbar=document.querySelector('[data-forum-cats]');
  if(fbar){
    const cats=[
      {key:'all',label:'Tutti'},
      {key:'ai',label:'AI'},
      {key:'scm',label:'Supply Chain'},
      {key:'sus',label:'Sostenibilità'},
      {key:'cert',label:'Certificazioni'},
      {key:'mfg',label:'Produzione'},
    ];
    fbar.innerHTML=cats.map((c,i)=>`
      <button class="fcat-btn${i===0?' active':''}" data-filter="${c.key}">${c.label}</button>`
    ).join('');
    fbar.addEventListener('click',e=>{
      const btn=e.target.closest('.fcat-btn');
      if(!btn)return;
      fbar.querySelectorAll('.fcat-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      document.querySelectorAll('[data-forum-threads] .thread').forEach(th=>{
        th.style.display=f==='all'||th.dataset.cat===f?'':'none';
      });
    });
  }
}

/* ═══ BIBLIOTECA TESSILE ═══ */
function renderArticles() {
  if (typeof ARTICLES === 'undefined') return;

  const grid = document.querySelector('[data-biblioteca-grid]');
  if (!grid) return;

  // Split into left (odd indices) and right (even indices)
  const left  = ARTICLES.filter((_, i) => i % 2 === 0);
  const right = ARTICLES.filter((_, i) => i % 2 !== 0);

  const buildCol = (items) => items.map(buildArticleCard).join('');

  grid.innerHTML = `
    <div class="bib-col">${buildCol(left)}</div>
    <div class="bib-col">${buildCol(right)}</div>
  `;

  // Trigger reveals (IntersectionObserver non li vede: sono iniettati dopo init)
  setTimeout(() => {
    observeNewReveals(grid);
  }, 80);

  // Toggle expand/collapse
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.art-toggle');
    if (!btn) return;
    const card = btn.closest('.art-card');
    const body = card.querySelector('.art-body-wrap');
    const isOpen = card.classList.contains('expanded');

    card.classList.toggle('expanded', !isOpen);
    body.classList.toggle('open', !isOpen);
    btn.querySelector('.lbl').textContent = isOpen ? 'Leggi tutto' : 'Chiudi';
  });
}

function buildArticleCard(a) {
  return `
<article class="art-card reveal" style="--art-color:${a.catColor}">
  <div class="art-head">
    <div class="art-meta">
      <span class="art-num">${a.num}</span>
      <span class="art-cat" style="color:${a.catColor};border-color:${a.catColor}44">${a.catLabel}</span>
    </div>
    <h3 class="art-title">${a.title}</h3>
  </div>
  <p class="art-preview">${a.preview}</p>
  <div class="art-body-wrap">
    <div class="art-body">${a.body}</div>
  </div>
  <div class="art-footer">
    <div style="display:flex;align-items:center;gap:.75rem">
      <span class="art-readtime">⏱ ${a.readTime}</span>
      <div class="art-tags">${a.tags.map(t => `<span class="art-tag">${t}</span>`).join('')}</div>
    </div>
    <button class="art-toggle">
      <span class="lbl">Leggi tutto</span>
      <span class="arr">↓</span>
    </button>
  </div>
</article>`.trim();
}

/* ═══ SEARCH (newsroom + research) ═══ */
document.addEventListener('input',e=>{
  if(!e.target.matches('[data-search]'))return;
  const q=e.target.value.toLowerCase().trim();
  const target=e.target.dataset.search;
  document.querySelectorAll(`[data-${target}-grid] article`).forEach(card=>{
    const text=card.textContent.toLowerCase();
    card.style.display=!q||text.includes(q)?'':'none';
  });
});

/* ═══ WINDOW RESIZE — redraw charts ═══ */
let resizeTimer;
window.addEventListener('resize',()=>{
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(renderCharts,200);
});
