"use client";

import { useLanStore } from '@/store/lang';


const text = ({text, text2}: {text: any, text2: string}) => {

    const { value } = useLanStore()

  return (
    <p className={`w-24 text-center font-outfit font-extrabold text-sm capitalize`}>{value ? text : text2}</p>

  )
}

export default text
