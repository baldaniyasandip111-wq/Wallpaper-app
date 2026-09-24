"use client";
import {useEffect,useMemo,useState} from "react";
import {Heart,Download,Search,Maximize2,X,Share2,Plus,ArrowUp,Smartphone,Shuffle} from "lucide-react";

const wallpapers=[
{id:1,title:"Mountain Night",cat:"Nature",url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90"},
{id:2,title:"Neon City",cat:"City",url:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=90"},
{id:3,title:"Ocean Calm",cat:"Nature",url:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90"},
{id:4,title:"Purple Abstract",cat:"Abstract",url:"https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1200&q=90"},
{id:5,title:"Minimal Lines",cat:"Minimal",url:"https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=90"},
{id:6,title:"Forest Road",cat:"Nature",url:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=90"},
{id:7,title:"Green Mountain",cat:"Nature",url:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90"},
{id:8,title:"Blue City Lights",cat:"City",url:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=90"},
{id:9,title:"Golden Beach",cat:"Nature",url:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=90"},
{id:10,title:"Pink Glow",cat:"Abstract",url:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=90"},
{id:11,title:"Clean White",cat:"Minimal",url:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=90"},
{id:12,title:"Forest Mist",cat:"Nature",url:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=90"},
{id:13,title:"City Avenue",cat:"City",url:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=90"},
{id:14,title:"Purple Sky",cat:"Abstract",url:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=90"},
{id:15,title:"Simple Shadow",cat:"Minimal",url:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90"},
{id:16,title:"Lake Morning",cat:"Nature",url:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=90"},
{id:17,title:"Night Street",cat:"City",url:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90"},
{id:18,title:"Soft Gradient",cat:"Abstract",url:"https://images.unsplash.com/photo-1557682260-9677f2b2c6e5?auto=format&fit=crop&w=1200&q=90"},
{id:19,title:"Dark Minimal",cat:"Minimal",url:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=90"},
{id:20,title:"Green Valley",cat:"Nature",url:"https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=90"},
{id:21,title:"Modern Buildings",cat:"City",url:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=90"},
{id:22,title:"Blue Waves",cat:"Abstract",url:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=90"},
{id:23,title:"Calm Architecture",cat:"Minimal",url:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90"},
{id:24,title:"Autumn Trail",cat:"Nature",url:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=90"}
];

export default function Home(){
const[c,setC]=useState("All");
const[q,setQ]=useState("");
const[f,setF]=useState<number[]>([]);
const[selected,setSelected]=useState<(typeof wallpapers)[number]|null>(null);
const[installEvent,setInstallEvent]=useState<any>(null);
const[showGuide,setShowGuide]=useState(false);
const[showPhonePreview,setShowPhonePreview]=useState(false);
const[toast,setToast]=useState("");
const[recent,setRecent]=useState<number[]>([]);
const[live,setLive]=useState<string|null>(null);
const[livePaused,setLivePaused]=useState(false);

useEffect(()=>{
try{setF(JSON.parse(localStorage.getItem("wallpaper-favorites")||"[]"));setRecent(JSON.parse(localStorage.getItem("wallpaper-recent")||"[]"))}catch{}
const handler=(e:any)=>{e.preventDefault();setInstallEvent(e)};
window.addEventListener("beforeinstallprompt",handler);
if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").catch(()=>{});
return()=>window.removeEventListener("beforeinstallprompt",handler)
},[]);

useEffect(()=>{localStorage.setItem("wallpaper-favorites",JSON.stringify(f))},[f]);
useEffect(()=>{localStorage.setItem("wallpaper-recent",JSON.stringify(recent))},[recent]);

const list=useMemo(()=>wallpapers.filter(w=>(c==="All"||(c==="Favorites"&&f.includes(w.id))||c===w.cat)&&w.title.toLowerCase().includes(q.toLowerCase())),[c,q,f]);
const notify=(message:string)=>{setToast(message);window.setTimeout(()=>setToast(""),1800)};
const downloadWallpaper=async(id:number)=>{try{const response=await fetch("/api/download?id="+id);if(!response.ok)throw new Error("Download failed");const blob=await response.blob();const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="wallpaper.jpg";document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);notify("Download started")}catch{notify("Download failed")}};
const toggleFav=(id:number)=>{setF(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);notify(f.includes(id)?"Removed from favorites":"Saved to favorites")};
const share=async(w:typeof wallpapers[number])=>{try{if(navigator.share){await navigator.share({title:w.title,url:w.url});notify("Share sheet opened")}else{await navigator.clipboard.writeText(w.url);notify("Wallpaper link copied")}}catch{}};
const openWallpaper=(w:typeof wallpapers[number])=>{setSelected(w);setShowGuide(false);setShowPhonePreview(false);setRecent(v=>[w.id,...v.filter(id=>id!==w.id)].slice(0,6))};
const closeWallpaper=()=>{setSelected(null);setShowGuide(false);setShowPhonePreview(false)};
const showAll=()=>{setC("All");window.scrollTo({top:0,behavior:"smooth"})};
const surpriseMe=()=>{const pool=list.length?list:wallpapers;openWallpaper(pool[Math.floor(Math.random()*pool.length)])};

useEffect(()=>{
if(!selected)return;
const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")closeWallpaper()};
document.addEventListener("keydown",onKey);
const previous=document.body.style.overflow;
document.body.style.overflow="hidden";
return()=>{document.removeEventListener("keydown",onKey);document.body.style.overflow=previous}
},[selected]);

return <main><div className="wrap">
<nav className="nav">
<div className="brand">Wallpaper<span>.app</span></div>
<div className="navlinks"><button onClick={showAll}>Popular</button><button onClick={()=>document.querySelector(".cats")?.scrollIntoView({behavior:"smooth"})}>Categories</button><button onClick={()=>{setC("Favorites");window.scrollTo({top:0,behavior:"smooth"})}}>Favorites ♥ {f.length}</button><button onClick={()=>document.querySelector(".recent")?.scrollIntoView({behavior:"smooth"})}>Recent</button></div>
{installEvent&&<button className="installBtn" onClick={async()=>{await installEvent.prompt();setInstallEvent(null)}}><Plus size={17}/> Install App</button>}
</nav>
<section className="hero"><h1>Find your next wallpaper.</h1><p>24 beautiful wallpapers made for your phone.</p><div className="search"><Search size={22}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search wallpapers..." aria-label="Search wallpapers"/><button onClick={()=>document.querySelector(".grid")?.scrollIntoView({behavior:"smooth"})}>Search</button></div></section>
<section className="liveSection"><div className="sectionHead"><div><h2>Live Wallpapers</h2><span>Animated wallpapers • preview in real time</span></div><span className="liveBadge">LIVE</span></div><div className="liveGrid">{[{id:"aurora",name:"Aurora Flow",sub:"Slow northern lights",cls:"liveAurora"},{id:"nebula",name:"Neon Nebula",sub:"Moving cosmic glow",cls:"liveNebula"},{id:"ocean",name:"Ocean Motion",sub:"Calm flowing waves",cls:"liveOcean"}].map(x=><button key={x.id} className={"liveCard "+x.cls+(live===x.id?" active":"")} onClick={()=>{setLive(x.id);setLivePaused(false)}}><div className={"liveVisual "+(livePaused?"paused":"")}><i></i><b>{x.name}</b><small>{x.sub}</small></div><span className="livePlay">▶</span></button>)}</div></section><div className="cats">{["All","Nature","City","Abstract","Minimal","Favorites"].map(x=>{const count=x==="All"?wallpapers.length:x==="Favorites"?f.length:wallpapers.filter(w=>w.cat===x).length;return <button key={x} onClick={()=>setC(x)} className={"cat "+(c===x?"active":"")}>{x}<span className="catCount">{count}</span></button>})}</div>
<div className="sectionHead"><div><h2>{c==="Favorites"?"Your Favorites":c==="All"?"Latest Wallpapers":c}</h2><span>{list.length} wallpaper{list.length===1?"":"s"}</span></div><div className="sectionActions">{c!=="All"&&<button className="clearBtn" onClick={()=>setC("All")}>Show all</button>}<button className="randomBtn" onClick={surpriseMe}><Shuffle size={16}/> Surprise me</button></div></div>
<section className="recent"><div className="sectionHead"><div><h2>Recently Viewed</h2><span>{recent.length?`Last ${recent.length} wallpapers`:"Open a wallpaper to see it here"}</span></div>{recent.length>0&&<button className="clearBtn" onClick={()=>setRecent([])}>Clear</button>}</div>{recent.length?<div className="recentGrid">{recent.map(id=>{const w=wallpapers.find(x=>x.id===id);if(!w)return null;return <button key={id} className="recentCard" onClick={()=>openWallpaper(w)} style={{backgroundImage:"url('"+w.url+"')"}}><span>{w.title}</span></button>})}</div>:<div className="empty recentEmpty"><h3>No recently viewed wallpapers</h3><p>Open any wallpaper above and it will appear here.</p></div>}</section>{list.length===0?<div className="empty"><Heart size={34}/><h3>{c==="Favorites"?"No favorites yet":"No wallpapers found"}</h3><p>{c==="Favorites"?"Tap the heart on any wallpaper to save it here.":"Try another search or category."}</p><button className="emptyBtn" onClick={()=>{setC("All");setQ("")}}>Explore wallpapers</button></div>:<section className="grid">{list.map(w=><article className="card" key={w.id}><button className="thumb" aria-label={"Open "+w.title} onClick={()=>openWallpaper(w)} style={{backgroundImage:"url('"+w.url+"')"}}/><div className="info"><div><b>{w.title}</b><small>{w.cat}</small></div><div className="actions"><button className="icon" aria-label="Favorite" onClick={()=>toggleFav(w.id)}><Heart size={18} fill={f.includes(w.id)?"currentColor":"none"}/></button><a className="icon" aria-label="Download" href={"/api/download?id="+w.id} onClick={(e)=>{e.preventDefault();downloadWallpaper(w.id)}}><Download size={18}/></a><button className="icon" aria-label="Open" onClick={()=>openWallpaper(w)}><Maximize2 size={18}/></button></div></div></article>)}</section>}
<footer className="footer">© 2026 Wallpaper.app · 24 wallpapers · Made for mobile</footer>
</div>
<button className="topBtn" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}><ArrowUp size={19}/></button>
{selected&&<div className="modal" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={e=>{if(e.target===e.currentTarget)closeWallpaper()}}><button className="close" title="Close preview" onClick={closeWallpaper}><X size={24}/></button><div className="modalImage" style={{backgroundImage:"url('"+selected.url+"')"}}/><div className="modalBar"><div><h2>{selected.title}</h2><span>{selected.cat}</span></div><div className="actions"><button className="icon" onClick={()=>toggleFav(selected.id)}><Heart size={20} fill={f.includes(selected.id)?"currentColor":"none"}/></button><button className="icon" onClick={()=>share(selected)}><Share2 size={20}/></button><button className="setBtn" onClick={()=>setShowGuide(v=>!v)}><Smartphone size={19}/> Set Wallpaper</button><button className="previewBtn" onClick={()=>setShowPhonePreview(true)}><Smartphone size={19}/> Phone Preview</button><a className="downloadBtn" href={"/api/download?id="+selected.id} download onClick={(e)=>{e.preventDefault();downloadWallpaper(selected.id)}}><Download size={20}/> Download</a></div></div>{showGuide&&<div className="wallGuide"><div className="guideHead"><h3>How to set wallpaper</h3><button className="guideClose" onClick={()=>setShowGuide(false)} aria-label="Close guide"><X size={18}/></button></div><ol><li>Tap <b>Download</b> above.</li><li>Open the downloaded photo in <b>Google Photos</b> or your Gallery.</li><li>Tap <b>⋮ → Use as → Wallpaper</b>.</li><li>Choose <b>Home screen</b>, <b>Lock screen</b>, or both, then apply.</li></ol></div>}</div>}
{selected&&showPhonePreview&&<div className="phonePreviewOverlay"><div className="phonePreviewCard"><button className="previewClose" onClick={()=>setShowPhonePreview(false)} aria-label="Close phone preview"><X size={20}/></button><div className="phoneFrame"><div className="phoneScreen" style={{backgroundImage:"url('"+selected.url+"')"}}><div className="phoneTop"><span>9:41</span><span>● ◼︎ ▰</span></div><div className="phoneBottom"><span>◉</span><span>⌂</span><span>▣</span></div></div></div><h3>Phone Preview</h3><p>See how this wallpaper looks on a phone screen.</p></div></div>}
{live&&<div className="liveModal" role="dialog" aria-modal="true"><div className="liveStage"><button className="liveClose" onClick={()=>setLive(null)} aria-label="Close live wallpaper">×</button><div className={"liveVisual liveBig "+(livePaused?"paused":"")+" "+(live==="aurora"?"liveAurora":live==="nebula"?"liveNebula":"liveOcean")}><i></i><b>{live==="aurora"?"Aurora Flow":live==="nebula"?"Neon Nebula":"Ocean Motion"}</b><small>Live preview</small></div><div className="liveControls"><button onClick={()=>setLivePaused(v=>!v)}>{livePaused?"▶ Play":"Ⅱ Pause"}</button><button onClick={()=>setLive(null)}>Close</button></div><p>Live preview works inside the app. Android system Live Wallpaper installation needs a native Android live-wallpaper app.</p></div></div>}<div className={"toast "+(toast?"show":"")} role="status" aria-live="polite">{toast}</div>
</main>
}