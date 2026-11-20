import {defineField,defineType} from 'sanity'
export const experience=defineType({name:'experience',title:'Experience & Clients',type:'document',fields:[
defineField({name:'company',title:'Company / Client',type:'string',validation:r=>r.required()}),defineField({name:'role',title:'Role / project type',type:'string'}),
defineField({name:'description',title:'Description',type:'text',rows:3}),defineField({name:'current',title:'Current role',type:'boolean',initialValue:false}),defineField({name:'sortOrder',title:'Sort order',type:'number',initialValue:100})
]})