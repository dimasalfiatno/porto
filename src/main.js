import * as THREE from 'three';
const portfolio=[
{title:"Tour & Travel Bali — Expeditour",cat:"Website Bisnis",accent:"#e8765d",blurb:"Booking & checkout online smooth + backoffice trip.",img:"https://qmurutrnowzkqsqzpdxq.supabase.co/storage/v1/object/public/iniwebsitemu/expeditour-1.webp",live:"https://www.expeditour.id/",detail:"https://iniwebsitemu.com/portfolio/website-tour-travel-bali-expeditour"},
{title:"Company Profile Profesional",cat:"Company Profile",accent:"#3f8fd6",blurb:"Next.js 90+ PageSpeed, desain custom premium.",img:"https://qmurutrnowzkqsqzpdxq.supabase.co/storage/v1/object/public/iniwebsitemu/Company%20profile%20template-1.webp",live:"https://company-profile-1.iniwebsitemu.com/",detail:"https://iniwebsitemu.com/portfolio/jasa-pembuatan-company-profile-website-profesional"},
{title:"Rental Mobil — Armada & WA",cat:"Website Sales Mobil",accent:"#f2994a",blurb:"Katalog armada, availability real-time + WA.",img:"https://qmurutrnowzkqsqzpdxq.supabase.co/storage/v1/object/public/iniwebsitemu/rent-car-1.webp",live:"https://car-rent.iniwebsitemu.com/",detail:"https://iniwebsitemu.com/portfolio/jasa-website-rental-mobil-manajemen-armada-whatsapp"},
{title:"Padel Booking Online",cat:"Website Bisnis",accent:"#e8765d",blurb:"Jadwal real-time, payment digital, 0% komisi.",img:"https://qmurutrnowzkqsqzpdxq.supabase.co/storage/v1/object/public/iniwebsitemu/padel-2.webp",live:"https://padel.iniwebsitemu.com/",detail:"https://iniwebsitemu.com/portfolio/website-padel-profesional"},
{title:"Toko Online Custom",cat:"Toko Online",accent:"#e26d9c",blurb:"100% custom, Midtrans/Xendit, SEO per produk.",img:"https://qmurutrnowzkqsqzpdxq.supabase.co/storage/v1/object/public/iniwebsitemu/2.webp",live:"https://onlineshop.iniwebsitemu.com/",detail:"https://iniwebsitemu.com/portfolio/toko-online-profesional"},
{title:"Restoran Order WA",cat:"Website Bisnis",accent:"#e8765d",blurb:"Menu digital + reservasi meja tanpa komisi.",img:"https://qmurutrnowzkqsqzpdxq.supabase.co/storage/v1/object/public/iniwebsitemu/Porto%20Resto%20(4).png",live:"https://restaurant-template-1.iniwebsitemu.com/",detail:"https://iniwebsitemu.com/portfolio/jasa-website-restoran-order-whatsapp-booking"},
];
const skins=["#f5d0b0","#e8b98a","#c9956a","#a47148","#7a4a28"];
const hijabs=["#d94a6b","#1a9e8a","#3f8fd6","#8a6bd1","#f2b233","#5a3a28"];
const carColors=["#e74c3c","#2980b9","#27ae60","#f1c40f","#1a1a1a","#ecf0f1"];
const hairs=["Pendek","Jabrik","Panjang","Hijab"], shirts=["Hoodie","Polo"];
const carTypes=["Sport","City","Pickup"];
let state={mode:'human',skin:3,hair:3,shirt:0,hijab:1,carColor:0,carAccent:2,carType:0};
try{ const s=JSON.parse(localStorage.getItem('kv3-char')||'null'); if(s) state={...state,...s}; }catch(e){}
function save(){ try{ localStorage.setItem('kv3-char',JSON.stringify(state)); }catch(e){} }
const skinSw=document.getElementById('skinSwatches'), hijabSw=document.getElementById('hijabSwatches'), hairPills=document.getElementById('hairPills'), shirtPills=document.getElementById('shirtPills'), modePills=document.getElementById('modePills');
function buildCreator(){
  modePills.innerHTML=['🧍 Manusia','🚗 Mobil'].map((m,i)=>`<button class="${(i===0&&state.mode==='human')||(i===1&&state.mode==='car')?'active':''}" data-i="${i}">${m}</button>`).join('');
  document.getElementById('lblSkin').textContent=state.mode==='car'?'Warna body':'Warna kulit';
  document.getElementById('lblHair').textContent=state.mode==='car'?'Tipe mobil':'Rambut';
  document.getElementById('lblShirt').textContent=state.mode==='car'?'Aksen / Velg':'Baju';
  document.getElementById('lblHijab').textContent=state.mode==='car'?'Warna aksen':'Warna hijab';
  if(state.mode==='car'){
    skinSw.innerHTML=carColors.map((c,i)=>`<button style="background:${c};border:${c==='#ecf0f1'?'1px solid #ccc':'none'}" data-i="${i}" class="${i===state.carColor?'active':''}"></button>`).join('');
    hijabSw.innerHTML=carColors.map((c,i)=>`<button style="background:${c};border:${c==='#ecf0f1'?'1px solid #ccc':'none'}" data-i="${i}" class="${i===state.carAccent?'active':''}"></button>`).join('');
    hairPills.innerHTML=carTypes.map((t,i)=>`<button class="${i===state.carType?'active':''}" data-i="${i}">${t}</button>`).join('');
    shirtPills.innerHTML='';
    document.getElementById('hijabRow').style.display='';
  } else {
    skinSw.innerHTML=skins.map((c,i)=>`<button style="background:${c}" data-i="${i}" class="${i===state.skin?'active':''}"></button>`).join('');
    hijabSw.innerHTML=hijabs.map((c,i)=>`<button style="background:${c}" data-i="${i}" class="${i===state.hijab?'active':''}"></button>`).join('');
    hairPills.innerHTML=hairs.map((h,i)=>`<button class="${i===state.hair?'active':''}" data-i="${i}">${h}</button>`).join('');
    shirtPills.innerHTML=shirts.map((s,i)=>`<button class="${i===state.shirt?'active':''}" data-i="${i}">${s}</button>`).join('');
    document.getElementById('hijabRow').style.display=state.hair===3?'':'none';
  }
  modePills.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.mode=b.dataset.i==='1'?'car':'human';save();buildCreator();rebuildAvatar()});
  if(state.mode==='car'){
    skinSw.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.carColor=+b.dataset.i;save();buildCreator();rebuildAvatar()});
    hijabSw.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.carAccent=+b.dataset.i;save();buildCreator();rebuildAvatar()});
    hairPills.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.carType=+b.dataset.i;save();buildCreator();rebuildAvatar()});
  } else {
    skinSw.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.skin=+b.dataset.i;save();buildCreator();rebuildAvatar()});
    hijabSw.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.hijab=+b.dataset.i;save();buildCreator();rebuildAvatar()});
    hairPills.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.hair=+b.dataset.i;save();buildCreator();rebuildAvatar()});
    shirtPills.querySelectorAll('button').forEach(b=>b.onclick=()=>{state.shirt=+b.dataset.i;save();buildCreator();rebuildAvatar()});
  }
}
buildCreator();
document.getElementById('btnRandom').onclick=()=>{if(state.mode==='car'){state.carColor=(Math.random()*carColors.length)|0;state.carAccent=(Math.random()*carColors.length)|0;state.carType=(Math.random()*carTypes.length)|0;}else{state.skin=(Math.random()*5)|0;state.hair=(Math.random()*4)|0;state.shirt=(Math.random()*2)|0;state.hijab=(Math.random()*6)|0;}save();buildCreator();rebuildAvatar()};
document.getElementById('btnStart').onclick=()=>{document.getElementById('creator').style.display='none'};
document.getElementById('btnEditChar').onclick=()=>document.getElementById('creator').style.display='block';
document.getElementById('waX').onclick=()=>document.getElementById('waBubble').style.display='none';
const scene=new THREE.Scene(); scene.background=new THREE.Color(0xeef6ff); scene.fog=new THREE.Fog(0xeef6ff,45,95);
const renderer=new THREE.WebGLRenderer({antialias:true}); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.1;
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(innerWidth,innerHeight); document.body.appendChild(renderer.domElement);
const camera=new THREE.PerspectiveCamera(44, innerWidth/innerHeight, 0.1, 100);
let camYaw=0, camDist=19; let isDrag=false, lastX=0, dragMoved=false;
renderer.domElement.addEventListener('pointerdown',e=>{isDrag=true;lastX=e.clientX;dragMoved=false});
addEventListener('pointerup',()=>isDrag=false);
addEventListener('pointermove',e=>{if(isDrag){camYaw-=(e.clientX-lastX)*0.007; dragMoved=true} lastX=e.clientX});
renderer.domElement.addEventListener('wheel',e=>{camDist=Math.max(11,Math.min(28,camDist+e.deltaY*0.012))});
scene.add(new THREE.HemisphereLight(0xffffff,0xbbbbcc,1.05));
const dir=new THREE.DirectionalLight(0xffffff,1.05); dir.position.set(12,16,8); dir.castShadow=true; dir.shadow.mapSize.set(2048,2048); dir.shadow.camera.left=-26; dir.shadow.camera.right=26; dir.shadow.camera.top=26; dir.shadow.camera.bottom=-26; dir.shadow.camera.far=60; dir.shadow.bias=-0.0004; dir.shadow.normalBias=0.02; scene.add(dir);
const fill=new THREE.DirectionalLight(0xffeedd,0.35); fill.position.set(-8,6,-8); scene.add(fill);
function mkBox(w,h,d,c,x,y,z){ const m=new THREE.MeshStandardMaterial({color:c,roughness:0.8}); const g=new THREE.BoxGeometry(w,h,d); const mesh=new THREE.Mesh(g,m); mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true; scene.add(mesh); return mesh; }
function mkPlane(w,h,c,x,y,z){ const m=new THREE.MeshStandardMaterial({color:c}); const g=new THREE.PlaneGeometry(w,h); const mesh=new THREE.Mesh(g,m); mesh.rotation.x=-Math.PI/2; mesh.position.set(x,y,z); mesh.receiveShadow=true; scene.add(mesh); return mesh; }
mkPlane(50,30,0x3a4552,0,0,4);
mkPlane(12,18,0x7ed957,-16,0.01,6);
mkPlane(32,4,0xefe8dc,0,0.06,-3.5);
mkBox(30,5.5,1.6,0xf5efe6,0,2.7,-8.2);
// kaca besar (lebar penuh, tinggi pintu kaca)
const glass=new THREE.Mesh(new THREE.BoxGeometry(28,3.6,0.12), new THREE.MeshStandardMaterial({color:0xcce6f5,transparent:true,opacity:0.42,roughness:0.1,metalness:0.15})); glass.position.set(0,2.25,-7.42); scene.add(glass);
for(let x=-13;x<=13;x+=2.6) mkBox(0.09,3.6,0.09,0x1a1a1a,x,2.25,-7.42);
mkBox(3.2,0.35,1.0,0x1abc9c,0,1.05,-6.9);
// pintu double kaca sliding
let doorLeft=new THREE.Mesh(new THREE.BoxGeometry(1.15,1.95,0.08), new THREE.MeshStandardMaterial({color:0xb8f0e8,transparent:true,opacity:0.88}));
let doorRight=new THREE.Mesh(new THREE.BoxGeometry(1.15,1.95,0.08), new THREE.MeshStandardMaterial({color:0xb8f0e8,transparent:true,opacity:0.88}));
doorLeft.position.set(-0.58,0.98,-7.38); doorRight.position.set(0.58,0.98,-7.38);
[doorLeft,doorRight].forEach(d=>{d.castShadow=true; scene.add(d)});
// handle
const h1=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.42,0.04), new THREE.MeshStandardMaterial({color:0x1a1a1a})); h1.position.set(0.52,0.98,-7.32); scene.add(h1);
const h2=h1.clone(); h2.position.x=-0.52; scene.add(h2);
const doorFrame=new THREE.Mesh(new THREE.BoxGeometry(2.7,2.15,0.1), new THREE.MeshStandardMaterial({color:0x3a2a1a})); doorFrame.position.set(0,0.98,-7.48); scene.add(doorFrame);

