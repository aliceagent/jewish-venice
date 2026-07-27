/* ============================================================
   Jewish Venice — app
   ============================================================ */

/* ---------- Google Maps link builders ---------- */
const loc  = s => encodeURIComponent(s.q || `${s.lat},${s.lng}`);
const pin  = s => `https://www.google.com/maps/search/?api=1&query=${loc(s)}`;
const dir  = (a,b,mode) => `https://www.google.com/maps/dir/?api=1&origin=${loc(a)}&destination=${loc(b)}&travelmode=${mode}`;
const multi = (arr, mode) => {
  const o = arr[0], d = arr[arr.length-1], w = arr.slice(1,-1);
  return `https://www.google.com/maps/dir/?api=1&origin=${loc(o)}&destination=${loc(d)}`
       + (w.length ? `&waypoints=${w.map(loc).join('%7C')}` : '') + `&travelmode=${mode}`;
};

/* ---------- tabs ---------- */
const tabBtns = [...document.querySelectorAll('nav.tabs button')];
const maps = {};
function showTab(name, push=true){
  const btn = tabBtns.find(b => b.dataset.tab === name);
  if(!btn) return;
  tabBtns.forEach(b => b.setAttribute('aria-selected', String(b === btn)));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'tab-'+name));
  if(push && location.hash !== '#'+name) history.replaceState(null,'','#'+name);
  window.scrollTo({top:0, behavior:'instant'});
  // Leaflet needs a nudge when its container becomes visible
  setTimeout(() => Object.values(maps).forEach(m => m && m.invalidateSize()), 60);
}
tabBtns.forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]');
  if(g){ e.preventDefault(); showTab(g.dataset.goto); }
});

/* ---------- itinerary table ---------- */
const tb = document.getElementById('itin-body');
ROWS.forEach((r, idx) => {
  if(r.type === 'stop'){
    const s = STOPS[r.s];
    const hid = 'h'+idx;
    const tr = document.createElement('tr');
    tr.className = 'stop';
    tr.innerHTML =
      `<td class="cellpad time">${r.hideTime ? '' : s.time}</td>` +
      `<td class="cellpad"><span class="stopname"><span class="n${s.home?' home':''}">${s.n}</span>${s.name}</span>` +
        `<div style="color:var(--ink-2);font-size:13.4px;margin-top:3px">${s.note||''}</div>` +
        `<a class="maplink" target="_blank" rel="noopener" href="${pin(s)}">📍 Open in Google Maps</a>` +
        (s.history ? `<div><button class="expander" aria-expanded="false" data-target="${hid}">
            <span class="tw">▶</span> Read the history of ${s.name.split(' — ')[0].split(' / ')[0]}</button></div>` : '') +
      `</td>` +
      `<td class="cellpad dist">—</td><td class="cellpad dist">${s.dur || '—'}</td>`;
    tb.appendChild(tr);

    if(s.history){
      const hr = document.createElement('tr');
      hr.innerHTML = `<td colspan="4" style="padding:0"><div class="history" id="${hid}"><div class="inner">
          <h5 style="font-size:19px;margin-top:0">${s.history.title}</h5>
          ${s.history.img ? fig(s.history.img[0], s.history.img[1]) : ''}
          ${s.history.body}<div class="clear"></div></div></div></td>`;
      tb.appendChild(hr);
    }
  } else {
    const a = STOPS[r.from], b = STOPS[r.to], isBoat = r.mode === 'boat';
    const tr = document.createElement('tr');
    tr.className = 'leg';
    tr.innerHTML =
      `<td class="cellpad time">${r.time}</td>` +
      `<td class="cellpad"><span class="mode ${isBoat?'boat':'walk'}">${isBoat?'⛴ Vaporetto':'🚶 Walk'}</span>${r.label}` +
        (r.extra ? `<div style="margin-top:3px">${r.extra}</div>` : '') +
        `<div><a class="dirlink${isBoat?' boatdir':''}" target="_blank" rel="noopener" href="${dir(a,b,isBoat?'transit':'walking')}">` +
        `${isBoat?'Route / pier-to-pier directions →':'Walking directions →'}</a></div></td>` +
      `<td class="cellpad dist">${r.dist}</td><td class="cellpad dist">${r.dur}</td>`;
    tb.appendChild(tr);
  }
});

