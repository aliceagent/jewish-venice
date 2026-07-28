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
  setTimeout(() => Object.values(maps).forEach(m => {
    if(!m) return;
    m.invalidateSize();
    applyFit(m);
  }), 60);
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
      `<td class="cellpad dist">—</td><td class="cellpad dist${s.dur ? '' : ' na'}">${s.dur || '—'}</td>`;
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
/* Leaflet cannot measure a display:none container, so a fitBounds call on a map
   in an inactive tab silently lands at world zoom and stays there — invalidateSize
   resizes but never re-fits. Record the wanted view and apply it once the panel
   is actually visible. */
function fitTo(m, latlngs, maxZoom){
  m._fit = {bounds: L.latLngBounds(latlngs), maxZoom};
  applyFit(m);
}
function applyFit(m){
  if(!m._fit || !m.getContainer().clientWidth) return;
  m.fitBounds(m._fit.bounds, {maxZoom: m._fit.maxZoom, animate:false});
  m._fit = null;   // once only — never fight a pan or zoom the reader has made
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
  fitTo(m, STOPS.map(s => [s.lat, s.lng]), 16);
})();

/* ---------- ghetto map + site cards ---------- */
(function(){
  const m = maps.ghetto = baseMap('map-ghetto', [45.4450, 12.3265], 16);
  JEWISH_SITES.forEach(s => marker(m, s, 'jew', s.n,
    `<b>${s.n}. ${s.name}</b>${s.blurb}<br><a target="_blank" rel="noopener" href="${pin(s)}">📍 Open in Google Maps</a>`));
  // The Lido cemetery is 2.5 km away; including it would squash the eight
  // Ghetto sites into one dot. Fit the walk, and let the reader pan to site 9.
  const inCity = JEWISH_SITES.filter(s => s.lat > 45.44);
  fitTo(m, inCity.map(s => [s.lat, s.lng]), 17);

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
  fitTo(m, all.map(x => [x.lat, x.lng]), 17);

  function card(x){
    const d = document.createElement('div');
    d.className = 'card' + (x.status === 'closed' ? ' closed' : '');
    /* 'p' used to map to the 'n' class, so "partly verified" and "unverified"
       rendered identically and the guide's central three-state distinction was
       invisible to anyone not reading the label word by word. */
    const vfmap = {y:['y','verified'], p:['p','partly verified'], n:['n','unverified'], none:['none','none found']};
    d.innerHTML =
      `<h3>${x.name}</h3><p class="sub">${x.kind}</p>` +
      `<div>${(x.tags||[]).map(t => `<span class="chip ${t[0]}">${t[1]}</span>`).join('')}</div>` +
      `<p style="font-size:14.4px;margin-top:10px">${x.blurb}</p>` +
      (x.rows && x.rows.length ? `<dl>${x.rows.map(r =>
        `<dt>${r[0]}</dt><dd>${r[1]} ${r[2] ? `<span class="vf ${vfmap[r[2]][0]}">${vfmap[r[2]][1]}</span>` : ''}</dd>`
      ).join('')}</dl>` : '') +
      /* Every caveat used to be hardcoded to rung 2, so "the menu PDFs are dated
         2023" shouted as loudly as a kashrut warning. Rung 2 is now reserved for
         caveats that actually catch a traveller out; the rest sit at rung 3. */
      (x.caveat ? `<div class="note ${/kosher|hashgach|supervis|closed|not certif|mikveh/i.test(x.caveat) ? 'warn' : 'gold'}" style="margin:16px 0 0;font-size:13.6px">${x.caveat}</div>` : '') +
      (x.lat ? `<div class="actions"><a class="btn pri" target="_blank" rel="noopener" href="${pin(x)}">📍 Google Maps</a></div>` : '');
    return d;
  }
  const openHost = document.getElementById('food-open');
  const closedHost = document.getElementById('food-closed');
  FOOD.filter(f => f.status !== 'closed').forEach(f => openHost.appendChild(card(f)));
  SERVICES.forEach(s => openHost.appendChild(card(s)));
  FOOD.filter(f => f.status === 'closed').forEach(f => closedHost.appendChild(card(f)));
})();

