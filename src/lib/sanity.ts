import {createClient} from '@sanity/client'
const projectId=import.meta.env.VITE_SANITY_PROJECT_ID as string|undefined
const dataset=(import.meta.env.VITE_SANITY_DATASET as string|undefined)||'production'
export const sanityClient=projectId?createClient({projectId,dataset,apiVersion:'2025-01-01',useCdn:true}):null
