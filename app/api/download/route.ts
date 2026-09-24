import {NextRequest} from "next/server";

const images:Record<string,{title:string,url:string}>={
"1":{title:"Mountain Night",url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90"},
"2":{title:"Neon City",url:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=90"},
"3":{title:"Ocean Calm",url:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90"},
"4":{title:"Purple Abstract",url:"https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1200&q=90"},
"5":{title:"Minimal Lines",url:"https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=90"},
"6":{title:"Forest Road",url:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=90"},
"7":{title:"Green Mountain",url:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90"},
"8":{title:"Blue City Lights",url:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=90"},
"9":{title:"Golden Beach",url:"https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=90"},
"10":{title:"Pink Glow",url:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=90"},
"11":{title:"Clean White",url:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=90"},
"12":{title:"Forest Mist",url:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=90"},
"13":{title:"City Avenue",url:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=90"},
"14":{title:"Purple Sky",url:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=90"},
"15":{title:"Simple Shadow",url:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90"},
"16":{title:"Lake Morning",url:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=90"},
"17":{title:"Night Street",url:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90"},
"18":{title:"Soft Gradient",url:"https://images.unsplash.com/photo-1557682260-9677f2b2c6e5?auto=format&fit=crop&w=1200&q=90"},
"19":{title:"Dark Minimal",url:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=90"},
"20":{title:"Green Valley",url:"https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=90"},
"21":{title:"Modern Buildings",url:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=90"},
"22":{title:"Blue Waves",url:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=90"},
"23":{title:"Calm Architecture",url:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90"},
"24":{title:"Autumn Trail",url:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=90"},
"25":{title:"Desert Dunes",url:"https://images.unsplash.com/photo-1516563670759-299070f0dc54?auto=format&fit=crop&w=1200&q=90"},
"26":{title:"Tokyo Glow",url:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=90"},
"27":{title:"Electric Blue",url:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=90"},
"28":{title:"Warm Minimal",url:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90"},
"29":{title:"Alpine Lake",url:"https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=90"},
"30":{title:"Rainy Downtown",url:"https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=90"},
"31":{title:"Violet Energy",url:"https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=1200&q=90"},
"32":{title:"Quiet Concrete",url:"https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=90"},
"33":{title:"Misty Peaks",url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90"},
"34":{title:"City Rain",url:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=90"},
"35":{title:"Cosmic Violet",url:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=90"},
"36":{title:"Soft Geometry",url:"https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=90"},
"37":{title:"Forest Light",url:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=90"},
"38":{title:"Midnight Tower",url:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=90"},
"39":{title:"Blue Horizon",url:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=90"},
"40":{title:"Quiet Space",url:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=90"}
};

export async function GET(request:NextRequest){
const id=request.nextUrl.searchParams.get("id")||"";
const image=images[id];
if(!image)return new Response("Wallpaper not found",{status:404});
try{
const upstream=await fetch(image.url,{cache:"no-store"});
if(!upstream.ok)return new Response("Download failed",{status:502});
const type=upstream.headers.get("content-type")||"image/jpeg";
const body=await upstream.arrayBuffer();
const filename=image.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")+".jpg";
return new Response(body,{status:200,headers:{
"Content-Type":type,
"Content-Disposition":`attachment; filename="${filename}"`,
"Cache-Control":"public, max-age=86400"
}});
}catch{return new Response("Download failed",{status:502})}
}
