export type Project={id:string;title:string;category:string;description:string;client:string;poster:string;video:string;aspect:'portrait'|'landscape';featured?:boolean}
export const projects:Project[]=[
{id:'buyer-psychology',title:'Buyer Psychology',category:'Brand & Promo',description:'A promotional edit built around buyer behaviour, pacing and motion-led messaging.',client:'Promotional edit',poster:'/buyer-psychology.jpg',video:'',aspect:'portrait',featured:true},
{id:'pw-educational',title:'Educational Short',category:'Reels & Shorts',description:'An educational short with visual callouts, captions and energetic transitions.',client:'Physics Wallah',poster:'/educational-short.jpg',video:'',aspect:'portrait',featured:true},
{id:'goat-sir',title:'Goat Sir — Event Edit',category:'Event Videos',description:'An event-led edit shaped around personality, captions and storytelling.',client:'Physics Wallah',poster:'/goat-sir-event.jpg',video:'',aspect:'portrait',featured:true},
{id:'youtube-one',title:'YouTube Project 01',category:'YouTube',description:'Selected YouTube edit. Title and details to be confirmed.',client:'Independent project',poster:'/buyer-psychology.jpg',video:'https://www.youtube.com/embed/Vw2cURVFI7M',aspect:'landscape'},
{id:'youtube-two',title:'YouTube Project 02',category:'YouTube',description:'Selected YouTube edit. Title and details to be confirmed.',client:'Independent project',poster:'/educational-short.jpg',video:'https://www.youtube.com/embed/WB_LJeqn2d4',aspect:'landscape'}
]
export const categories=['All Work','Reels & Shorts','Brand & Promo','Event Videos','YouTube']
