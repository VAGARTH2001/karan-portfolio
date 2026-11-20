import {useRef,useState} from 'react'
import {ArrowUpRight} from 'lucide-react'
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

 return <button className={`project-card ${previewing?'is-previewing':''}`}
  onClick={()=>onOpen(project)}
  onPointerEnter={event=>{if(event.pointerType!=='touch')playPreview()}}
  onPointerLeave={stopPreview}
  onBlur={stopPreview}
  aria-label={`Watch ${project.title}`}>
  <div className={`project-image ${project.aspect==='portrait'?'is-portrait':'is-landscape'}`}>
   <span className="poster-fallback" aria-hidden="true"><small>{project.category}</small><strong>{project.title}</strong><span>SELECTED WORK</span></span>
   <img className="project-backdrop" src={project.poster} alt="" loading="lazy" onError={event=>{event.currentTarget.style.display='none'}}/>
   <img className="project-poster" src={project.poster} alt="" loading="lazy" onError={event=>{event.currentTarget.style.display='none'}}/>
   {previewable&&<video ref={previewRef} className="project-preview" data-src={project.video} poster={project.poster} muted loop playsInline preload="none" aria-hidden="true"/>}
   <span className="project-index">SELECTED WORK <i>{String(index+1).padStart(2,'0')}</i></span>
   <span className="project-pill">{previewable?'VIDEO PREVIEW':'FULL VIDEO'}</span>
   <span className="project-overlay">
    <span className="project-overlay-category">{project.category}</span>
    <strong>{project.title}</strong>
    <span className="project-overlay-detail">{project.description}</span>
    <span className="project-watch">WATCH THE WORK <ArrowUpRight size={15}/></span>
   </span>
  </div>
 </button>
}
