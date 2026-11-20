import {useRef,useState} from 'react'
import {ArrowUpRight,Play} from 'lucide-react'
import type {Project} from '../data/projects'

export default function ProjectCard({project,onOpen,index}:{project:Project;onOpen:(p:Project)=>void;index:number}){
 const previewRef=useRef<HTMLVideoElement>(null)
 const [previewing,setPreviewing]=useState(false)
 const previewable=Boolean(project.video&&!project.video.includes('youtube.com/embed'))

 const playPreview=()=>{
  const video=previewRef.current
  if(!video||!previewable)return
  if(!video.getAttribute('src'))video.src=video.dataset.src||''
  if(!video.src)return
  video.play().then(()=>setPreviewing(true)).catch(()=>setPreviewing(false))
 }
 const stopPreview=()=>{
  const video=previewRef.current
  if(video){video.pause();try{video.currentTime=0}catch{}}
  setPreviewing(false)
 }

 return <button
  className={`project-card ${project.aspect==='landscape'?'landscape':''} ${previewing?'is-previewing':''}`}
  onClick={()=>onOpen(project)}
  onMouseEnter={playPreview}
  onMouseLeave={stopPreview}
  onFocus={playPreview}
  onBlur={stopPreview}
  aria-label={`Play ${project.title}`}
 >
  <div className="project-image">
   <span className="poster-fallback" aria-hidden="true"><small>{project.category}</small><strong>{project.title}</strong><span>SELECTED WORK</span></span>
   <img className="project-poster" src={project.poster} alt="" loading="lazy" onError={event=>{event.currentTarget.style.display='none'}}/>
   {previewable&&<video ref={previewRef} className="project-preview" data-src={project.video} poster={project.poster} muted loop playsInline preload="none" aria-hidden="true"/>}
   <span className="project-index">0{index+1}</span>
   <span className="play-button"><Play fill="currentColor" size={17}/></span>
   <span className="project-open"><ArrowUpRight size={18}/></span>
   <span className="project-overlay">
    <span className="project-overlay-category">{project.category}</span>
    <strong>{project.title}</strong>
    <span className="project-overlay-detail">{project.client}</span>
   </span>
  </div>
  <div className="project-meta">
   <div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3></div>
   <span className="project-client">{project.client}</span>
  </div>
 </button>
}
