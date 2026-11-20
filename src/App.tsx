import {useEffect,useMemo,useState} from 'react'
import {motion} from 'motion/react'
import {ArrowDown,ArrowUpRight,Instagram,Linkedin,Mail,Menu,X} from 'lucide-react'
import {categories,projects,type Project} from './data/projects'
import {sanityClient} from './lib/sanity'
import ProjectCard from './components/ProjectCard'
import VideoModal from './components/VideoModal'
import SectionHeading from './components/SectionHeading'

const clients=['PHYSICSWALLAH','PHICKU','ALKAPURI','ISHAN SHARMA','LUXMI SHANKER']
const projectQuery=`*[_type == "project" && published == true] | order(sortOrder asc) {
  "id": _id, title, category, description, client,
  "poster": thumbnail.asset->url, "video": videoUrl, "aspect": aspectRatio, featured,
  platform, "publishedUrl": publishedPostUrl, viewCount, viewsUpdatedAt, metricSource, showInResults
}`

function getYouTubeId(url:string){
 try{
  const parsed=new URL(url)
  const shortId=parsed.hostname==='youtu.be'?parsed.pathname.split('/').filter(Boolean)[0]:null
  const embedParts=parsed.pathname.split('/').filter(Boolean)
  const embedIndex=embedParts.findIndex(part=>part==='embed'||part==='shorts'||part==='live')
  const pathId=embedIndex>=0?embedParts[embedIndex+1]:null
  const id=parsed.searchParams.get('v')||shortId||pathId
  return id&&/^[A-Za-z0-9_-]{11}$/.test(id)?id:null
 }catch{return null}
}
function formatViews(value:number){
 return new Intl.NumberFormat('en',{notation:value>=100000?'compact':'standard',maximumFractionDigits:1}).format(value)
}
function formatUpdated(value?:string){
 if(!value)return 'Not yet checked'
 const date=new Date(value)
 return Number.isNaN(date.getTime())?'Not yet checked':date.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})
}

