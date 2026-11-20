import {defineField,defineType} from 'sanity'
export const statistic=defineType({name:'statistic',title:'Impact Statistics',type:'document',fields:[
defineField({name:'value',title:'Value',type:'string',validation:r=>r.required()}),defineField({name:'label',title:'Label',type:'string',validation:r=>r.required()}),
defineField({name:'note',title:'Supporting note',type:'string'}),defineField({name:'sortOrder',title:'Sort order',type:'number',initialValue:100})
]})