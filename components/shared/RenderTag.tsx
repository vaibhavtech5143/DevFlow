import Link from 'next/link'
import React from 'react'
import { Badge } from "@/components/ui/badge"


interface Props{
  _id:string,
  name:string,
  totalQuestions?:number
  showCount?:boolean
}
const RenderTag = ({_id,name,totalQuestions,showCount}:Props) => {
  return (
    <Link href={`/tags/${_id}`} className='flex justify-between gap-2'>
<Badge className='inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300 border-transparent bg-slate-900 shadow hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase' >{name}</Badge>{showCount&&(<p className='small-medium text-dark500_light700'>{totalQuestions}</p>)}


    </Link>
  )
}

export default RenderTag