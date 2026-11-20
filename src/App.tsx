import {useEffect,useMemo,useState} from 'react'
import {motion} from 'motion/react'
import {ArrowDown,ArrowUpRight,Instagram,Linkedin,Mail,Menu,X} from 'lucide-react'
import {categories,projects,type Project} from './data/projects'
import {sanityClient} from './lib/sanity'
import ProjectCard from './components/ProjectCard'
import VideoModal from './components/VideoModal'
import SectionHeading from './components/SectionHeading'

const stats=[{value:'500M+',label:'Combined views',note:'Across published content'},{value:'7M+',label:'Views on one reel',note:'Organic performance'},{value:'0 → 10K',label:'Followers in 90 days',note:'Audience growth claim'},{value:'90+',label:'Videos per month',note:'High-volume production'}]
const clients=['PHYSICSWALLAH','PHICKU','ALKAPURI','ISHAN SHARMA','LUXMI SHANKER']
const projectQuery=`*[_type == "project" && published == true] | order(sortOrder asc) {
  "id": _id, title, category, description, client,
  "poster": thumbnail.asset->url, "video": videoUrl, "aspect": aspectRatio, featured
}`

export default function App(){
 const [category,setCategory]=useState('All Work')
 const [active,setActive]=useState<Project|null>(null)
 const [menuOpen,setMenuOpen]=useState(false)
 const [items,setItems]=useState<Project[]>(projects)
 const closeMenu=()=>setMenuOpen(false)
 useEffect(()=>{
  let mounted=true
  if(sanityClient){sanityClient.fetch<Project[]>(projectQuery).then(result=>{if(mounted&&result?.length)setItems(result.map((p,i)=>({...p,id:p.id||String(i),poster:p.poster||projects[i%projects.length].poster,video:p.video||'',aspect:p.aspect||'portrait'})))}).catch(error=>console.error('Sanity project fetch failed:',error))}
  return()=>{mounted=false}
 },[])
 const filtered=useMemo(()=>category==='All Work'?items:items.filter(p=>p.category===category),[category,items])
 return <main>
  <header className="site-header"><a href="#top" className="wordmark" onClick={closeMenu}>KARAN<span>.</span></a><nav className={menuOpen?'nav-links open':'nav-links'}><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#experience" onClick={closeMenu}>Experience</a><a href="#contact" onClick={closeMenu}>Contact</a></nav><a className="header-cta" href="#contact">LET’S TALK <ArrowUpRight size={15}/></a><button className="mobile-menu" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</button></header>
  <section className="hero" id="top"><div className="hero-grain"/><div className="hero-topline"><span>INDEPENDENT VIDEO EDITOR</span><span>BASED IN INDIA · AVAILABLE WORLDWIDE</span></div><motion.div className="hero-content" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.75,ease:'easeOut'}}><p className="eyebrow hero-kicker"><span className="live-dot"/> VIDEO EDITOR & CONTENT CREATOR</p><h1>I MAKE VIDEOS<br/>THAT MAKE PEOPLE<br/><em>STOP SCROLLING.</em></h1><div className="hero-bottom"><p>Reels. Shorts. Brand films.<br/>Stories that stay with you.</p><a href="#work" className="round-link" aria-label="Explore selected work"><ArrowDown size={22}/></a></div></motion.div><div className="hero-side-note">CUT WITH INTENTION. BUILT TO CONNECT.</div><div className="hero-index">01 / 06</div></section>
  <section className="intro-strip"><span>THE ART OF THE EDIT</span><p>Good editing isn’t just about what you see. It’s about what you <i>feel.</i></p><span>SCROLL TO EXPLORE ↓</span></section>
  <section className="work-section section-pad" id="work"><SectionHeading kicker="01 / SELECTED WORK" title="A FEW GOOD CUTS." aside="A selection of edits made to capture attention, communicate clearly and leave an impression."/><div className="filter-row" role="tablist" aria-label="Filter projects">{categories.map(c=><button key={c} className={category===c?'filter active':'filter'} onClick={()=>setCategory(c)} role="tab" aria-selected={category===c}>{c}</button>)}</div><div className="project-grid">{filtered.map((p,i)=><ProjectCard key={p.id} project={p} index={i} onOpen={setActive}/>)}</div><div className="work-foot"><span>{String(filtered.length).padStart(2,'0')} PROJECTS SHOWN</span><span>MORE GOOD WORK IN THE MAKING <span className="red-dot">●</span></span></div></section>
  <section className="impact-section section-pad"><div className="impact-label"><p className="eyebrow">02 / THE IMPACT</p><span>NUMBERS WITH A STORY.</span></div><div className="stats-grid">{stats.map((s,i)=><motion.div className="stat" key={s.label} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><strong>{s.value}</strong><p>{s.label}</p><small>{s.note}</small></motion.div>)}</div><p className="stats-disclaimer">Performance figures supplied in the original portfolio; confirm and update before publishing.</p></section>
  <section className="about-section section-pad" id="about"><div className="about-left"><p className="eyebrow">03 / A LITTLE ABOUT ME</p><div className="about-stamp">KV<span>✳</span></div><p className="about-caption">THE PERSON BEHIND<br/>THE TIMELINE.</p></div><div className="about-right"><h2>HEY, I’M KARAN.<br/><em>I THINK IN FRAMES.</em></h2><p className="about-lead">I’m a video editor and content creator with 3+ years of experience turning raw footage into stories people want to watch.</p><p className="about-copy">From fast-paced reels and educational content to brand promos and event films, I love finding the rhythm of a story — the right cut, the right sound, the right moment. My goal is simple: make every second count.</p><div className="tool-list"><span>TOOLS I WORK WITH</span><b>PREMIERE PRO</b><b>AFTER EFFECTS</b><b>PHOTOSHOP</b></div></div></section>
  <section className="experience-section section-pad" id="experience"><SectionHeading kicker="04 / EXPERIENCE & COLLABORATIONS" title="GOOD PEOPLE. GOOD WORK."/><div className="experience-row"><div><span className="eyebrow">CURRENTLY</span><h3>PHYSICS WALLAH</h3><p>Video Editor · Performance-driven content across brands and platforms</p></div><span className="experience-arrow"><ArrowUpRight/></span></div><div className="client-cloud">{clients.map(c=><span key={c}>{c}</span>)}</div><p className="experience-note">Selected names and collaborations are taken from the supplied portfolio and should be approved before launch.</p></section>
  <section className="quote-section section-pad"><p className="eyebrow">05 / KIND WORDS</p><div className="quote-mark">“</div><blockquote>He understands the story behind the content and knows exactly how to make it connect with the audience.</blockquote><div className="quote-byline"><span className="quote-line"/><div><b>LUXMI SHANKER</b><small>TESTIMONIAL · ORIGINAL PORTFOLIO</small></div></div><p className="quote-note">Testimonial wording is a draft placeholder based on the supplied portfolio reference. Confirm the exact approved quote before publishing.</p></section>
  <footer className="contact-section section-pad" id="contact"><div className="contact-top"><p className="eyebrow">06 / HAVE A PROJECT IN MIND?</p><span>LET’S MAKE SOMETHING THAT MOVES.</span></div><h2>LET’S MAKE<br/><em>IT HAPPEN.</em></h2><a className="contact-email" href="mailto:hello@karanverma.com">START A CONVERSATION <ArrowUpRight/></a><div className="footer-bottom"><a href="#top" className="wordmark">KARAN<span>.</span></a><span>VIDEO EDITOR & CONTENT CREATOR</span><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:hello@karanverma.com" aria-label="Email"><Mail/></a></div><small>© {new Date().getFullYear()} KARAN VERMA. ALL RIGHTS RESERVED.</small><a className="back-top" href="#top">BACK TO TOP ↑</a></div></footer>
  <VideoModal project={active} onClose={()=>setActive(null)}/>
 </main>
}