function rr(g,x,y,w,h,r){ if(g.roundRect){ g.beginPath(); g.roundRect(x,y,w,h,r); } else { g.beginPath(); g.rect(x,y,w,h); } }
function makeLabel(text,w,h){
  const c=document.createElement('canvas'); c.width=w; c.height=h; const g=c.getContext('2d');
  g.fillStyle='#ffb800'; rr(g,0,0,w,h,10); g.fill();
  g.fillStyle='#3a2a1a'; g.font='900 24px Nunito, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(text,w/2,h/2);
  const tex=new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w/100,h/100), new THREE.MeshStandardMaterial({map:tex,transparent:true})); return m;
}
const masukSign=makeLabel('▲ MASUK — JALAN TERUS',320,54); masukSign.position.set(0,2.95,-7.30); scene.add(masukSign);
// ground ring pintu
const arrowM=new THREE.Mesh(new THREE.RingGeometry(0.55,0.78,24), new THREE.MeshStandardMaterial({color:0x14d6b8,transparent:true,opacity:0.9,side:THREE.DoubleSide})); arrowM.rotation.x=-Math.PI/2; arrowM.position.set(0,0.04,-5.6); scene.add(arrowM);
doorLeft.userData.interact={label:'Pintu otomatis — jalan terus',action:()=>toast('Pintu terbuka otomatis, jalan terus masuk!')}; doorRight.userData.interact=doorLeft.userData.interact;

