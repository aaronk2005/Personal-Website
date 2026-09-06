import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { travelPhotos, type TravelPhoto } from '../data/photos';
import { ChannelLayout } from './AppShell';
import { useConsole, usePlayClock } from './ConsoleSystem';
import { shuffled } from './gameRules';

export function PhotoChannel() {
  return <ChannelLayout number="12" eyebrow="Pictures & memories" title="Photo Channel" intro="An album, a slideshow, and a little photo fun." compact><PhotoLibrary /></ChannelLayout>;
}
function PhotoLibrary() {
  const [localPhotos,setLocalPhotos] = useState<TravelPhoto[]>([]);
  const [selected,setSelected] = useState<number|null>(null);
  const [playing,setPlaying] = useState(false);
  const [mood,setMood] = useState('Original');
  const [rotation,setRotation] = useState(0);
  const [puzzle,setPuzzle] = useState<number[]|null>(null);
  const [piece,setPiece] = useState<number|null>(null);
  const [moves,setMoves] = useState(0);
  const [notice,setNotice] = useState('');
  const [loading,setLoading] = useState(false);
  const urls = useRef<string[]>([]);
  const mounted = useRef(true);
  const {paused,chime} = useConsole();
  const photos = [...travelPhotos,...localPhotos], photo = selected===null?null:photos[selected];
  const solved = !!puzzle && puzzle.every((value,index)=>value===index);
  useEffect(()=>{mounted.current=true;return ()=>{mounted.current=false;urls.current.forEach(url=>URL.revokeObjectURL(url));urls.current=[];};},[]);
  const resetView=()=>{setMood('Original');setRotation(0);setPuzzle(null);setPiece(null);setMoves(0);};
  const navigate=(direction:number)=>{setSelected(index=>((index??0)+direction+photos.length)%photos.length);resetView();};
  usePlayClock(playing && photos.length>1,paused,()=>navigate(1),4000);
  const open=(index:number)=>{setSelected(index);setPlaying(false);resetView();};
  const importPhotos=async(event:ChangeEvent<HTMLInputElement>)=>{
    const files=Array.from(event.target.files??[]);event.target.value='';
    if(!files.length)return;
    setLoading(true);setNotice('');
    const accepted:TravelPhoto[]=[];let skipped=Math.max(0,files.length-(24-localPhotos.length));
    for(const file of files.slice(0,Math.max(0,24-localPhotos.length))){
      if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>15*1024*1024){skipped++;continue;}
      const src=URL.createObjectURL(file);
      let width=0,height=0;
      const valid=await new Promise<boolean>(resolve=>{const img=new Image();const timeout=window.setTimeout(()=>resolve(false),10000);img.onload=()=>{clearTimeout(timeout);width=img.naturalWidth;height=img.naturalHeight;resolve(width>0&&width*height<=40000000);};img.onerror=()=>{clearTimeout(timeout);resolve(false);};img.src=src;});
      if(!valid||!mounted.current){URL.revokeObjectURL(src);skipped++;continue;}
      urls.current.push(src);accepted.push({src,title:file.name.replace(/\.[^.]+$/,''),width,height});
    }
    if(!mounted.current)return;
    setLocalPhotos(old=>[...old,...accepted]);setLoading(false);
    setNotice(`${accepted.length} photo${accepted.length===1?'':'s'} opened on this device.${skipped?' '+skipped+' skipped. Use JPEG, PNG, or WebP under 15 MB (up to 24 photos).':''}`);
  };
  const startPuzzle=()=>{setPlaying(false);setPiece(null);setMoves(0);const next=shuffled([0,1,2,3,4,5]);if(next.every((n,i)=>n===i))[next[0],next[1]]=[next[1],next[0]];setPuzzle(next);};
  const swap=(index:number)=>{
    if(!puzzle||solved||paused)return;
    if(piece===null){setPiece(index);return;}if(piece===index){setPiece(null);return;}
    const next=[...puzzle];[next[piece],next[index]]=[next[index],next[piece]];
    setPuzzle(next);setPiece(null);setMoves(n=>n+1);chime(next.every((n,i)=>n===i));
  };
  const filters:Record<string,string>={Original:'none','Black & white':'grayscale(1)',Sepia:'sepia(.85)',Bright:'brightness(1.15) saturate(1.2)'};
  return <section className="photo-workspace">
    <div className="photo-toolbar"><div><h2>{photo?'Photo viewer':'Photo album'}</h2><p>{photo?`${selected!+1} / ${photos.length}`:`${photos.length} photos`}</p></div>
      {photo?<button className="play-button" onClick={()=>{setSelected(null);setPlaying(false);resetView();}}>All photos</button>:<label className={'play-button photo-import'+(loading?' is-loading':'')}>{loading?'Opening…':'Open photos'}<input type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={loading} onChange={importPhotos} /></label>}
    </div>
    {!photo ? <>
      {photos.length ? <div className="photo-grid">{photos.map((item,index)=><button key={item.src} aria-label={'Open photo: '+item.title} onClick={()=>open(index)}><img src={item.src} alt="" loading="lazy"/><span>{item.title}</span>{item.location&&<small>{item.location}</small>}</button>)}</div>:
        <div className="photo-empty"><img src="/images/wii/photo-channel.jpg" alt="Original Wii Photo Channel artwork"/><h3>Travel album</h3><p>No travel photos yet. You can open photos from your device to try the viewer, slideshow, and puzzle.</p></div>}
      <p className="photo-privacy">Photos opened from your device stay private in this tab. They are not uploaded or added to Aaron’s public album. JPEG, PNG, or WebP; up to 24 photos, 15 MB each.</p>
      {localPhotos.length>0&&<button className="play-button" onClick={()=>{urls.current.forEach(url=>URL.revokeObjectURL(url));urls.current=[];setLocalPhotos([]);setNotice('Local photos cleared from this tab.');}}>Clear local photos</button>}
    </>:<>
      {puzzle?<div className="photo-puzzle-wrap"><div className="photo-puzzle" aria-label="Six-piece photo puzzle" style={{aspectRatio:photo.width&&photo.height?photo.width/photo.height:4/3}}>{puzzle.map((value,index)=><button key={index} aria-label={'Position '+(index+1)+', piece '+(value+1)} aria-pressed={piece===index} disabled={solved||paused} onClick={()=>swap(index)} style={{backgroundImage:`url("${photo.src}")`,backgroundSize:'300% 200%',backgroundPosition:`${value%3*50}% ${Math.floor(value/3)*100}%`}} />)}</div><p role="status">{solved?`Picture complete in ${moves} swaps!`:`${moves} swaps · Select two pieces to swap them.`}</p><details><summary>Show original</summary><img src={photo.src} alt={'Puzzle reference: '+photo.title}/></details></div>:
      <div className="photo-viewer" tabIndex={0} aria-label="Photo viewer. Left and right arrow keys change photos." onKeyDown={e=>{if(!paused&&['ArrowLeft','ArrowRight'].includes(e.key)&&photos.length>1){e.preventDefault();setPlaying(false);navigate(e.key==='ArrowLeft'?-1:1);}}}><img src={photo.src} alt={photo.title} style={{filter:filters[mood],transform:`rotate(${rotation}deg)`,maxWidth:rotation%180?'60%':undefined}}/></div>}
      <div className="photo-caption"><strong>{photo.title}</strong>{photo.location&&<span>{photo.location}</span>}</div>
      <div className="photo-actions">
        <button className="play-button" disabled={photos.length<2||paused} onClick={()=>{setPlaying(false);navigate(-1);}}>Previous</button>
        <button className="play-button" disabled={photos.length<2||!!puzzle||paused} aria-pressed={playing} onClick={()=>setPlaying(!playing)}>{playing?'Pause slideshow':'Slideshow'}</button>
        <button className="play-button" disabled={photos.length<2||paused} onClick={()=>{setPlaying(false);navigate(1);}}>Next</button>
      </div>
      <div className="photo-fun"><strong>Fun!</strong>{puzzle?<><button className="play-button" onClick={startPuzzle}>Shuffle again</button><button className="play-button" onClick={()=>setPuzzle(null)}>Back to photo</button></>:<>
        <label>Mood<select value={mood} onChange={e=>{setPlaying(false);setMood(e.target.value);}}>{Object.keys(filters).map(name=><option key={name}>{name}</option>)}</select></label>
        <button className="play-button" onClick={()=>{setPlaying(false);setRotation(r=>(r+90)%360);}}>Rotate</button><button className="play-button" onClick={startPuzzle}>Puzzle</button>
      </>}</div>
    </>}
    <p className="play-notice" role="status">{notice}</p>
  </section>;
}
