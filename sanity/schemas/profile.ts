import {defineField,defineType} from 'sanity'
export const profile=defineType({name:'profile',title:'Profile & About',type:'document',fields:[
defineField({name:'name',title:'Name',type:'string',validation:r=>r.required()}),defineField({name:'role',title:'Role',type:'string'}),defineField({name:'tagline',title:'Hero headline',type:'string'}),
defineField({name:'aboutLead',title:'About introduction',type:'text',rows:3}),defineField({name:'aboutBody',title:'About details',type:'text',rows:5}),
defineField({name:'portrait',title:'Portrait',type:'image',options:{hotspot:true}}),defineField({name:'tools',title:'Tools',type:'array',of:[{type:'string'}]}),
defineField({name:'email',title:'Contact email',type:'string'}),defineField({name:'instagram',title:'Instagram URL',type:'url'}),defineField({name:'linkedin',title:'LinkedIn URL',type:'url'})
]})