function tree(x,z){ const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.22,2,8), new THREE.MeshStandardMaterial({color:0x5a3a1a})); trunk.position.set(x,1,z); trunk.castShadow=true; scene.add(trunk); const top=new THREE.Mesh(new THREE.SphereGeometry(1.05,14,12), new THREE.MeshStandardMaterial({color:0x2ecc71})); top.position.set(x,2.3,z); top.castShadow=true; scene.add(top) }
tree(-16,3); tree(-13,8);
function lamp(x,z){ const p=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,3.1,8), new THREE.MeshStandardMaterial({color:0x1a1a1a})); p.position.set(x,1.55,z); scene.add(p); const b=new THREE.Mesh(new THREE.SphereGeometry(0.28,12,12), new THREE.MeshStandardMaterial({color:0xfff7d0,emissive:0xfff7d0,emissiveIntensity:0.25})); b.position.set(x,3.15,z); scene.add(b)}
lamp(-10,-1.8); lamp(7,-1.8); lamp(14,-1.8);
mkBox(0.55,0.55,0.4,0xff7a3d,8,0.72,-3.6); mkBox(0.07,0.9,0.07,0x1a1a1a,8,0.1,-3.6);
mkBox(1.8,0.7,1.0,0xf7c948,-5,0.35,-3.2); mkBox(1.5,0.2,0.8,0x6b3a1a,-5,0.75,-3.2);
[[-5.4,-2.7],[-4.6,-2.7]].forEach(([x,z])=>{ const w=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,0.08,16), new THREE.MeshStandardMaterial({color:0x1a1a1a})); w.rotation.z=Math.PI/2; w.position.set(x,0.14,z); scene.add(w)});
const umb=new THREE.Mesh(new THREE.ConeGeometry(0.9,0.55,8), new THREE.MeshStandardMaterial({color:0x2eb5a0})); umb.position.set(-5,1.45,-3.2); scene.add(umb);
function car(x,z,c){ const body=new THREE.Mesh(new THREE.BoxGeometry(2.2,0.62,1.28), new THREE.MeshStandardMaterial({color:c})); body.position.set(x,0.31,z); body.castShadow=true; scene.add(body); const roof=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.42,1.0), new THREE.MeshStandardMaterial({color:0xdbeaf0})); roof.position.set(x,0.82,z); scene.add(roof)}
car(-6,4.2,0xf7c948); car(-3.2,4.2,0x2eb5a0);
// koridor penghubung luar -> lobi (tutup void abu)
mkPlane(10,9,0xefe8dc,0,0.01,-11.5);
mkBox(6,0.25,0.4,0x1abc9c,0,0.35,-15.2); mkBox(6,0.25,0.4,0x1abc9c,0,0.35,-7.8);
let npcOut=new THREE.Group(); { const b=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.68,0.34), new THREE.MeshStandardMaterial({color:0xff8a5a})); b.position.y=0.68; npcOut.add(b); const h=new THREE.Mesh(new THREE.SphereGeometry(0.29,14,14), new THREE.MeshStandardMaterial({color:0x8d5a3a})); h.position.y=1.18; npcOut.add(h); const hair=new THREE.Mesh(new THREE.SphereGeometry(0.32,12,12), new THREE.MeshStandardMaterial({color:0x1a1a1a})); hair.position.y=1.31; hair.scale.y=0.6; npcOut.add(hair); npcOut.position.set(-3.6,0,-2.0); scene.add(npcOut); }
const DLG={
  seller:{name:'🧋 Penjual Es Teh',lines:['Halo Kak! Haus? Es teh gula aren cuma 5rb!','Booth portfolio ada di LOBI ya — jalan terus lewat pintu kaca.','Klik booth / layar besar buat lihat karya. Gas! 🥤']},
  recep:{name:'💁 Resepsionis',lines:['Selamat datang di iniwebsitemu! 🎉','Layar besar buat galeri portfolio, booth buat detail tiap karya.','Butuh website? Klik ikon WA hijau, konsultasi gratis!']}
};
let dlgIdx=0, dlgKey=null, dlgTimer=null;
function say(key){
  dlgKey=key; dlgIdx=0;
  document.getElementById('dlgName').textContent=DLG[key].name;
  document.getElementById('dlg').classList.add('open');
  typeLine();
}
function typeLine(){
  const full=DLG[dlgKey].lines[dlgIdx]; const el=document.getElementById('dlgText');
  el.textContent=''; let i=0; clearInterval(dlgTimer);
  dlgTimer=setInterval(()=>{ el.textContent=full.slice(0,++i); if(i>=full.length) clearInterval(dlgTimer); },18);
}
function nextLine(){
  const full=DLG[dlgKey].lines[dlgIdx];
  if(document.getElementById('dlgText').textContent.length<full.length){ typeLineDone(full); return; }
  dlgIdx++;
  if(dlgIdx>=DLG[dlgKey].lines.length){ document.getElementById('dlg').classList.remove('open'); dlgKey=null; return; }
  typeLine();
}
function typeLineDone(full){ clearInterval(dlgTimer); document.getElementById('dlgText').textContent=full; }
document.getElementById('dlgNext').onclick=e=>{ e.stopPropagation(); if(dlgKey) nextLine(); };
document.getElementById('dlg').onclick=()=>{ if(dlgKey) nextLine(); };
npcOut.userData.interact={label:'Ngobrol penjual',action:()=>say('seller')};
const lobbyZ=-20;
const lobbyGlow1=new THREE.PointLight(0xfff2d8,60,22,1.8); lobbyGlow1.position.set(0,4,lobbyZ+1); scene.add(lobbyGlow1);
const lobbyGlow2=new THREE.PointLight(0xffe4ec,40,18,1.8); lobbyGlow2.position.set(-5,3.5,lobbyZ-3); scene.add(lobbyGlow2);
const lobbyFloor=mkPlane(24,14,0xf5efe6,0,0.02,lobbyZ);
const tileCanvas=document.createElement('canvas'); tileCanvas.width=512; tileCanvas.height=512; const tc=tileCanvas.getContext('2d'); tc.fillStyle='#f5efe6'; tc.fillRect(0,0,512,512); tc.strokeStyle='#e8ddd0'; tc.lineWidth=2; for(let i=0;i<=8;i++){ tc.beginPath(); tc.moveTo(i*64,0); tc.lineTo(i*64,512); tc.stroke(); tc.beginPath(); tc.moveTo(0,i*64); tc.lineTo(512,i*64); tc.stroke()} const tileTex=new THREE.CanvasTexture(tileCanvas); tileTex.wrapS=tileTex.wrapT=THREE.RepeatWrapping; tileTex.repeat.set(6,3.5); lobbyFloor.material.map=tileTex; lobbyFloor.material.needsUpdate=true;
mkBox(24,5,0.4,0xfaf6ee,0,2.5,lobbyZ-7.2); mkBox(0.4,5,14,0xfaf6ee,-12,2.5,lobbyZ); mkBox(0.4,5,14,0xfaf6ee,12,2.5,lobbyZ); mkBox(10,5,0.4,0xfaf6ee,-7,2.5,lobbyZ+7.2); mkBox(10,5,0.4,0xfaf6ee,7,2.5,lobbyZ+7.2);
mkBox(8,3.2,0.05,0x8a5a2a,0,1.9,lobbyZ-6.95);
const desk=new THREE.Mesh(new THREE.BoxGeometry(4.2,0.7,0.9), new THREE.MeshStandardMaterial({color:0xfffaf0})); desk.position.set(-3.5,0.5,lobbyZ-2); desk.castShadow=true; scene.add(desk);
const deskTop=new THREE.Mesh(new THREE.BoxGeometry(4.4,0.12,0.95), new THREE.MeshStandardMaterial({color:0xc98a5a})); deskTop.position.set(-3.5,0.86,lobbyZ-2); scene.add(deskTop);
desk.userData.interact={label:'Ngobrol resepsionis',action:()=>say('recep')}; deskTop.userData.interact=desk.userData.interact;
const receptionist=new THREE.Group(); receptionist.position.set(-3.5,0.86,lobbyZ-2.3); { const b=new THREE.Mesh(new THREE.BoxGeometry(0.45,0.55,0.3), new THREE.MeshStandardMaterial({color:0xff7aa0})); b.position.y=0.5; receptionist.add(b); const h=new THREE.Mesh(new THREE.SphereGeometry(0.26,14,14), new THREE.MeshStandardMaterial({color:0x5a3a2a})); h.position.y=0.92; receptionist.add(h); const hair2=new THREE.Mesh(new THREE.SphereGeometry(0.29,12,12), new THREE.MeshStandardMaterial({color:0x3a2415})); hair2.position.y=1.06; hair2.scale.y=0.7; receptionist.add(hair2);} scene.add(receptionist);
const bigScreen=new THREE.Mesh(new THREE.PlaneGeometry(3.2,1.8), new THREE.MeshStandardMaterial({color:0xffffff})); bigScreen.position.set(2.2,2.1,lobbyZ-6.9); scene.add(bigScreen);
bigScreen.userData.interact={label:'Lihat Portofolio',action:()=>openGallery()};
const screenFrame=new THREE.Mesh(new THREE.BoxGeometry(3.4,1.95,0.08), new THREE.MeshStandardMaterial({color:0x1a1a1a})); screenFrame.position.set(2.2,2.1,lobbyZ-6.95); scene.add(screenFrame);
new THREE.TextureLoader().load(portfolio[0].img,t=>{t.colorSpace=THREE.SRGBColorSpace; bigScreen.material.map=t; bigScreen.material.needsUpdate=true});
const oval=new THREE.Mesh(new THREE.CircleGeometry(3.2,32), new THREE.MeshStandardMaterial({color:0xff6b9e,transparent:true,opacity:0.9})); oval.rotation.x=-Math.PI/2; oval.position.set(-5,0.03,lobbyZ+1); scene.add(oval);
const ovalInner=new THREE.Mesh(new THREE.CircleGeometry(2.7,32), new THREE.MeshStandardMaterial({color:0xfffaf0})); ovalInner.rotation.x=-Math.PI/2; ovalInner.position.set(-5,0.04,lobbyZ+1); scene.add(ovalInner);
mkBox(1.1,0.5,0.7,0x2eb5a0,-10,0.3,lobbyZ-2.2); mkBox(1.0,0.6,0.65,0xf7c948,-10,0.3,lobbyZ+3.2);
const vend1=mkBox(0.9,1.6,0.6,0xff4a4a,11,0.8,lobbyZ+4.2); const vend2=mkBox(0.9,1.6,0.6,0x3f8fd6,11,0.8,lobbyZ+3.1);
[vend1,vend2].forEach(v=>v.userData.interact={label:'Vending — Beli minum',action:()=>toast('Ting! Silakan ambil 🥤')});
mkBox(1.6,0.4,0.5,0xc98a5a,9.5,0.35,lobbyZ-1.0); mkBox(0.35,0.45,0.35,0x2ecc71,10.8,0.22,lobbyZ+0.2);
const elev=new THREE.Mesh(new THREE.BoxGeometry(1.2,2.2,0.6), new THREE.MeshStandardMaterial({color:0x6b6b7a})); elev.position.set(11,1.1,lobbyZ+1.6); scene.add(elev);
const elevDoor=new THREE.Mesh(new THREE.PlaneGeometry(0.9,1.7), new THREE.MeshStandardMaterial({color:0x3a3a3a})); elevDoor.position.set(11.32,1.1,lobbyZ+1.6); elevDoor.rotation.y=-Math.PI/2; scene.add(elevDoor);
elevDoor.userData.interact={label:'Panggil Lift',action:()=>toast('Lift maintenance — pakai tangga virtual 😄')};
const keluarLabel=makeLabel('GALERI PORTOFOLIO',220,48); keluarLabel.position.set(0,1.05,lobbyZ+6.85); keluarLabel.rotation.y=Math.PI; scene.add(keluarLabel);
const exitArrow=new THREE.Mesh(new THREE.CircleGeometry(0.45,16), new THREE.MeshStandardMaterial({color:0xffb800})); exitArrow.rotation.x=-Math.PI/2; exitArrow.position.set(0,0.04,lobbyZ+5.2); scene.add(exitArrow);

