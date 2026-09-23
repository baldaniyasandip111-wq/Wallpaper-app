"use client";
import {useEffect,useMemo,useState} from "react";
import {Heart,Download,Search,Maximize2,X,Share2,Plus} from "lucide-react";
const wallpapers=[
{id:1,title:"Mountain Night",cat:"Nature",url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90"},
{id:2,title:"Neon City",cat:"City",url:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=90"},
{id:3,title:"Ocean Calm",cat:"Nature",url:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90"},
{id:4,title:"Purple Abstract",cat:"Abstract",url:"https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1200&q=90"},
{id:5,title:"Minimal Lines",cat:"Minimal",url:"https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=90"},
{id:6,title:"Forest Road",cat:"Nature",url:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=90"}];
export default function Home(){
const[c,setC]=useState("All");const[q,setQ]=useState("");const[f,setF]=useState<number[]>([]);const[selected,setSelected]=useState<(typeof wallpapers)[number]|null>(null);const[installEvent,setInstallEvent]=useState<any>(null);
useEffect(()=>{try{setF(JSON.parse(localStorage.getItem("wallpaper-favorites")||"[]"))}catch{};const handler=(e:any)=>{e.preventDefault();setInstallEvent(e)};window.addEventListener("beforeinstallprompt",handler);if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").catch(()=>{});return()=>window.removeEventListener("beforeinstallprompt",handler)},[]);
useEffect(()=>{localStorage.setItem("wallpaper-favorites",JSON.stringify(f))},[f]);
const list=useMemo(()=>wallpapers.filter(w=>(c==="All"||c==="Favorites"&&f.includes(w.id)||c===w.cat)&&w.title.toLowerCase().includes(q.toLowerCase())),[c,q,f]);
const toggleFav=(id:number)=>setF(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
const share=async(w:typeof wallpapers[number])=>{try{if(navigator.share)await navigator.share({title:w.title,url:w.url});else await navigator.clipboard.writeText(w.url)}catch{}};
return <main><div className="wrap">
<nav className="nav"><div className="brand">Wallpaper<span>.app</span></div><div className="navlinks"><button onClick={()=>setC("All")}>Popular</button><button onClick={()=>document.querySelector(".cats")?.scrollIntoView({behavior:"smooth"})}>Categories</button><button onClick={()=>setC("Favorites")}>Favorites ♥ {f.length}</button></div>{installEvent&&<button className="installBtn" onClick={async()=>{await installEvent.prompt();setInstallEvent(null)}}><Plus size={17}/> Install App</button>}</nav>
<section className="hero"><h1>Find your next wallpaper.</h1><p>Beautiful wallpapers made for your phone.</p><div className="search"><Search size={22}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search wallpapers..."/><button>Search</button></div></section>
<div className="cats">{["All","Nature","City","Abstract","Minimal"].map(x=><button key={x} onClick={()=>setC(x)} className={"cat "+(c===x?"active":"")}>{x}</button>)}</div>
<section className="grid">{list.map(w=><article className="card" key={w.id}><button className="thumb" aria-label={"Open "+w.title} onClick={()=>setSelected(w)} style={{backgroundImage:"url('"+w.url+"')"}}/><div className="info"><div><b>{w.title}</b><small>{w.cat}</small></div><div className="actions"><button className="icon" aria-label="Favorite" onClick={()=>toggleFav(w.id)}><Heart size={18} fill={f.includes(w.id)?"currentColor":"none"}/></button><a className="icon" aria-label="Download" href={w.url+"&dl=1"} target="_blank" rel="noreferrer"><Download size={18}/></a><button className="icon" aria-label="Open" onClick={()=>setSelected(w)}><Maximize2 size={18}/></button></div></div></article>)}</section>
<footer className="footer">© 2026 Wallpaper.app · Made for mobile</footer></div>
{selected&&<div className="modal" role="dialog" aria-modal="true"><button className="close" onClick={()=>setSelected(null)}><X size={24}/></button><div className="modalImage" style={{backgroundImage:"url('"+selected.url+"')"}}/><div className="modalBar"><div><h2>{selected.title}</h2><span>{selected.cat}</span></div><div className="actions"><button className="icon" onClick={()=>toggleFav(selected.id)}><Heart size={20} fill={f.includes(selected.id)?"currentColor":"none"}/></button><button className="icon" onClick={()=>share(selected)}><Share2 size={20}/></button><a className="downloadBtn" href={selected.url+"&dl=1"} target="_blank" rel="noreferrer"><Download size={20}/> Download</a></div></div></div>}
</main>}