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
defineField({name:'featured',title:'Featured project',type:'boolean',initialValue:false}),defineField({name:'sortOrder',title:'Sort order',type:'number',initialValue:100}),
defineField({name:'published',title:'Show on website',type:'boolean',initialValue:true})
],preview:{select:{title:'title',subtitle:'category',media:'thumbnail'}}})