/* expanders */
document.addEventListener('click', e => {
  const btn = e.target.closest('button.expander');
  if(!btn) return;
  const el = document.getElementById(btn.dataset.target);
  const open = el.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
});
document.getElementById('expandAll').addEventListener('click', function(){
  const anyClosed = [...document.querySelectorAll('.history')].some(h => !h.classList.contains('open'));
  document.querySelectorAll('.history').forEach(h => h.classList.toggle('open', anyClosed));
  document.querySelectorAll('button.expander').forEach(b => b.setAttribute('aria-expanded', String(anyClosed)));
  this.textContent = anyClosed ? 'Collapse all histories' : 'Expand all histories';
});

/* route buttons */
document.getElementById('rt1').href = multi(STOPS.slice(0,7), 'walking');
document.getElementById('rt2').href = multi(STOPS.slice(7,13), 'walking');

/* ---------- shared map helpers ---------- */
function baseMap(id, center, zoom){
  const m = L.map(id, {scrollWheelZoom:false}).setView(center, zoom);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom:19, attribution:'&copy; OpenStreetMap contributors &copy; CARTO'
  }).addTo(m);
  m.on('click', () => m.scrollWheelZoom.enable());
  return m;
}
function marker(m, item, cls, label, popup){
  const wide = String(label).length > 2;
  const icon = L.divIcon({
    className:'', html:`<div class="num-marker ${cls}${wide?' wide':''}">${label}</div>`,
    iconSize:[wide?40:27,27], iconAnchor:[wide?20:13,13], popupAnchor:[0,-14]
  });
  return L.marker([item.lat, item.lng], {icon}).bindPopup(popup).addTo(m);
}

/* ---------- itinerary map ---------- */
(function(){
  const m = maps.itin = baseMap('map-itin', [45.4370, 12.3345], 15);
  const walkStyle = {color:'#9a3412', weight:3.2, opacity:.85, dashArray:'7,7', lineCap:'round'};
  const boatStyle = {color:'#0e6b73', weight:4.2, opacity:.9, lineCap:'round'};
  ROWS.filter(r => r.type === 'leg' && r.mode === 'walk').forEach(r => {
    const a = STOPS[r.from], b = STOPS[r.to];
    L.polyline([[a.lat,a.lng],[b.lat,b.lng]], walkStyle)
      .bindTooltip(`${r.label} · ${r.dist}, ${r.dur}`).addTo(m);
  });
  BOAT_PATHS.forEach(p => L.polyline(p.pts, boatStyle).bindTooltip(p.label).addTo(m));

  const groups = new Map();
  STOPS.forEach(s => {
    const k = s.lat+','+s.lng;
    if(!groups.has(k)) groups.set(k, []);
    groups.get(k).push(s);
  });
  groups.forEach(list => {
    const s = list[0];
    const label = [...new Set(list.map(x => String(x.n)))].join('·');
    const body = list.map(x =>
      `<b>${x.n === 'A' ? '' : x.n + '. '}${x.name}</b><span style="color:#857d72">${x.time}</span><br>${x.note||''}`
    ).join('<hr style="border:0;border-top:1px solid #e4dbcc;margin:8px 0">');
    marker(m, s, s.home?'home':'', label,
      body + `<br><a target="_blank" rel="noopener" href="${pin(s)}">📍 Open in Google Maps</a>`);
  });
  m.fitBounds(L.latLngBounds(STOPS.map(s => [s.lat, s.lng])).pad(0.12));
})();

