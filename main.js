/* ═══ main.js v4.0 · Textile Intelligence Platform ═══
   Carica dati da data/config.json + data/content.json
   Renderers condizionati per pagina (body.page-*) */
'use strict';

let CFG = null, CNT = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const [cfgRes, cntRes] = await Promise.all([fetch('data/config.json'), fetch('data/content.json')]);
    CFG = await cfgRes.json(); CNT = await cntRes.json();
  } catch (e) { console.warn('Data load failed:', e); }
  syncTheme(); setYear(); initTicker(); initSidebar(); initReveal(); initCharts();
  renderPage(); populateSidebarPulse(); highlightNavLink(); initMobMenu();
});

function syncTheme() {
  const t = localStorage.getItem('tip-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
}
document.addEventListener('click', e => {
  if (!e.target.matches('[data-theme-toggle]')) return;
  const n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', n);
  localStorage.setItem('tip-theme', n); syncTheme();
});

function setYear() {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}

function initTicker() {
  const track = document.querySelector('.ticker-items');
  if (!track || !CFG?.ticker) return;
  const build = items => items.map(t => `<span class="ticker-item"><span class="t-name">${t.name}</span><span class="t-val">${t.val}</span><span class="t-chg t-${t.dir}">${t.dir === 'up' ? '▲' : t.dir === 'dn' ? '▼' : '●'} ${t.chg}</span></span>`).join('');
  track.innerHTML = build(CFG.ticker) + build(CFG.ticker);
}

function initSidebar() {
  const sb = document.querySelector('.platform-sidebar');
  if (!sb) return;
  sb.addEventListener('wheel', e => {
    if (sb.scrollHeight <= sb.clientHeight) return;
    const atTop = sb.scrollTop === 0, atBottom = sb.scrollTop + sb.clientHeight >= sb.scrollHeight - 1;
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) window.scrollBy({ top: e.deltaY, behavior: 'auto' });
  }, { passive: true });
  document.addEventListener('click', e => {
    if (window.innerWidth > 900) return;
    if (!sb.contains(e.target) && !e.target.matches('.mob-menu-toggle')) {
      sb.classList.remove('open'); document.querySelector('.sidebar-backdrop')?.classList.remove('open');
    }
  });
}

function initMobMenu() {
  const btn = document.querySelector('.mob-menu-toggle'), sb = document.querySelector('.platform-sidebar');
  if (!btn || !sb) return;
  let backdrop = document.querySelector('.sidebar-backdrop');
  if (!backdrop) { backdrop = document.createElement('div'); backdrop.className = 'sidebar-backdrop'; document.body.appendChild(backdrop); }
  const open = () => { sb.classList.add('open'); backdrop.classList.add('open'); };
  const close = () => { sb.classList.remove('open'); backdrop.classList.remove('open'); };
  btn.addEventListener('click', () => sb.classList.contains('open') ? close() : open());
  backdrop.addEventListener('click', close);
}

function populateSidebarPulse() {
  const el = document.querySelector('[data-sidebar-pulse]');
  if (!el || !CFG?.sidebarPulse) return;
  el.innerHTML = CFG.sidebarPulse.map(p => `<div class="sb-pulse-item"><span class="spi-name">${p.name}</span><div style="text-align:right"><div class="spi-val">${p.val}</div><div class="spi-chg ${p.dir === 'up' ? 'kpi-up' : p.dir === 'dn' ? 'kpi-dn' : 'kpi-neu'}">${p.dir === 'up' ? '▲' : p.dir === 'dn' ? '▼' : '●'} ${p.chg}</div></div></div>`).join('');
}

function highlightNavLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sb-link').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) a.classList.add('active');
  });
}