const chatDecal=new THREE.Mesh(new THREE.CircleGeometry(0.55,20), new THREE.MeshStandardMaterial({color:0x25d366})); chatDecal.rotation.x=-Math.PI/2; chatDecal.position.set(3.5,0.03,lobbyZ+1.2); scene.add(chatDecal);
chatDecal.userData.interact={label:'Chat WhatsApp',action:()=>window.open('https://wa.me/6285286038143','_blank')};
for(let i=0;i<2;i++){ const win=new THREE.Mesh(new THREE.PlaneGeometry(2.2,1.4), new THREE.MeshStandardMaterial({color:0x9fd4ff})); win.position.set(6+i*4.5,2.0,lobbyZ-6.9); scene.add(win); const city=new THREE.Mesh(new THREE.PlaneGeometry(2.0,0.55), new THREE.MeshStandardMaterial({color:0x3a4a5a})); city.position.set(6+i*4.5,1.6,lobbyZ-6.88); scene.add(city) }
const booths=[]; const loader=new THREE.TextureLoader();
const boothPos=[[-7,lobbyZ-4.5],[-2,lobbyZ-4.5],[3,lobbyZ-4.5],[7,lobbyZ-4.5],[-7,lobbyZ-1.2],[-2,lobbyZ-1.2]];
portfolio.slice(0,6).forEach((p,i)=>{
  const g=new THREE.Group(); const pos=boothPos[i]||[i*2-5,lobbyZ-4.5]; g.position.set(pos[0],0,pos[1]);
  const stand=new THREE.Mesh(new THREE.BoxGeometry(0.9,1.5,0.36), new THREE.MeshStandardMaterial({color:0xffffff})); stand.position.y=0.75; stand.castShadow=true; g.add(stand);
  const imgPlane=new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.5), new THREE.MeshStandardMaterial({color:0xffffff})); imgPlane.position.set(0,1.05,0.19); g.add(imgPlane);
  loader.load(p.img,t=>{t.colorSpace=THREE.SRGBColorSpace; imgPlane.material.map=t; imgPlane.material.needsUpdate=true});
  const catPlane=new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.14), new THREE.MeshStandardMaterial({color:p.accent})); catPlane.position.set(0,0.62,0.19); g.add(catPlane);
  g.userData.portfolio=p; g.userData.interact={label:p.title,action:()=>openModal(p)}; booths.push(g); scene.add(g);
});
let avatar=new THREE.Group(); scene.add(avatar);
let avatarPos=new THREE.Vector3(0,0,-2.8), avatarTarget=new THREE.Vector3(0,0,-2.8);
let facing=0, targetFacing=0;
const colliders=[];
function addCollider(x,z,hx,hz,zone){ colliders.push({x,z,hx,hz,zone}); }
addCollider(-8,-8.2,7,0.9); addCollider(8,-8.2,7,0.9); addCollider(-6,4.2,1.4,1.0); addCollider(-3.2,4.2,1.4,1.0); addCollider(-5,-3.2,1.2,0.9); addCollider(8,-3.6,0.6,0.6); addCollider(-3.5,-22,2.3,0.7); addCollider(-12,-20,0.5,7); addCollider(12,-20,0.5,7); addCollider(0,-27.2,12,0.5);
// discrete step movement: 1 langkah per tekan
let keys={};
function stepMove(dx,dz){
  const ca=Math.cos(camYaw), sa=Math.sin(camYaw);
  const rdx= dx*ca - dz*sa, rdz= dx*sa + dz*ca;
  const step=1.35;
  avatarTarget.set(avatarPos.x+rdx*step,0,avatarPos.z+rdz*step);
}
addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();
  if(k==='w'||k==='arrowup'){ stepMove(0,-1); e.preventDefault(); }
  else if(k==='s'||k==='arrowdown'){ stepMove(0,1); e.preventDefault(); }
  else if(k==='a'||k==='arrowleft'){ stepMove(-1,0); e.preventDefault(); }
  else if(k==='d'||k==='arrowright'){ stepMove(1,0); e.preventDefault(); }
  if(k==='e' || e.key===' ' || e.key==='Enter'){ const n=getNearest(); if(n) n.action(); }
});
document.querySelectorAll('#touch button').forEach(b=>b.onclick=()=>{
  const k=b.dataset.k;
  if(k==='w') stepMove(0,-1); else if(k==='s') stepMove(0,1);
  else if(k==='a') stepMove(-1,0); else if(k==='d') stepMove(1,0);
  else if(k==='e'){ const n=getNearest(); if(n) n.action(); }
});
let lang='id';
document.getElementById('btnLang').onclick=()=>{
  lang= lang==='id' ? 'en' : 'id';
  document.getElementById('btnLang').textContent= lang==='id' ? 'ID | EN' : 'EN | ID';
  document.getElementById('hint').textContent= lang==='id'
    ? 'WASD / ↑↓←→ untuk jalan · klik lantai untuk jalan · E / klik untuk interaksi · drag putar kamera'
    : 'WASD / arrows to walk · click floor to walk · E / click to interact · drag to rotate camera';
  toast(lang==='id' ? 'Bahasa Indonesia aktif' : 'English active');
};
let rig={};
function rebuildAvatar(){
  avatar.clear(); rig={};
  if(state.mode==='car'){
    const bodyC=new THREE.Color(carColors[state.carColor]);
    const accentC=new THREE.Color(carColors[state.carAccent]);
    const g=new THREE.Group(); avatar.add(g); rig.root=g; rig.isCar=true;
    const sh=new THREE.Mesh(new THREE.CircleGeometry(0.72,20), new THREE.MeshStandardMaterial({color:0x000000,transparent:true,opacity:0.22})); sh.rotation.x=-Math.PI/2; sh.position.y=0.02; avatar.add(sh); rig.shadow=sh;
    const isSport=state.carType===0, isPickup=state.carType===2;
    const bodyH=isPickup?0.45:0.38, bodyL=isPickup?2.3:1.95, bodyW=isPickup?1.05:0.95;
    const body=new THREE.Mesh(new THREE.BoxGeometry(bodyW,bodyH,bodyL), new THREE.MeshStandardMaterial({color:bodyC,roughness:0.35,metalness:0.2})); body.position.y=0.48; body.castShadow=true; g.add(body);
    // cabin / roof
    const cabinH=isSport?0.22:0.32, cabinL=isSport?0.75:0.9;
    const cabin=new THREE.Mesh(new THREE.BoxGeometry(bodyW*0.86,cabinH,cabinL), new THREE.MeshStandardMaterial({color:0x1a1a1a,roughness:0.2})); cabin.position.set(0,0.48+bodyH/2+cabinH/2-0.02, isPickup?-0.15:isSport? -0.05: -0.05); cabin.castShadow=true; g.add(cabin);
    // windshield
    const glass=new THREE.Mesh(new THREE.PlaneGeometry(bodyW*0.8,0.35), new THREE.MeshStandardMaterial({color:0x9fd4ff,transparent:true,opacity:0.65})); glass.position.set(0,0.72,0.42); glass.rotation.x=-0.55; g.add(glass);
    if(isPickup){
      const bed=new THREE.Mesh(new THREE.BoxGeometry(bodyW*0.9,0.18,0.75), new THREE.MeshStandardMaterial({color:0x111111})); bed.position.set(0,0.62,0.62); g.add(bed);
      const wall=new THREE.Mesh(new THREE.BoxGeometry(bodyW*0.9,0.22,0.08), new THREE.MeshStandardMaterial({color:bodyC})); wall.position.set(0,0.72,0.95); g.add(wall);
    }
    if(isSport){
      const spoiler=new THREE.Mesh(new THREE.BoxGeometry(bodyW*1.05,0.06,0.18), new THREE.MeshStandardMaterial({color:0x1a1a1a})); spoiler.position.set(0,0.68,-0.92); g.add(spoiler);
      const spL=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.16,0.12), new THREE.MeshStandardMaterial({color:0x1a1a1a})); spL.position.set(-0.38,0.58,-0.88); g.add(spL);
      const spR=spL.clone(); spR.position.x=0.38; g.add(spR);
    }
    const headMat=new THREE.MeshStandardMaterial({color:0xfff7d0,emissive:0xfff7d0,emissiveIntensity:0.9});
    const tailMat=new THREE.MeshStandardMaterial({color:0xff3b30,emissive:0xff3b30,emissiveIntensity:0.7});
    const hlL=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.12,0.04), headMat); hlL.position.set(-0.32,0.45, bodyL/2-0.02); g.add(hlL); const hlR=hlL.clone(); hlR.position.x=0.32; g.add(hlR);
    const tlL=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.10,0.04), tailMat); tlL.position.set(-0.32,0.5, -bodyL/2+0.02); g.add(tlL); const tlR=tlL.clone(); tlR.position.x=0.32; g.add(tlR);
    // wheels
    rig.wheels=[];
    const wheelGeo=new THREE.CylinderGeometry(0.18,0.18,0.14,14); wheelGeo.rotateZ(Math.PI/2);
    const wheelMat=new THREE.MeshStandardMaterial({color:0x111111});
    const rimGeo=new THREE.CylinderGeometry(0.10,0.10,0.15,12); rimGeo.rotateZ(Math.PI/2);
    const rimMat=new THREE.MeshStandardMaterial({color:accentC});
    [[-0.52,0.78],[0.52,0.78],[-0.52,-0.72],[0.52,-0.72]].forEach(([x,z])=>{
      const wg=new THREE.Group(); wg.position.set(x,0.20,z);
      const w=new THREE.Mesh(wheelGeo, wheelMat); w.castShadow=true; wg.add(w);
      const rim=new THREE.Mesh(rimGeo, rimMat); wg.add(rim);
      g.add(wg); rig.wheels.push(wg);
    });
    // exhaust puff placeholder
    rig.glow=hlL;
    return;
  }
  const skinC=new THREE.Color(skins[state.skin]), shirtC=new THREE.Color(state.shirt===0?"#7a5bd1":"#2eb5a0"), hijabC=new THREE.Color(hijabs[state.hijab]);
  const g=new THREE.Group(); avatar.add(g); rig.root=g; rig.isCar=false;
  const sh=new THREE.Mesh(new THREE.CircleGeometry(0.38,20), new THREE.MeshStandardMaterial({color:0x000000,transparent:true,opacity:0.2})); sh.rotation.x=-Math.PI/2; sh.position.y=0.02; avatar.add(sh); rig.shadow=sh;
  const hips=new THREE.Group(); hips.position.y=0.58; g.add(hips);
  const torso=new THREE.Mesh(new THREE.CapsuleGeometry(0.24,0.28,4,12), new THREE.MeshStandardMaterial({color:shirtC,roughness:0.7})); torso.position.y=0.18; torso.castShadow=true; hips.add(torso);
  if(state.shirt===1){ const collar=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.08,0.05), new THREE.MeshStandardMaterial({color:0xffffff})); collar.position.set(0,0.38,0.13); hips.add(collar)}
  const headG=new THREE.Group(); headG.position.y=0.52; hips.add(headG); rig.head=headG;
  const head=new THREE.Mesh(new THREE.SphereGeometry(0.28,20,20), new THREE.MeshStandardMaterial({color:skinC,roughness:0.5})); head.castShadow=true; headG.add(head);
  const eyeMat=new THREE.MeshStandardMaterial({color:0x1a1a1a}); const e1=new THREE.Mesh(new THREE.SphereGeometry(0.038,10,10), eyeMat); e1.position.set(-0.09,0.04,0.25); headG.add(e1); const e2=e1.clone(); e2.position.x=0.09; headG.add(e2);
  const blush=new THREE.Mesh(new THREE.CircleGeometry(0.05,10), new THREE.MeshStandardMaterial({color:0xff8aa0,transparent:true,opacity:0.7})); blush.position.set(-0.14,-0.04,0.26); blush.rotation.y=0.4; headG.add(blush); const blush2=blush.clone(); blush2.position.x=0.14; blush2.rotation.y=-0.4; headG.add(blush2);
   if(state.hair===3){
    const hij=new THREE.Mesh(new THREE.SphereGeometry(0.335,18,18), new THREE.MeshStandardMaterial({color:hijabC,roughness:0.8})); hij.position.y=0.05; hij.scale.set(1.08,0.92,1.08); headG.add(hij);
    const drape=new THREE.Mesh(new THREE.CylinderGeometry(0.30,0.40,0.42,14), new THREE.MeshStandardMaterial({color:hijabC,roughness:0.8})); drape.position.set(0,-0.22,0); headG.add(drape);
  } else {
    const hc= state.hair===0?0x1a1a1a : state.hair===1?0xc08a2a : 0x4a2a0a;
    if(state.hair===0){ const h=new THREE.Mesh(new THREE.BoxGeometry(0.56,0.16,0.56), new THREE.MeshStandardMaterial({color:hc})); h.position.y=0.22; headG.add(h)}
    if(state.hair===1){ for(let i=-1;i<=1;i++){ const b=new THREE.Mesh(new THREE.SphereGeometry(0.11,10,10), new THREE.MeshStandardMaterial({color:hc})); b.position.set(i*0.13,0.22,0); headG.add(b)}}
    if(state.hair===2){ const h=new THREE.Mesh(new THREE.SphereGeometry(0.33,14,14), new THREE.MeshStandardMaterial({color:hc})); h.position.y=0.18; h.scale.y=0.78; headG.add(h); const bangs=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.12,0.18), new THREE.MeshStandardMaterial({color:hc})); bangs.position.set(0,0.16,0.18); headG.add(bangs)}
  }
  const lidMat=new THREE.MeshStandardMaterial({color:skinC});
  const lidL=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.04,0.02), lidMat); lidL.position.set(-0.09,0.04,0.28); lidL.visible=false; headG.add(lidL);
  const lidR=lidL.clone(); lidR.position.x=0.09; headG.add(lidR); rig.lids=[lidL,lidR];
  const mouth=new THREE.Mesh(new THREE.CapsuleGeometry(0.022,0.05,4,8), new THREE.MeshStandardMaterial({color:0x3a1a1a})); mouth.rotation.z=Math.PI/2; mouth.position.set(0,-0.09,0.265); headG.add(mouth); rig.mouth=mouth;
  function arm(side){
    const grp=new THREE.Group(); grp.position.set(side*0.30,0.30,0); hips.add(grp);
    const upper=new THREE.Mesh(new THREE.CapsuleGeometry(0.065,0.22,4,8), new THREE.MeshStandardMaterial({color:skinC})); upper.position.y=-0.12; grp.add(upper);
    const lowerG=new THREE.Group(); lowerG.position.y=-0.26; grp.add(lowerG);
    const lower=new THREE.Mesh(new THREE.CapsuleGeometry(0.055,0.20,4,8), new THREE.MeshStandardMaterial({color:skinC})); lower.position.y=-0.11; lowerG.add(lower);
    const handG=new THREE.Group(); handG.position.y=-0.24; lowerG.add(handG);
    const palm=new THREE.Mesh(new THREE.SphereGeometry(0.068,10,10), new THREE.MeshStandardMaterial({color:skinC})); palm.scale.set(1,0.7,1.1); handG.add(palm);
    for(let f=0;f<4;f++){ const finger=new THREE.Mesh(new THREE.CapsuleGeometry(0.016,0.05,4,6), new THREE.MeshStandardMaterial({color:skinC})); finger.position.set((f-1.5)*0.028,-0.055,0.03); finger.rotation.x=0.25; handG.add(finger); }
    const thumb=new THREE.Mesh(new THREE.CapsuleGeometry(0.018,0.04,4,6), new THREE.MeshStandardMaterial({color:skinC})); thumb.position.set(side*0.05,-0.04,0.02); thumb.rotation.z= side*0.6; handG.add(thumb);
    return {root:grp, lower:lowerG, hand:handG};
  }
  rig.leftArm=arm(-1); rig.rightArm=arm(1);
  function leg(side){
    const grp=new THREE.Group(); grp.position.set(side*0.13,0,0); hips.add(grp);
    const upper=new THREE.Mesh(new THREE.CapsuleGeometry(0.08,0.24,4,8), new THREE.MeshStandardMaterial({color:0x2b3a4a})); upper.position.y=-0.18; grp.add(upper);
    const lowerG=new THREE.Group(); lowerG.position.y=-0.34; grp.add(lowerG);
    const lower=new THREE.Mesh(new THREE.CapsuleGeometry(0.07,0.22,4,8), new THREE.MeshStandardMaterial({color:0x2b3a4a})); lower.position.y=-0.13; lowerG.add(lower);
    const shoe=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.09,0.26), new THREE.MeshStandardMaterial({color:0x111111})); shoe.position.set(0,-0.27,0.06); lowerG.add(shoe);
    return {root:grp, lower:lowerG};
  }
  rig.leftLeg=leg(-1); rig.rightLeg=leg(1);
}
rebuildAvatar();
let zone='outside'; let snapCam=true;
function updateZone(){ const z= avatarPos.z<-8 ? 'lobby':'outside'; if(z!==zone){ zone=z; snapCam=true; document.querySelector('.hud-loc b').textContent= zone==='lobby'?'Lobi Portofolio':'Halaman Depan'; document.querySelector('.badge').textContent= zone==='lobby'?'LOBI':'LUAR'; toast(zone==='lobby'?'Masuk Galeri Portofolio':'Kembali ke Halaman Depan'); } }
const raycaster=new THREE.Raycaster(), mouse=new THREE.Vector2();
const clickPlaneOut=new THREE.Plane(new THREE.Vector3(0,1,0),0);
renderer.domElement.addEventListener('click',e=>{
  if(dragMoved) return;
  mouse.x=(e.clientX/innerWidth)*2-1; mouse.y=-(e.clientY/innerHeight)*2+1;
  raycaster.setFromCamera(mouse,camera);
  const hits=raycaster.intersectObjects(scene.children,true);
  for(const h of hits){ let o=h.object; while(o){ if(o.userData.interact){ o.userData.interact.action(); return; } if(o.userData.portfolio){ openModal(o.userData.portfolio); return; } o=o.parent; } }
  const pt=new THREE.Vector3();
  if(raycaster.ray.intersectPlane(clickPlaneOut,pt)){ pt.y=0; avatarTarget.copy(pt); }
});
function getNearest(){
  let best=null, bestD=4.5;
  const pool=[desk,deskTop,chatDecal,elevDoor,vend1,vend2,bigScreen, ...booths, npcOut, doorLeft, doorRight];
  for(const o of pool){ if(!o) continue; const d=o.getWorldPosition(new THREE.Vector3()).distanceTo(avatarPos); if(d<bestD){ bestD=d; if(o.userData.interact) best=o.userData.interact; else if(o.userData.portfolio) best={label:o.userData.portfolio.title,action:()=>openModal(o.userData.portfolio)} } }
  return best;
}
let toastTimer=null;
function toast(msg){
  let el=document.getElementById('toast'); if(!el){ el=document.createElement('div'); el.id='toast'; el.style.cssText='position:fixed;left:50%;top:72px;transform:translateX(-50%);background:#fffaf0;border:1px solid #e8ddd0;padding:10px 18px;border-radius:999px;font-weight:800;font-size:13px;color:#6b4f3a;box-shadow:0 8px 20px rgba(0,0,0,.12);z-index:15'; document.body.appendChild(el)}
  el.textContent=msg; el.style.display='block'; clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.style.display='none',2200);
}
function resolveCollision(p){
  const r= rig.isCar? 0.85:0.35;
  for(const c of colliders){
    const dx=p.x-c.x, dz=p.z-c.z;
    const px=c.hx+r-Math.abs(dx), pz=c.hz+r-Math.abs(dz);
    if(px>0&&pz>0){ if(px<pz) p.x=c.x+Math.sign(dx||1)*(c.hx+r); else p.z=c.z+Math.sign(dz||1)*(c.hz+r); }
  }
  return p;
}
function update(dt){
  const speed= rig.isCar? 4.2:1.95;
  const to=avatarTarget.clone().sub(avatarPos); to.y=0; const dist=to.length();
  const moving=dist>0.04;
  if(moving){ to.normalize(); targetFacing=Math.atan2(to.x,to.z); const step=Math.min(speed*dt, dist); avatarPos.add(to.multiplyScalar(step)); }
  avatarPos.x=Math.max(-18,Math.min(18,avatarPos.x)); avatarPos.z=Math.max(lobbyZ-6.5,Math.min(12,avatarPos.z));
  updateZone();
  resolveCollision(avatarPos); resolveCollision(avatarTarget);
  avatar.position.copy(avatarPos);
  let dYaw= targetFacing - facing; while(dYaw>Math.PI) dYaw-=Math.PI*2; while(dYaw<-Math.PI) dYaw+=Math.PI*2;
  facing += dYaw * Math.min(1, 10*dt);
  avatar.rotation.y=facing;
  const time=Date.now()*0.001;
  if(rig.isCar){
    const spin=moving? speed*5.2*dt*14:0;
    rig.wheels.forEach(w=> w.children.forEach(c=> c.rotation.x+=spin) );
    // tilt saat belok
    rig.root.rotation.z=THREE.MathUtils.lerp(rig.root.rotation.z, dYaw*0.35, 0.12);
    rig.root.position.y= moving? Math.abs(Math.sin(time*18))*0.04 : Math.sin(time*1.8)*0.015;
    rig.shadow.scale.setScalar(1 - (moving? Math.abs(Math.sin(time*18))*0.08:0));
  } else {
  if(!rig._nextBlink) rig._nextBlink=time+2+Math.random()*2;
  if(time>rig._nextBlink){ rig.lids.forEach(l=>l.visible=true); rig.mouth.scale.y=0.6; setTimeout(()=>{rig.lids.forEach(l=>l.visible=false); rig.mouth.scale.y=1},120); rig._nextBlink=time+2.5+Math.random()*2.5; }
  if(moving){
    const s=Math.sin(time*6.2)*0.58; 
    rig.leftLeg.root.rotation.x=s; rig.rightLeg.root.rotation.x=-s;
    rig.leftLeg.lower.rotation.x=Math.max(0, s)*0.75; rig.rightLeg.lower.rotation.x=Math.max(0, -s)*0.75;
    rig.leftArm.root.rotation.x=-s*0.85; rig.rightArm.root.rotation.x=s*0.85;
    rig.leftArm.lower.rotation.x= Math.abs(s)*0.35; rig.rightArm.lower.rotation.x=Math.abs(s)*0.35;
    rig.leftArm.hand.rotation.x=Math.sin(time*6.2+0.3)*0.35; rig.rightArm.hand.rotation.x=Math.sin(time*6.2+3.44)*0.35;
    rig.root.position.y=Math.abs(Math.sin(time*12.4))*0.08;
    rig.head.rotation.z=Math.sin(time*3)*0.07; rig.head.rotation.x=Math.sin(time*6.2)*0.04;
    rig.shadow.scale.setScalar(1 - Math.abs(Math.sin(time*6.2))*0.12);
  } else {
    const breathe=Math.sin(time*1.4)*0.035, sway=Math.sin(time*0.9)*0.06;
    rig.root.position.y=breathe*1.5;
    rig.root.rotation.z=sway*0.18; rig.root.rotation.x=breathe*0.5;
    rig.head.rotation.z=Math.sin(time*0.7)*0.09; rig.head.rotation.y=Math.sin(time*0.5)*0.12;
    rig.head.rotation.x=Math.sin(time*1.1)*0.05;
    rig.leftArm.root.rotation.x=Math.sin(time*1.2)*0.12-0.08; rig.rightArm.root.rotation.x=Math.sin(time*1.2+2.1)*0.12-0.08;
    rig.leftArm.lower.rotation.x=0.22+Math.sin(time*1.3)*0.08; rig.rightArm.lower.rotation.x=0.22+Math.sin(time*1.3+1.1)*0.08;
    rig.leftArm.hand.rotation.z=Math.sin(time*1.6)*0.15; rig.rightArm.hand.rotation.z=Math.sin(time*1.6+1)*0.15;
    const wavePhase=(time%7)/7; if(wavePhase>0.82){ rig.rightArm.root.rotation.x=-0.9; rig.rightArm.lower.rotation.x=0.9; rig.rightArm.hand.rotation.z=Math.sin(time*14)*0.55; }
    rig.leftLeg.root.rotation.x*=0.88; rig.rightLeg.root.rotation.x*=0.88;
    rig.shadow.scale.setScalar(1 + breathe*0.4);
  }
  }
  let prompt=document.getElementById('prompt');
  if(!prompt){ prompt=document.createElement('div'); prompt.id='prompt'; prompt.style.cssText='position:fixed;left:50%;bottom:64px;transform:translateX(-50%);background:rgba(255,250,240,.96);border:1px solid #e8ddd0;padding:8px 14px;border-radius:999px;font-weight:800;font-size:12px;color:#6b4f3a;z-index:12'; document.body.appendChild(prompt)}
  const near=getNearest();
  if(near){ prompt.style.display='block'; prompt.textContent='↵ E — '+near.label; } else prompt.style.display='none';
  const dToDoor=Math.hypot(avatarPos.x-0,avatarPos.z-(-5.9));
  const open=dToDoor<3.4;
  doorLeft.position.x=THREE.MathUtils.lerp(doorLeft.position.x, open?-1.18:-0.58, 0.12);
  doorRight.position.x=THREE.MathUtils.lerp(doorRight.position.x, open?1.18:0.58, 0.12);
  arrowM.material.opacity=0.7+Math.sin(Date.now()*0.004)*0.3;
  // NPC idle: penjual + resepsionis goyang halus
  npcOut.position.y=Math.abs(Math.sin(time*2.2))*0.05;
  npcOut.rotation.y=Math.sin(time*0.6)*0.25;
  receptionist.position.y=0.86+Math.sin(time*1.8)*0.02;
  receptionist.rotation.y=Math.sin(time*0.5)*0.2;
}
function updateCamera(){
  const tx=avatarPos.x, tz=avatarPos.z;
  const ca=Math.cos(camYaw), sa=Math.sin(camYaw);
  const camX= tx - sa*camDist*0.45;
  const camZ= tz + ca*camDist*0.45;
  if(snapCam){ camera.position.set(camX,8.5,camZ); snapCam=false; }
  else camera.position.lerp(new THREE.Vector3(camX,8.5,camZ), 0.22);
  camera.lookAt(tx, 0.9, tz-0.6);
}
const clock=new THREE.Clock();
// minimap — denah bergaya (tidak 1:1 world, tetap navigasi)
const mini=document.getElementById('minimap'), mctx=mini.getContext('2d');
function drawMini(){
  const w=160,h=160; mctx.clearRect(0,0,w,h);
  mctx.fillStyle='#eef5ff'; mctx.fillRect(0,0,w,h);
  function rbox(x,y,bw,bh,r){ if(mctx.roundRect){ mctx.beginPath(); mctx.roundRect(x,y,bw,bh,r); } else { mctx.beginPath(); mctx.rect(x,y,bw,bh); } }
  mctx.fillStyle='rgba(0,0,0,.06)';
  for(let x=8;x<160;x+=16) for(let y=8;y<160;y+=16){ mctx.beginPath(); mctx.arc(x,y,1,0,Math.PI*2); mctx.fill(); }
  mctx.fillStyle='#3b4656';
  rbox(14,96,132,52,10); mctx.fill();
  mctx.fillStyle='#fdf1d7'; rbox(18,88,124,14,6); mctx.fill();
  const gPulse = zone==='outside' ? 1 : 0.85;
  mctx.globalAlpha=gPulse; mctx.fillStyle='#ffffff'; mctx.strokeStyle='#ffb800'; mctx.lineWidth=2.2;
  rbox(30,76,100,20,6); mctx.fill(); mctx.stroke(); mctx.globalAlpha=1;
  // pintu masuk glowing
  mctx.fillStyle='#14d6b8'; mctx.shadowColor='#14d6b8'; mctx.shadowBlur=8;
  mctx.fillRect(72,74,16,8); mctx.shadowBlur=0;
  mctx.fillStyle='#3a2a1a'; mctx.font='700 6px Nunito'; mctx.textAlign='center'; mctx.fillText('MASUK',80,71);
  // ikon kecil luar
  mctx.fillStyle='#7ed957'; mctx.beginPath(); mctx.arc(28,108,5,0,Math.PI*2); mctx.fill(); // tree
  mctx.fillStyle='#f7c948'; mctx.fillRect(104,110,14,7);
  const lPulse = zone==='lobby' ? 1 : 0.92;
  mctx.globalAlpha=lPulse; mctx.fillStyle='#ffffff'; mctx.strokeStyle='#ff6b9e'; mctx.lineWidth=2.2;
  rbox(26,10,108,54,10); mctx.fill(); mctx.stroke(); mctx.globalAlpha=1;
  mctx.fillStyle='#ff6b9e'; mctx.font='900 7px Nunito'; mctx.fillText('LOBI · PORTOFOLIO',80,18);
  // karpet
  mctx.fillStyle='rgba(255,107,158,.18)'; mctx.beginPath(); mctx.ellipse(58,38,20,13,0,0,Math.PI*2); mctx.fill();
  mctx.fillStyle='#e8765d'; [[48,30],[66,30],[84,30],[100,30],[48,42],[66,42]].forEach(([x,y])=>{ mctx.beginPath(); mctx.arc(x,y,2.6,0,Math.PI*2); mctx.fill(); });
  // pintu keluar
  mctx.fillStyle='#ffb800'; mctx.fillRect(74,60,12,6);
  mctx.fillStyle='#6b4f3a'; mctx.font='700 5.5px Nunito'; mctx.fillText('KELUAR',80,69);
  function worldToMini(px,pz){
    if(zone==='lobby'){ const mx=((px+12)/24)*96+32, mz=((pz-(lobbyZ-7))/(14))*48+12; return [mx,mz]; }
    const mx=((px+18)/36)*132+14, mz=((pz+5)/17)*50+98; return [mx,mz];
  }
  const [mx,mz]=worldToMini(avatarPos.x, avatarPos.z);
  // dot player with halo
  mctx.fillStyle= zone==='lobby' ? 'rgba(26,158,122,.22)' : 'rgba(242,153,74,.22)';
  mctx.beginPath(); mctx.arc(mx,mz,9,0,Math.PI*2); mctx.fill();
  mctx.fillStyle= zone==='lobby' ? '#1a9e8a' : '#f2994a';
  mctx.beginPath(); mctx.arc(mx,mz,4.8,0,Math.PI*2); mctx.fill();
  mctx.strokeStyle='white'; mctx.lineWidth=1.6; mctx.stroke();
  mctx.beginPath(); mctx.moveTo(mx,mz); mctx.lineTo(mx+Math.sin(facing)*8, mz+Math.cos(facing)*8); mctx.strokeStyle='#1a1a1a'; mctx.lineWidth=1.3; mctx.stroke();
  document.getElementById('miniZone').textContent= zone==='lobby' ? 'LOBI' : 'LUAR';
}
mini.addEventListener('click',e=>{
  const r=mini.getBoundingClientRect(); const x=e.clientX - r.left, y=e.clientY - r.top;
  if(y<64){ avatarTarget.set(0,0,-15); }
  else { const px=((x-14)/132)*36-18, pz=((y-98)/50)*17-5; avatarTarget.set(px,0,pz); }
});
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),0.05);
  update(dt); updateCamera(); drawMini();
  const now=new Date(); const h=now.getHours(), m=String(now.getMinutes()).padStart(2,'0');
  document.getElementById('clock').textContent=(h<11?'Pagi':h<14?'Siang':h<18?'Sore':'Malam')+' · '+String(h).padStart(2,'0')+'.'+m;
  renderer.render(scene,camera);
}
animate();
addEventListener('resize',()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight)});
const modal=document.getElementById('modal');
function openModal(p){
  document.getElementById('mImg').src=p.img;
  document.getElementById('mCat').textContent=p.cat; document.getElementById('mCat').style.color=p.accent;
  document.getElementById('mTitle').textContent=p.title;
  document.getElementById('mBlurb').textContent=p.blurb;
  document.getElementById('mTags').innerHTML=`<span style="background:${p.accent};color:white;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:900">${p.cat}</span>`;
  const live=document.getElementById('mLive'), det=document.getElementById('mDetail');
  if(p.live){live.href=p.live; live.style.display=''} else live.style.display='none';
  det.href=p.detail; modal.classList.add('open');
}
function openGallery(){ const idx=Math.floor(Math.random()*portfolio.length); new THREE.TextureLoader().load(portfolio[idx].img,t=>{t.colorSpace=THREE.SRGBColorSpace; bigScreen.material.map=t; bigScreen.material.needsUpdate=true}); toast('Portofolio: klik booth di lobi'); }
window.openModal=openModal;
document.getElementById('modalClose').onclick=()=>modal.classList.remove('open');
document.getElementById('modalBg').onclick=()=>modal.classList.remove('open');
addEventListener('keydown',e=>{ if(e.key==='Escape') modal.classList.remove('open') });
