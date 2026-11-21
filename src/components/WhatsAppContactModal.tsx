import {useEffect,useState} from 'react'
import {ArrowUpRight,Check,Copy,Instagram,Mail,MessageCircle,X} from 'lucide-react'
import {QRCodeSVG} from 'qrcode.react'
import {siteConfig} from '../data/siteConfig'

type Props={open:boolean;onClose:()=>void}

export default function WhatsAppContactModal({open,onClose}:Props){
 const [copied,setCopied]=useState(false)
 useEffect(()=>{
  if(!open)return
  const previousOverflow=document.body.style.overflow
  document.body.style.overflow='hidden'
  const handleKey=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose()}
  window.addEventListener('keydown',handleKey)
  return()=>{
   document.body.style.overflow=previousOverflow
   window.removeEventListener('keydown',handleKey)
  }
 },[open,onClose])
 if(!open)return null
 const copyNumber=async()=>{
  try{
   await navigator.clipboard.writeText(siteConfig.whatsappNumber)
   setCopied(true)
   window.setTimeout(()=>setCopied(false),1800)
  }catch{setCopied(false)}
 }
 return <div className="contact-modal-backdrop" onMouseDown={onClose}>
  <section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" onMouseDown={event=>event.stopPropagation()}>
   <button className="contact-modal-close" type="button" onClick={onClose} aria-label="Close contact panel"><X size={19}/></button>
   <p className="eyebrow"><span className="live-dot"/> PROJECT INQUIRIES</p>
   <h2 id="contact-modal-title">LET’S TALK<br/><em>ABOUT YOUR VIDEO.</em></h2>
   <p className="contact-modal-copy">Start a conversation with Karan on WhatsApp. You can also scan the QR code from your phone.</p>
   <div className="contact-modal-main">
    <div className="contact-qr"><QRCodeSVG value={siteConfig.whatsappUrl} size={164} level="H" includeMargin aria-label="QR code to open Karan's WhatsApp chat"/></div>
    <div className="contact-modal-details">
     <span>WHATSAPP</span><strong>{siteConfig.whatsappNumber}</strong>
     <button type="button" className="contact-copy-number" onClick={copyNumber}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?'Copied':'Copy number'}</button>
     <a className="contact-modal-whatsapp" href={siteConfig.whatsappProjectUrl} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Open WhatsApp <ArrowUpRight size={15}/></a>
    </div>
   </div>
   <div className="contact-modal-alternatives">
    <a href={siteConfig.emailUrl}><Mail size={16}/> Email Karan</a>
    <a href={siteConfig.topmateUrl} target="_blank" rel="noreferrer">Book a 1:1 on Topmate <ArrowUpRight size={14}/></a>
    <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16}/> {siteConfig.instagramHandle}</a>
   </div>
   <p className="contact-modal-note">For a consultation about editing, YouTube growth or thumbnails, book separately through Topmate.</p>
  </section>
 </div>
}
