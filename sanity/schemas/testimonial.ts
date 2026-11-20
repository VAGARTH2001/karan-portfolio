import {defineField,defineType} from 'sanity'
export const testimonial=defineType({name:'testimonial',title:'Testimonials',type:'document',fields:[
defineField({name:'quote',title:'Approved quote',type:'text',rows:4,validation:r=>r.required()}),defineField({name:'person',title:'Person',type:'string',validation:r=>r.required()}),
defineField({name:'role',title:'Role / context',type:'string'}),defineField({name:'approved',title:'Approved for public use',type:'boolean',initialValue:false})
]})