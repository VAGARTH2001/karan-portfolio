import {useEffect} from 'react'
import {ArrowLeft,ArrowRight,ArrowUpRight,X} from 'lucide-react'
import type {Project} from '../data/projects'

export default function VideoModal({project,onClose,onPrevious,onNext}:{project:Project|null;onClose:()=>void;onPrevious:()=>void;onNext:()=>void}){
 useEffect(()=>{
  if(!project)return
  const old=document.body.style.overflow
  document.body.style.overflow='hidden'
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==='Escape')onClose()
   if(event.key==='ArrowLeft')onPrevious()
   if(event.key==='ArrowRight')onNext()
  }
  window.addEventListener('keydown',onKey)
  return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',onKey)}
 },[project,onClose,onPrevious,onNext])
 if(!project)return null
 const youtube=project.video.includes('youtube.com/embed')
 return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={project.title} onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}>
  <div className={`video-modal ${youtube?'modal-wide':''}`}>
   <div className="modal-media">
    {youtube?<iframe src={`${project.video}?autoplay=1&rel=0`} title={project.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>:project.video?<video src={project.video} controls autoPlay playsInline/>:<p className="video-placeholder">This project video will be available here once its link is added.</p>}
   </div>
   <aside className="modal-info">
    <div className="modal-top"><span className="eyebrow">{project.category}</span><button className="icon-button" onClick={onClose} aria-label="Close video"><X/></button></div>
    <h3>{project.title}</h3>
    <p className="modal-description">{project.description}</p>
    <div className="modal-details">
     <div><span>CLIENT</span><strong>{project.client||'Independent project'}</strong></div>
     <div><span>FORMAT</span><strong>{project.aspect==='portrait'?'Vertical · 9:16':'Landscape · 16:9'}</strong></div>
     {project.platform&&<div><span>PLATFORM</span><strong>{project.platform}</strong></div>}
     {typeof project.viewCount==='number'&&<div><span>PUBLIC VIEWS</span><strong>{new Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(project.viewCount)}</strong></div>}
    </div>
    {project.publishedUrl&&<a className="modal-post-link" href={project.publishedUrl} target="_blank" rel="noreferrer">VIEW PUBLISHED POST <ArrowUpRight size={14}/></a>}
    <div className="modal-navigation"><button onClick={onPrevious} aria-label="Previous project"><ArrowLeft size={17}/><span>PREVIOUS</span></button><button onClick={onNext} aria-label="Next project"><span>NEXT</span><ArrowRight size={17}/></button></div>
   </aside>
  </div>
 </div>
}
