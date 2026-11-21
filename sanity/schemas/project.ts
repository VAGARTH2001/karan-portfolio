import {defineField,defineType} from 'sanity'
export const project=defineType({name:'project',title:'Projects',type:'document',fields:[
defineField({name:'title',title:'Title',type:'string',validation:r=>r.required()}),
defineField({name:'slug',title:'Slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
defineField({name:'category',title:'Category',type:'string',options:{list:['Reels & Shorts','Brand & Promo','Event Videos','YouTube','Long-form'].map(value=>({title:value,value}))},validation:r=>r.required()}),
defineField({name:'description',title:'Description',type:'text',rows:3}),defineField({name:'client',title:'Client',type:'string'}),
defineField({name:'videoType',title:'Video source',type:'string',options:{list:[{title:'Cloudinary',value:'cloudinary'},{title:'YouTube',value:'youtube'}]},initialValue:'cloudinary'}),
defineField({name:'videoUrl',title:'Video URL',type:'url',description:'Cloudinary secure URL or YouTube URL'}),
defineField({name:'thumbnail',title:'Thumbnail',type:'image',options:{hotspot:true}}),
defineField({name:'aspectRatio',title:'Aspect ratio',type:'string',options:{list:[{title:'Portrait (9:16)',value:'portrait'},{title:'Landscape (16:9)',value:'landscape'}]},initialValue:'portrait'}),
defineField({name:'featured',title:'Featured project',type:'boolean',initialValue:false}),
defineField({name:'sortOrder',title:'Sort order',type:'number',initialValue:100}),
defineField({name:'published',title:'Show on website',type:'boolean',initialValue:true}),
defineField({name:'platform',title:'Publishing platform',type:'string',options:{list:['Instagram','YouTube','TikTok','Facebook','LinkedIn','Other'].map(value=>({title:value,value}))},description:'Where the original work was published'}),
defineField({name:'publishedPostUrl',title:'Published post URL',type:'url',description:'Link to the original public post, not the Cloudinary file'}),
defineField({name:'viewCount',title:'Latest view count',type:'number',validation:r=>r.min(0),description:'Enter the latest verified count from the platform. This is manually maintained until an official platform API is connected.'}),
defineField({name:'viewsUpdatedAt',title:'Views last checked',type:'date',description:'Date this view count was checked'}),
defineField({name:'metricSource',title:'View count source',type:'string',options:{list:['Platform public count','Creator analytics','Client report'].map(value=>({title:value,value}))}}),
defineField({name:'showInResults',title:'Show in Results section',type:'boolean',initialValue:false,description:'Only enable after the view count and source are verified'})
],preview:{select:{title:'title',subtitle:'category',media:'thumbnail'}}})