/* ---------- ghetto map + site cards ---------- */
(function(){
  const m = maps.ghetto = baseMap('map-ghetto', [45.4450, 12.3265], 16);
  JEWISH_SITES.forEach(s => marker(m, s, 'jew', s.n,
    `<b>${s.n}. ${s.name}</b>${s.blurb}<br><a target="_blank" rel="noopener" href="${pin(s)}">📍 Open in Google Maps</a>`));
  const inCity = JEWISH_SITES.filter(s => s.lat > 45.44);
  m.fitBounds(L.latLngBounds(inCity.map(s => [s.lat, s.lng])).pad(0.35));

  const host = document.getElementById('jsites');
  JEWISH_SITES.forEach(s => {
    const d = document.createElement('div');
    d.className = 'card';
    d.style.marginBottom = '18px';
    d.innerHTML =
      `<h3><span class="n" style="background:#6b2d5b">${s.n}</span>${s.name}</h3>` +
      `<p class="sub">${s.blurb}</p>` +
      (s.img ? fig(s.img[0], s.img[1]) : '') +
      s.body + `<div class="clear"></div>` +
      `<div class="actions"><a class="btn" target="_blank" rel="noopener" href="${pin(s)}">📍 Google Maps</a></div>`;
    host.appendChild(d);
  });
})();

/* ---------- food ---------- */
(function(){
  const m = maps.food = baseMap('map-food', [45.4450, 12.3264], 16);
  const all = [...FOOD, ...SERVICES].filter(x => x.lat);
  all.forEach((x,i) => marker(m, x, 'food', i+1,
    `<b>${x.name}</b><span style="color:#857d72">${x.kind}</span><br>${x.blurb}` +
    `<br><a target="_blank" rel="noopener" href="${pin(x)}">📍 Open in Google Maps</a>`));
  m.fitBounds(L.latLngBounds(all.map(x => [x.lat, x.lng])).pad(0.4));

  function card(x){
    const d = document.createElement('div');
    d.className = 'card' + (x.status === 'closed' ? ' closed' : '');
    const vfmap = {y:['y','verified'], p:['n','partly verified'], n:['n','unverified']};
    d.innerHTML =
      `<h3>${x.name}</h3><p class="sub">${x.kind}</p>` +
      `<div>${(x.tags||[]).map(t => `<span class="chip ${t[0]}">${t[1]}</span>`).join('')}</div>` +
      `<p style="font-size:14.4px;margin-top:10px">${x.blurb}</p>` +
      (x.rows && x.rows.length ? `<dl>${x.rows.map(r =>
        `<dt>${r[0]}</dt><dd>${r[1]} ${r[2] ? `<span class="vf ${vfmap[r[2]][0]}">${vfmap[r[2]][1]}</span>` : ''}</dd>`
      ).join('')}</dl>` : '') +
      (x.caveat ? `<div class="note warn" style="margin:16px 0 0;font-size:13.6px">${x.caveat}</div>` : '') +
      (x.lat ? `<div class="actions"><a class="btn pri" target="_blank" rel="noopener" href="${pin(x)}">📍 Google Maps</a></div>` : '');
    return d;
  }
  const openHost = document.getElementById('food-open');
  const closedHost = document.getElementById('food-closed');
  FOOD.filter(f => f.status !== 'closed').forEach(f => openHost.appendChild(card(f)));
  SERVICES.forEach(s => openHost.appendChild(card(s)));
  FOOD.filter(f => f.status === 'closed').forEach(f => closedHost.appendChild(card(f)));
})();

/* ---------- timeline ---------- */
(function(){
  const host = document.getElementById('timeline');
  TIMELINE.forEach(t => {
    const d = document.createElement('div');
    d.className = 'tl' + (t.c ? ' '+t.c : '');
    d.innerHTML = `<span class="yr">${t.yr}</span><p>${t.t}</p>`;
    host.appendChild(d);
  });
})();

/* ---------- back to top ---------- */
const topBtn = document.getElementById('toplink');
window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 700));
topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ---------- deep link ---------- */
if(location.hash) showTab(location.hash.slice(1), false);