/* ---------- phrasebook ---------- */
(function(){
  const host = document.getElementById('phrasebook');
  if(!host) return;

  /* Speech is the platform's own — no library, no network call, and on a device
     with a local Italian voice it keeps working offline like the rest of the
     guide. Where the browser has no synthesis at all the buttons are removed
     rather than left to do nothing. */
  const synth = window.speechSynthesis;
  const canSpeak = !!(synth && typeof SpeechSynthesisUtterance === 'function');

  /* Read aloud, not read literally: the ellipsis in "Contiene…?" is a slot for a
     word, and "ebreo / ebrea" is two alternatives, not a slash. */
  const forSpeech = s => s.replace(/…/g, ' ').replace(/\s*\/\s*/g, ', ')
                          .replace(/\s+/g, ' ').replace(/\s+([?!.,])/g, '$1').trim();
  const sayBtn = text =>
    `<button class="say" type="button" data-say="${forSpeech(text).replace(/"/g,'&quot;')}"` +
    ` aria-label="Say it: ${text.replace(/"/g,'&quot;')}">` +
    `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">` +
    `<path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z"/>` +
    `<path class="w1" d="M15.4 9.2a4 4 0 0 1 0 5.6"/>` +
    `<path class="w2" d="M18 6.6a7.6 7.6 0 0 1 0 10.8"/></svg></button>`;

  PHRASES.forEach(g => {
    const sec = document.createElement('section');
    sec.className = 'phgroup';
    sec.innerHTML =
      `<h3 class="phhead"><span class="ico">${g.icon}</span>${g.title}</h3>` +
      (g.note ? `<div class="note" style="margin:0 0 16px">${g.note}</div>` : '') +
      `<div class="phlist">${g.lines.map(l =>
        `<div class="ph"><div class="en">${l[0]}</div><div class="it" lang="it">${l[1]}</div>` +
        `<div class="pr">${l[2]}</div>${sayBtn(l[1])}</div>`
      ).join('')}</div>`;
    host.appendChild(sec);
  });

  const vhost = document.getElementById('venetian');
  if(vhost) VENETIAN.forEach(([word, meaning]) => {
    const d = document.createElement('div');
    d.className = 'vword';
    d.innerHTML = `<div class="vhead"><b lang="vec">${word}</b>${sayBtn(word)}</div><span>${meaning}</span>`;
    vhost.appendChild(d);
  });

  if(!canSpeak){
    document.querySelectorAll('.say').forEach(b => b.remove());
    document.querySelectorAll('.ttsnote').forEach(n => n.remove());
    return;
  }

  /* Voice lists populate asynchronously, and on some browsers only after the
     first getVoices() call, so ask now and again on the change event. */
  let voice = null;
  function pickVoice(){
    const vs = synth.getVoices() || [];
    voice = vs.find(v => v.lang === 'it-IT' && v.localService)
         || vs.find(v => v.lang === 'it-IT')
         || vs.find(v => (v.lang || '').toLowerCase().startsWith('it'))
         || null;
  }
  pickVoice();
  if(typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', pickVoice);

  let speaking = null;
  function clearState(){
    if(speaking) speaking.classList.remove('on');
    speaking = null;
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.say');
    if(!btn) return;
    e.preventDefault();

    // tapping the button that is already talking stops it
    const again = btn === speaking;
    synth.cancel();
    clearState();
    if(again) return;

    const u = new SpeechSynthesisUtterance(btn.dataset.say);
    u.lang = 'it-IT';
    if(voice) u.voice = voice;
    u.rate = 0.85;          // a shade under natural — these are being copied, not listened to
    u.onend = clearState;
    u.onerror = clearState;
    speaking = btn;
    btn.classList.add('on');
    synth.speak(u);
  });

  // never leave a voice running into another tab or a page the reader has left
  window.addEventListener('pagehide', () => synth.cancel());
  document.addEventListener('visibilitychange', () => { if(document.hidden){ synth.cancel(); clearState(); } });
  tabBtns.forEach(b => b.addEventListener('click', () => { synth.cancel(); clearState(); }));
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

/* ---------- offline ----------
   Registered after load so it never competes with first paint. Failure is
   silent and harmless: without it the guide is simply online-only. */
if('serviceWorker' in navigator){
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}

/* Chrome/Android fires this when the guide is installable; iOS never does,
   which is why the Practical tab spells out the Share-menu route by hand. */
let installPrompt = null;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  installPrompt = e;
  if(installBtn) installBtn.hidden = false;
});
if(installBtn) installBtn.addEventListener('click', async () => {
  if(!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installBtn.hidden = true;
});
window.addEventListener('appinstalled', () => { if(installBtn) installBtn.hidden = true; });
