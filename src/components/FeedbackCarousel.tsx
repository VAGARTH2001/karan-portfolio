import {useEffect,useRef,useState} from 'react'

const feedback=[
 {person:'Neeraj',quote:'Nice Guy'},
 {person:'Sowmiya Narayani',quote:'Karan helped to learn more about making video editing a career and shared knowledge on where to start and how to grow in this field.'},
 {person:'Luxmi Shanker',quote:'It was a productive discussion where we delved into the insights of my YouTube channel and explored strategies for growth. We also had an in-depth conversation about improving video editing and thumbnail quality.'},
 {person:'Vagarth',quote:'Meeting was helpful for me, with the help of karan I was able to Enhance my grounds on Video editing and Social media content creation.'},
 {person:'Anupam Singh',quote:'Big thanks to KARAN for an awesome video editing course Your clear lessons and hands-on tips helped me level up my skills. Highly recommend VideoEditing Grateful LearnAndCreate'},
 {person:'Anvay Dubey',quote:'Karan\'s guidance on social media content creation was invaluable. His expertise helped me understands how to grow my channel and create engaging content. Thank you "Karan".'},
 {person:'Anonymous',quote:'I could get all my doubts cleared.'},
 {person:'Rohit Agarwal',quote:'I attended a call to understand about video editing and the roadmap to get started. All my doubts were cleared very well. The session was really helpful and gave me a clear idea about how to begin my journey in video editing. Thank you Sir for explaining everything in such an easy and understandable way.'},
 {person:'Anonymous',quote:'Glad to talk You Karan i found some ideas that why im lagging in thinking new ideas'},
 {person:'Gayatri Rout',quote:'I reached out to Karan for guidance on improving my video editing skills and leveraging AI in my workflow. He was incredibly patient and shared practical, actionable insights. Really grateful for his time and support'}
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
   if(track.scrollLeft+step>=cycleWidth-2){
    track.scrollTo({left:0,behavior:'auto'})
   }else{
    track.scrollBy({left:step,behavior:'smooth'})
   }
  },3600)
  return()=>window.clearInterval(interval)
 },[paused])

 const renderCards=(copy:number)=><div className="feedback-set" key={copy} aria-hidden={copy===1}>
  {feedback.map((item,index)=><article className="feedback-slide" key={index}>
   <div className="feedback-card">
    <span className="feedback-quote-mark" aria-hidden="true">“</span>
    <p className="feedback-quote">{item.quote}</p>
    <div className="feedback-card-footer"><strong>{item.person}</strong><span>CLIENT NOTE · {String(index+1).padStart(2,'0')}</span></div>
   </div>
  </article>)}
 </div>

 return <section className="feedback-section section-pad" id="feedback">
  <div className="feedback-heading">
   <div><p className="eyebrow">03 / CLIENT FEEDBACK</p><h2>GOOD WORDS.<br/><em>REAL PEOPLE.</em></h2></div>
   <p>Feedback shared by people Karan has worked with. A few kind words from clients and collaborators.</p>
  </div>
  <div className="feedback-track" ref={trackRef} aria-label="Automatically sliding client feedback"
   onPointerEnter={()=>setPaused(true)}
   onPointerLeave={()=>setPaused(false)}
   onPointerDown={()=>setPaused(true)}
   onPointerUp={()=>setPaused(false)}
   onFocus={()=>setPaused(true)}
   onBlur={()=>setPaused(false)}
   tabIndex={0}>
   {renderCards(0)}
   {renderCards(1)}
  </div>
 </section>
}
