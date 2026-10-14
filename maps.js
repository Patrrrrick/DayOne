/* Real OSM vector snapshot, not an illustrative street diagram. No tile requests or keys.
   Geographic data © OpenStreetMap contributors, ODbL. See MAP-SOURCES.md. */
let mapSequence=0,liveMaps=[];
function routeMetrics(r){
 const ids=[state.plan.start,...r.stops,end()];let metres=0,coords=[];
 for(let i=1;i<ids.length;i++){const leg=MAP_DATA.routes[ids[i-1]+'|'+ids[i]];if(leg){metres+=leg.m;coords.push(...leg.p)}}
 const pauses=r.stops.reduce((n,id)=>n+places[id].stay,0);
 const walking=Math.ceil(metres/75); // Approximate 4.5 km/h, plus per-stop pauses.
 const travel=state.plan.travel==='Walk'?walking:state.plan.travel==='Bike'?Math.ceil(metres/180)+5:walking;
 return {metres,coords,pauses,walking,travel,total:travel+pauses};
}
function map(stops=[],large=false,picker=false){return `<div class="map real-map ${large?'large':''}" data-stops="${stops.join(',')}" data-picker="${picker}" id="street-map-${++mapSequence}" role="region" aria-label="Street map of Queen Victoria Market and the University of Melbourne"></div>`}
function destroyMaps(){liveMaps.forEach(m=>m.remove());liveMaps=[]}
function initMaps(){
 document.querySelectorAll('.real-map').forEach(el=>{
  const stops=el.dataset.stops?el.dataset.stops.split(','):[],picker=el.dataset.picker==='true';
  const m=L.map(el,{zoomControl:false,scrollWheelZoom:false,attributionControl:true,zoomSnap:.25,minZoom:12,maxZoom:19,maxBounds:[[-37.810,144.951],[-37.794,144.968]],maxBoundsViscosity:1,preferCanvas:true});liveMaps.push(m);
  m.attributionControl.setPrefix(false);m.attributionControl.addAttribution('© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>');
  let glReady=false; m.createPane('offline').style.zIndex=190; m.createPane('labels').style.zIndex=410;m.getPane('labels').style.pointerEvents='none';
  const renderer=L.canvas({padding:.3,pane:'offline'});const baseStyle={renderer,interactive:false};
  const roadWidth=h=>['primary','secondary','tertiary'].includes(h)?7:['residential','unclassified','living_street'].includes(h)?5:h==='service'?3:1.4;
  for(const f of MAP_DATA.features){if(f.k==='green')L.polygon(f.p,{...baseStyle,stroke:false,fillColor:'#dce8d4',fillOpacity:1}).addTo(m);else if(f.k==='building')L.polygon(f.p,{...baseStyle,color:'#d8d5ce',weight:.5,fillColor:'#e5e1da',fillOpacity:1}).addTo(m)}
  for(const f of MAP_DATA.features){if(f.k==='road'){const foot=['footway','path','pedestrian','steps'].includes(f.h);if(!foot)L.polyline(f.p,{...baseStyle,color:'#dedcd5',weight:roadWidth(f.h)+1.5}).addTo(m);L.polyline(f.p,{...baseStyle,color:foot?'#d0bd9c':'#ffffff',weight:roadWidth(f.h),dashArray:foot?'2 3':null}).addTo(m)}else if(f.k==='tram')L.polyline(f.p,{...baseStyle,color:'#c7c9c7',weight:1,dashArray:'4 3'}).addTo(m)}
  const labels=[];
  MAP_DATA.labels.filter(l=>l.l>140).forEach(l=>{const marker=L.marker(l.p,{pane:'labels',interactive:false,keyboard:false,icon:L.divIcon({className:'street-label',html:`<span style="transform:translate(-50%,-50%) rotate(${l.a}deg)">${l.n}</span>`,iconSize:[0,0]})});labels.push([marker,l]);});
  function updateLabels(){labels.forEach(([marker,l])=>{let show=!glReady&&(m.getZoom()>15.6||l.l>400);if(show&&!m.hasLayer(marker))marker.addTo(m);if(!show&&m.hasLayer(marker))m.removeLayer(marker)})}m.on('zoomend',updateLabels);
  const route=routeMetrics({stops});if(route.coords.length){L.polyline(route.coords,{color:'white',weight:7,opacity:.95,interactive:false}).addTo(m);L.polyline(route.coords,{color:'#1953D9',weight:4,opacity:1,interactive:false}).addTo(m)}
  let ids=picker?Object.keys(places):[...new Set([state.plan.start,...stops,end()])];
  ids.forEach(id=>{
   const p=places[id],n=stops.indexOf(id)+1,start=id===state.plan.start,finish=id===end(),chosen=picker&&state.candidate===id;
   const marker=L.marker(MAP_DATA.snaps[id],{title:p.name,alt:p.name,keyboard:true,zIndexOffset:chosen?100:0,icon:L.divIcon({className:'place-pin',html:`<span class="${start?'start':finish?'finish':''} ${chosen?'chosen':''}">${n|| (start?'S':finish?'E':'•')}</span>`,iconSize:[44,44],iconAnchor:[22,22]})}).addTo(m);
   marker.on('add',()=>marker.getElement()?.setAttribute('aria-label',p.name));marker.bindTooltip(p.short,{permanent:!picker&&state.screen!=='edit'&&(start||finish),direction:start?'bottom':'top',offset:[0,start?12:-12],className:'place-label'});
   marker.on('click',()=>{if(picker){state.candidate=id;document.querySelector('#candidate-name').textContent=p.name;el.querySelectorAll('.chosen').forEach(x=>x.classList.remove('chosen'));marker.getElement().querySelector('span').classList.add('chosen')}else{marker.openTooltip()}});
  });
  const bounds=L.latLngBounds((picker?Object.keys(places):[state.plan.start,...stops,end()]).map(id=>MAP_DATA.snaps[id]));m.fitBounds(bounds,{paddingTopLeft:[32,state.screen==='navigation'?(innerHeight<=650?150:260):state.screen==='edit'?20:40],paddingBottomRight:[48,state.screen==='navigation'?Math.min(innerHeight*.42+24,390):state.screen==='edit'?20:44],maxZoom:16.5});updateLabels();
  const controls=L.control({position:'topright'});controls.onAdd=()=>{const d=L.DomUtil.create('div','map-controls');d.innerHTML='<button type="button" aria-label="Zoom in">+</button><button type="button" aria-label="Zoom out">−</button><button type="button" aria-label="Fit route">⌖</button>';L.DomEvent.disableClickPropagation(d);d.children[0].onclick=()=>m.zoomIn();d.children[1].onclick=()=>m.zoomOut();d.children[2].onclick=()=>m.fitBounds(bounds,{paddingTopLeft:[32,state.screen==='navigation'?(innerHeight<=650?150:260):40],paddingBottomRight:[48,state.screen==='navigation'?Math.min(innerHeight*.42+24,390):40],maxZoom:16.5});return d};controls.addTo(m);
  const badge=L.control({position:'topleft'});badge.onAdd=()=>{let d=L.DomUtil.create('span','map-badge');d.textContent='Street map';return d};badge.addTo(m);
  // OpenFreeMap supplies a standard non-satellite street basemap, no account/key.
  // Keep the local OSM snapshot underneath if the network is unavailable.
  if(window.maplibregl&&L.maplibreGL){try{
   const gl=L.maplibreGL({style:'https://tiles.openfreemap.org/styles/liberty',interactive:false}).addTo(m);
   const fallback=()=>{if(!glReady&&m.hasLayer(gl)){m.removeLayer(gl);const b=el.querySelector('.map-badge');if(b)b.textContent='Offline street map';}};const fallbackTimer=setTimeout(fallback,8000);m.once('unload',()=>clearTimeout(fallbackTimer));
   gl.getMaplibreMap().on('load',()=>{clearTimeout(fallbackTimer);glReady=true;updateLabels();m.attributionControl.addAttribution('<a href="https://openfreemap.org/" target="_blank" rel="noopener">OpenFreeMap</a> · <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a>');});
   gl.getMaplibreMap().on('error',()=>{if(!glReady)fallback();});
  }catch{const b=el.querySelector('.map-badge');if(b)b.textContent='Offline street map';}}

 });
}
