import {useRef} from 'react'
import {ChevronLeft,ChevronRight} from 'lucide-react'
import type {Project} from '../data/projects'
import ProjectCard from './ProjectCard'

export default function ProjectCarousel({projects,onOpen}:{projects:Project[];onOpen:(project:Project)=>void}){
 const trackRef=useRef<HTMLDivElement>(null)
 const move=(direction:number)=>{
  const track=trackRef.current
  if(!track)return
  const slide=track.querySelector<HTMLElement>('.work-carousel-slide')
  track.scrollBy({left:direction*((slide?.offsetWidth||track.clientWidth*.8)+24),behavior:'smooth'})
 }
 return <div className="work-carousel">
  <div className="carousel-controls">
   <span>DRAG TO EXPLORE <span className="red-dot">✳</span></span>
   <div>
    <button type="button" onClick={()=>move(-1)} aria-label="Previous projects"><ChevronLeft size={19}/></button>
    <button type="button" onClick={()=>move(1)} aria-label="Next projects"><ChevronRight size={19}/></button>
   </div>
  </div>
  <div className="work-carousel-track" ref={trackRef}>
   {projects.map((project,index)=><div className="work-carousel-slide" key={project.id}>
    <ProjectCard project={project} index={index} onOpen={onOpen}/>
   </div>)}
  </div>
 </div>
}