let revealObserver = null;
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.querySelectorAll(':scope > .reveal')];
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el) * 0.06, 0.36)}s`;
      el.classList.add('visible'); revealObserver.unobserve(el);
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => revealObserver.observe(el));
}
function observeNewReveals(container) {
  if (!revealObserver) return;
  container.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

function renderPage() {
  if (!CFG) return;
  renderKPIs();
  if (document.body.classList.contains('page-dashboard')) renderCharts();
  if (document.body.classList.contains('page-news')) renderNews();
  if (document.body.classList.contains('page-research')) renderResearch();
  if (document.body.classList.contains('page-forum')) { renderForum(); renderCompanies(); }
  if (document.body.classList.contains('page-index')) renderBiblioteca();
}

function renderKPIs() {
  const grid = document.querySelector('[data-kpi-grid]');
  if (!grid || !CFG?.kpis) return;
  grid.innerHTML = CFG.kpis.map((k, i) => `<div class="kpi-box" style="animation:fadeIn .4s ${i * 0.06}s both"><div class="kpi-label">${k.label}</div><div class="kpi-val">${k.val}</div><div class="kpi-sub"><span class="kpi-${k.dir}">${k.dir === 'up' ? '▲' : k.dir === 'dn' ? '▼' : '●'}</span> ${k.sub}</div><div class="kpi-trend">${k.dir === 'up' ? '↑' : k.dir === 'dn' ? '↓' : '→'}</div></div>`).join('');
}

function initCharts() {
  const wrap = document.querySelector('[data-charts-grid]');
  if (!wrap || !CFG?.charts) return;
  wrap.innerHTML = CFG.charts.map(c => `<div class="chart-card" id="wrap-${c.id}"><div class="chart-card-hdr"><div><div class="chart-card-title">${c.title}</div><div class="chart-card-sub">${c.sub}</div></div><div><div class="chart-card-val">${c.val}</div><div class="chart-card-chg kpi-${c.dir}">${c.dir === 'up' ? '▲' : '▼'} ${c.chg}</div></div></div><canvas class="sparkline" id="${c.id}" aria-label="${c.title}"></canvas></div>`).join('');
  setTimeout(renderCharts, 60);
}

function renderCharts() {
  if (!CFG?.charts || !CFG?.series) return;
  CFG.charts.forEach(c => { const canvas = document.getElementById(c.id); if (!canvas) return; drawSparkline(canvas, CFG.series[c.series] || [], c.color, c.dir === 'dn'); });
}

function drawSparkline(canvas, data, color, inverted = false) {
  const dpr = window.devicePixelRatio || 1, w = canvas.offsetWidth || 260, h = 60;
  canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
  if (!data || data.length < 2) return;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const padX = 4, padY = 6, W = w - padX * 2, H = h - padY * 2;
  const px = i => padX + (i / (data.length - 1)) * W, py = v => padY + H - (((v - min) / range) * H);
  const grad = ctx.createLinearGradient(0, padY, 0, padY + H);
  grad.addColorStop(0, color + '44'); grad.addColorStop(1, color + '00');
  ctx.beginPath(); ctx.moveTo(px(0), py(data[0]));
  for (let i = 1; i < data.length; i++) { const cpx = (px(i - 1) + px(i)) / 2; ctx.bezierCurveTo(cpx, py(data[i - 1]), cpx, py(data[i]), px(i), py(data[i])); }
  ctx.lineTo(px(data.length - 1), padY + H); ctx.lineTo(px(0), padY + H); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  ctx.beginPath(); ctx.moveTo(px(0), py(data[0]));
  for (let i = 1; i < data.length; i++) { const cpx = (px(i - 1) + px(i)) / 2; ctx.bezierCurveTo(cpx, py(data[i - 1]), cpx, py(data[i]), px(i), py(data[i])); }
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  const lx = px(data.length - 1), ly = py(data[data.length - 1]);
  ctx.beginPath(); ctx.arc(lx, ly, 3.5, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
}

function renderNews() {
  if (!CNT?.news) return;
  const fa = document.querySelector('[data-featured-article]');
  if (fa) { const f = CNT.news.find(n => n.featured) || CNT.news[0]; fa.innerHTML = `<div class="nc-cat cat-${f.cat}">${f.catLabel}</div><h2 class="nc-title">${f.title}</h2><p class="nc-summary">${f.summary.slice(0, 180)}…</p><div class="nc-meta"><span>${f.date}</span><a class="nc-read" href="${f.url || '#'}" target="_blank" rel="noopener">Leggi →</a></div>`; }
  document.querySelectorAll('[data-news-grid]').forEach(grid => {
    const limit = parseInt(grid.dataset.limit || '99');
    grid.innerHTML = CNT.news.filter(n => !n.featured).slice(0, limit).map(buildNewsCard).join('');
  });
}
function buildNewsCard(n) {
  return `<article class="news-card reveal" data-cat="${n.cat}"><div class="nc-cat cat-${n.cat}">${n.catLabel}</div><h3 class="nc-title">${n.title}</h3><p class="nc-summary">${n.summary.slice(0, 140)}…</p><div class="nc-meta"><span>${n.date}</span><a class="nc-read" href="${n.url || '#'}" target="_blank" rel="noopener noreferrer">Leggi →</a></div></article>`.trim();
}

function renderResearch() {
  if (!CNT?.research) return;
  document.querySelectorAll('[data-research-grid]').forEach(grid => {
    const limit = parseInt(grid.dataset.limit || '99');
    grid.innerHTML = CNT.research.slice(0, limit).map(r => `<article class="rc reveal" data-type="${r.type}"><div class="rc-type">${r.type}</div><h3 class="rc-title">${r.title}</h3><p class="rc-abstract">${r.abstract.slice(0, 180)}…</p><div class="rc-tags">${r.tags.map(t => `<span class="rc-tag">${t}</span>`).join('')}</div><div class="rc-footer"><span>${r.date} · ${r.pages}p · ${r.readTime}</span><a class="rc-cta" href="${r.url || '#'}" target="_blank" rel="noopener">Leggi</a></div></article>`).join('');
    setTimeout(() => observeNewReveals(grid), 80);
  });
}

function renderForum() {
  if (!CNT?.forum) return;
  document.querySelectorAll('[data-forum-threads]').forEach(list => {
    const limit = parseInt(list.dataset.limit || '99');
    list.innerHTML = CNT.forum.slice(0, limit).map(t => `<div class="thread${t.featured ? ' thread-featured' : ''} reveal"><div><div class="th-cat nc-cat cat-${t.cat}">${t.catLabel}</div><div class="th-title">${t.title}</div><div class="th-meta"><span>${t.author} · ${t.authorRole}</span><span>${t.date}</span><span>${t.views} visualizzazioni</span></div></div><div class="th-stats"><div class="th-replies">${t.replies}</div><div class="th-replies-lbl">risposte</div></div></div>`).join('');
    setTimeout(() => observeNewReveals(list), 80);
  });
}

function renderBiblioteca() {
  if (!CNT?.articles) return;
  const grid = document.querySelector('[data-biblioteca-grid]');
  if (!grid) return;
  grid.innerHTML = `<div class="biblioteca-grid">${CNT.articles.map(a => `<article class="art-card reveal" style="--art-color:${a.catColor}"><div class="art-head"><div class="art-meta"><span class="art-num">${a.num}</span><span class="art-cat" style="color:${a.catColor};border-color:${a.catColor}44">${a.catLabel}</span></div><h3 class="art-title">${a.title}</h3></div><p class="art-preview">${a.preview}</p><div class="art-body-wrap"><div class="art-body">${a.body}</div></div><div class="art-footer"><div style="display:flex;align-items:center;gap:.75rem"><span class="art-readtime">⏱ ${a.readTime}</span><div class="art-tags">${a.tags.map(t => `<span class="art-tag">${t}</span>`).join('')}</div></div><button class="art-toggle"><span class="lbl">Leggi tutto</span><span class="arr">↓</span></button></div></article>`).join('')}</div>`;
  setTimeout(() => observeNewReveals(grid), 80);
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.art-toggle'); if (!btn) return;
    const card = btn.closest('.art-card'); card.classList.toggle('expanded');
    const body = card.querySelector('.art-body-wrap');
    const isOpen = card.classList.contains('expanded');
    body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0';
    btn.querySelector('.lbl').textContent = isOpen ? 'Chiudi' : 'Leggi tutto';
  });
}

/* ═══ COMPANIES (Forum / Directory) ═══ */
function renderCompanies() {
  if (!CNT?.companies) return;
  document.querySelectorAll('[data-company-grid]').forEach(grid => {
    grid.innerHTML = CNT.companies.map(c => `<div class="company-card reveal" data-category="${c.cat}"><div class="company-logo">${c.logo}</div><div class="company-name">${c.name}</div><div class="company-addr"><span>📍</span> ${c.addr}</div><div class="company-spec">${c.spec}</div><div class="company-meta"><span class="company-years">${c.years}</span><span class="company-ateco">${c.ateco}</span></div></div>`).join('');
    setTimeout(() => observeNewReveals(grid), 80);
  });
  // Filter bar
  const fbar = document.querySelector('[data-company-filter]');
  if (fbar && CNT?.companies) {
    const cats = ['all', ...new Set(CNT.companies.map(c => c.cat))];
    fbar.innerHTML = cats.map((c, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${c}">${c === 'all' ? 'Tutte' : c}</button>`).join('');
    fbar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn'); if (!btn) return;
      fbar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('[data-company-grid] .company-card').forEach(card => {
        card.style.display = f === 'all' || card.dataset.category === f ? '' : 'none';
      });
    });
  }
}