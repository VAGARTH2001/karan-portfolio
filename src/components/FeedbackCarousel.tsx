import {useEffect,useRef,useState} from 'react'

const feedback=[
 {person:'Neeraj',path:'/feedback/neeraj.webp',label:'Original Topmate feedback from Neeraj'},
 {person:'Sowmiya Narayani',path:'/feedback/sowmiya-narayani.webp',label:'Original Topmate feedback from Sowmiya Narayani'},
 {person:'Luxmi Shanker',path:'/feedback/luxmi-shanker-consultation.webp',label:'Consultation feedback from Luxmi Shanker about YouTube growth, editing and thumbnail strategy'},
 {person:'Vagarth',path:'/feedback/vagarth.webp',label:'Original Topmate feedback from Vagarth'},
 {person:'Anupam Singh',path:'/feedback/anupam-singh.webp',label:'Original Topmate feedback from Anupam Singh'},
 {person:'Anvay Dubey',path:'/feedback/anvay-dubey.webp',label:'Original Topmate feedback from Anvay Dubey'},
 {person:'Anonymous',path:'/feedback/anonymous-01.webp',label:'Original anonymous Topmate feedback'},
 {person:'Rohit Agarwal',path:'/feedback/rohit-agarwal.webp',label:'Original Topmate feedback from Rohit Agarwal'}
]

export default function FeedbackCarousel(){
 const trackRef=useRef<HTMLDivElement>(null)
 const [paused,setPaused]=useState(false)

 useEffect(()=>{
  const track=trackRef.current
  if(!track||paused||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const firstSet=track.querySelector<HTMLElement>('.feedback-set')
  const firstSlide=firstSet?.querySelector<HTMLElement>('.feedback-slide')
  if(!firstSet||!firstSlide)return
  const gap=Number.parseFloat(window.getComputedStyle(firstSet).columnGap||'22')||22
  const step=firstSlide.getBoundingClientRect().width+gap
  const cycleWidth=firstSet.getBoundingClientRect().width
  const interval=window.setInterval(()=>{
   if(track.scrollLeft+step>=cycleWidth-2)track.scrollTo({left:0,behavior:'auto'})
   else track.scrollBy({left:step,behavior:'smooth'})
  },3800)
  return()=>window.clearInterval(interval)
 },[paused])

 const renderCards=(copy:number)=><div className="feedback-set" key={copy} aria-hidden={copy===1}>
  {feedback.map(item=><article className="feedback-slide" key={item.path}>
   <img className="feedback-art" src={item.path} alt={copy===0?item.label:''} loading="lazy" decoding="async"/>
  </article>)}
 </div>

 return <section className="feedback-section section-pad" id="feedback">
  <div className="feedback-heading">
   <div><p className="eyebrow">06 / CLIENT FEEDBACK</p><h2>GOOD WORDS.<br/><em>REAL PEOPLE.</em></h2></div>
   <p>Original feedback cards shared by people Karan has worked with. Luxmi Shanker’s card is consultation feedback about YouTube growth, editing and thumbnail strategy.</p>
  </div>
  <div className="feedback-track" ref={trackRef} role="region" aria-label="Automatically sliding original client feedback cards"
   onPointerEnter={()=>setPaused(true)} onPointerLeave={()=>setPaused(false)}
   onPointerDown={()=>setPaused(true)} onPointerUp={()=>setPaused(false)}
   onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)} tabIndex={0}>
   {renderCards(0)}{renderCards(1)}
  </div>
 </section>
}