export default function App(){
 const [category,setCategory]=useState('All Work')
 const [active,setActive]=useState<Project|null>(null)
 const [menuOpen,setMenuOpen]=useState(false)
 const [items,setItems]=useState<Project[]>(projects)
 const closeMenu=()=>setMenuOpen(false)
 const chooseCategory=(value:string)=>{setCategory(value);closeMenu();document.getElementById('work')?.scrollIntoView({behavior:'smooth'})}
 useEffect(()=>{
  let mounted=true
  if(sanityClient){sanityClient.fetch<Project[]>(projectQuery).then(result=>{if(mounted&&result?.length)setItems(result.map((p,i)=>({...p,id:p.id||String(i),poster:p.poster||projects[i%projects.length].poster,video:p.video||'',aspect:p.aspect||'portrait'})))}).catch(error=>console.error('Sanity project fetch failed:',error))}
  return()=>{mounted=false}
 },[])
 const youtubeLookupKey=useMemo(()=>items.map(p=>getYouTubeId(p.video)).filter(Boolean).join(','),[items])
 useEffect(()=>{
  if(!youtubeLookupKey)return
  let mounted=true
  fetch(`/api/youtube-views?ids=${encodeURIComponent(youtubeLookupKey)}`)
   .then(response=>response.ok?response.json():null)
   .then(payload=>{if(!mounted||!payload?.videos)return;setItems(current=>current.map(project=>{const id=getYouTubeId(project.video);const metric=id?payload.videos[id]:null;return metric?{...project,platform:'YouTube',viewCount:metric.viewCount,viewsUpdatedAt:metric.viewsUpdatedAt,metricSource:'YouTube Data API',showInResults:true}:project}))})
   .catch(error=>console.warn('YouTube metrics unavailable:',error))
  return()=>{mounted=false}
 },[youtubeLookupKey])
 const filtered=useMemo(()=>category==='All Work'?items:items.filter(p=>p.category===category),[category,items])
 const verifiedResults=useMemo(()=>items.filter(p=>p.showInResults&&typeof p.viewCount==='number'&&Number.isFinite(p.viewCount)).sort((a,b)=>(b.viewCount||0)-(a.viewCount||0)),[items])
 const totalTrackedViews=verifiedResults.reduce((sum,p)=>sum+(p.viewCount||0),0)
 const metricDates=verifiedResults.map(p=>p.viewsUpdatedAt).filter((value):value is string=>Boolean(value)).sort()
 const latestMetricsDate=metricDates.length?metricDates[metricDates.length-1]:undefined
 const navigateProject=(direction:number)=>{if(!active||!items.length)return;const current=items.findIndex(p=>p.id===active.id);const next=(current+direction+items.length)%items.length;setActive(items[next])}
 return <main>
  <header className="site-header"><a href="#top" className="wordmark" onClick={closeMenu}>Karan Verma<span>.</span></a><nav className={menuOpen?'nav-links open':'nav-links'}><a href="#work" onClick={()=>chooseCategory('Reels & Shorts')}>Reels</a><a href="#work" onClick={()=>chooseCategory('Brand & Promo')}>Brand</a><a href="#work" onClick={()=>chooseCategory('Testimonials')}>Testimonials</a><a href="#work" onClick={()=>chooseCategory('YouTube')}>YouTube</a><a href="#work" onClick={()=>chooseCategory('All Work')}>All work</a><a href="#results" onClick={closeMenu}>Results</a><a href="#about" onClick={closeMenu}>About</a></nav><a className="header-cta" href="#contact" onClick={closeMenu}>Contact <ArrowUpRight size={15}/></a><button className="mobile-menu" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</button></header>
  <section className="hero" id="top"><div className="hero-layout"><motion.div className="hero-content" initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:.75,ease:'easeOut'}}><p className="hero-availability"><span className="live-dot"/> VIDEO EDITOR · CONTENT CREATOR</p><h1>I MAKE VIDEOS<br/>THAT MAKE PEOPLE<br/><em>STOP SCROLLING.</em></h1><p className="hero-description">Reels, shorts, brand films and long-form edits made to catch attention and keep people watching.</p><p className="hero-byline">KARAN VERMA <span>·</span> VIDEO EDITOR / CONTENT CREATOR</p><div className="hero-actions"><a href="#work" className="hero-primary">See the work <ArrowDown size={16}/></a><a href="#contact" className="hero-secondary">Let’s talk <ArrowUpRight size={16}/></a></div></motion.div><motion.div className="hero-portrait-wrap" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.12,ease:'easeOut'}}><img src="/karan-portrait.webp" alt="Karan Verma, video editor and content creator" fetchPriority="high"/><div className="portrait-sticker portrait-sticker-top">HI, I'M KARAN <span>✳</span></div><div className="portrait-sticker portrait-sticker-bottom">VIDEO EDITOR · CONTENT CREATOR</div></motion.div></div></section>
  <section className="intro-strip"><span>THE ART OF THE EDIT</span><p>Good editing isn’t just about what you see. It’s about what you <i>feel.</i></p><span>SCROLL TO EXPLORE ↓</span></section>
  <section className="work-section section-pad" id="work"><SectionHeading kicker="01 / SELECTED WORK" title="EVERY FORMAT. ONE EDITOR." aside="From scroll-stopping vertical edits to long-form storytelling — a selection of work built to hold attention."/><div className="filter-row" role="tablist" aria-label="Filter projects">{categories.map(c=><button key={c} className={category===c?'filter active':'filter'} onClick={()=>setCategory(c)} role="tab" aria-selected={category===c}>{c}</button>)}</div><div className="project-grid">{filtered.map((p,i)=><ProjectCard key={p.id} project={p} index={i} onOpen={setActive}/>)}</div><div className="work-foot"><span>{String(filtered.length).padStart(2,'0')} PROJECTS SHOWN</span><span>MORE GOOD WORK IN THE MAKING <span className="red-dot">●</span></span></div></section>
  <section className="results-section section-pad" id="results"><div className="results-heading"><div><p className="eyebrow">02 / RESULTS & PERFORMANCE</p><h2>THE NUMBERS<br/><em>BEHIND THE WORK.</em></h2></div><p className="results-intro">Views are only one signal — but real numbers help tell the story. These figures appear only when a count has been verified.</p></div><div className="results-summary"><div className="result-total"><span>TOTAL VERIFIED VIEWS</span><strong>{verifiedResults.length?formatViews(totalTrackedViews):'—'}</strong><small>{verifiedResults.length? `Across ${verifiedResults.length} tracked ${verifiedResults.length===1?'project':'projects'}`:'Waiting for verified metrics'}</small></div><div className="result-summary-item"><span>TRACKED PROJECTS</span><strong>{String(verifiedResults.length).padStart(2,'0')}</strong><small>With a confirmed view count</small></div><div className="result-summary-item"><span>LAST UPDATED</span><strong className="result-updated">{formatUpdated(latestMetricsDate)}</strong><small>Based on the latest supplied check</small></div></div>{verifiedResults.length>0?<div className="results-list">{verifiedResults.map((p,i)=><article className="result-row" key={p.id}><span className="result-rank">{String(i+1).padStart(2,'0')}</span><div className="result-project"><strong>{p.title}</strong><small>{p.client} · {p.platform||'Platform not specified'}</small></div><div className="result-count"><strong>{formatViews(p.viewCount||0)}</strong><small>VIEWS</small></div><div className="result-source"><span>{p.metricSource||'Manually verified'}</span><small>Checked {formatUpdated(p.viewsUpdatedAt)}</small></div>{p.publishedUrl&&<a href={p.publishedUrl} target="_blank" rel="noreferrer" className="result-link">VIEW POST <ArrowUpRight size={14}/></a>}</article>)}</div>:<div className="results-empty"><span className="results-empty-mark">↗</span><div><strong>THE NEXT VIEW COUNT GOES HERE.</strong><p>Add a published post URL, latest view count, check date and source in the content dashboard. YouTube videos can also refresh automatically once a YouTube Data API key is connected.</p></div><span className="results-empty-status">AWAITING DATA</span></div>}<p className="results-footnote">Only counts marked “Show in Results” and accompanied by a numeric value are included. Instagram and other platform figures need an authorised platform connection or a verified manual update.</p></section>
  <section className="about-section section-pad" id="about"><div className="about-left"><p className="eyebrow">03 / A LITTLE ABOUT ME</p><div className="about-stamp">KV<span>✳</span></div><p className="about-caption">THE PERSON BEHIND<br/>THE TIMELINE.</p></div><div className="about-right"><h2>HEY, I’M KARAN.<br/><em>I THINK IN FRAMES.</em></h2><p className="about-lead">I’m a video editor and content creator with 3+ years of experience turning raw footage into stories people want to watch.</p><p className="about-copy">From fast-paced reels and educational content to brand promos and event films, I love finding the rhythm of a story — the right cut, the right sound, the right moment. My goal is simple: make every second count.</p><div className="tool-list"><span>TOOLS I WORK WITH</span><b>PREMIERE PRO</b><b>AFTER EFFECTS</b><b>PHOTOSHOP</b></div></div></section>
  <section className="experience-section section-pad" id="experience"><SectionHeading kicker="04 / EXPERIENCE & COLLABORATIONS" title="GOOD PEOPLE. GOOD WORK."/><div className="experience-row"><div><span className="eyebrow">CURRENTLY</span><h3>PHYSICS WALLAH</h3><p>Video Editor · Performance-driven content across brands and platforms</p></div><span className="experience-arrow"><ArrowUpRight/></span></div><div className="client-cloud">{clients.map(c=><span key={c}>{c}</span>)}</div><p className="experience-note">Selected names and collaborations are taken from the supplied portfolio and should be approved before launch.</p></section>
  <section className="quote-section section-pad"><p className="eyebrow">05 / KIND WORDS</p><div className="quote-mark">“</div><blockquote>He understands the story behind the content and knows exactly how to make it connect with the audience.</blockquote><div className="quote-byline"><span className="quote-line"/><div><b>LUXMI SHANKER</b><small>TESTIMONIAL · ORIGINAL PORTFOLIO</small></div></div><p className="quote-note">Testimonial wording is a draft placeholder based on the supplied portfolio reference. Confirm the exact approved quote before publishing.</p></section>
  <footer className="contact-section section-pad" id="contact"><div className="contact-top"><p className="eyebrow">06 / HAVE A PROJECT IN MIND?</p><span>LET’S MAKE SOMETHING THAT MOVES.</span></div><h2>LET’S MAKE<br/><em>IT HAPPEN.</em></h2><a className="contact-email" href="mailto:hello@karanverma.com">START A CONVERSATION <ArrowUpRight/></a><div className="footer-bottom"><a href="#top" className="wordmark">KARAN<span>.</span></a><span>VIDEO EDITOR & CONTENT CREATOR</span><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:hello@karanverma.com" aria-label="Email"><Mail/></a></div><small>© {new Date().getFullYear()} KARAN VERMA. ALL RIGHTS RESERVED.</small><a className="back-top" href="#top">BACK TO TOP ↑</a></div></footer>
  <VideoModal project={active} onClose={()=>setActive(null)} onPrevious={()=>navigateProject(-1)} onNext={()=>navigateProject(1)}/>
 </main>
}
