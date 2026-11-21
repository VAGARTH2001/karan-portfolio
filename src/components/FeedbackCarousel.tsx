import {useRef} from 'react'
import {ChevronLeft,ChevronRight} from 'lucide-react'

const feedback=[
 'Neeraj','Sowmiya Narayani','Luxmi Shanker','Vagarth','Anupam Singh',
 'Anvay Dubey','Anonymous','Rohit Agarwal','Anonymous','Gayatri Rout'
]

export default function FeedbackCarousel(){
 const trackRef=useRef<HTMLDivElement>(null)
 const move=(direction:number)=>{
  const track=trackRef.current
  if(!track)return
  const slide=track.querySelector<HTMLElement>('.feedback-slide')
  track.scrollBy({left:direction*((slide?.offsetWidth||track.clientWidth*.75)+22),behavior:'smooth'})
 }
 return <section className="feedback-section section-pad" id="feedback">
  <div className="feedback-heading">
   <div><p className="eyebrow">03 / CLIENT FEEDBACK</p><h2>GOOD WORDS.<br/><em>REAL PEOPLE.</em></h2></div>
   <p>Notes and feedback shared by people Karan has worked with. Swipe, drag or use the arrows to browse every card.</p>
  </div>
  <div className="feedback-toolbar">
   <span>CLIENT NOTES <b>10</b></span>
   <div className="carousel-controls feedback-controls">
    <span>DRAG TO EXPLORE <span className="red-dot">✳</span></span>
    <div>
     <button type="button" onClick={()=>move(-1)} aria-label="Previous client feedback"><ChevronLeft size={19}/></button>
     <button type="button" onClick={()=>move(1)} aria-label="Next client feedback"><ChevronRight size={19}/></button>
    </div>
   </div>
  </div>
  <div className="feedback-track" ref={trackRef}>
   {feedback.map((person,index)=><article className="feedback-slide" key={index}>
    <div className="feedback-art" role="img" aria-label={`Client feedback card from ${person}`} style={{backgroundPosition:`${(index%5)*25}% ${Math.floor(index/5)*100}%`}}/>
    <span className="feedback-person">{person}</span>
    <span className="feedback-number">{String(index+1).padStart(2,'0')} / 10</span>
   </article>)}
  </div>
 </section>
}
