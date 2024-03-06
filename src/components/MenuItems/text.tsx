"use client";

import { useLanStore } from '@/store/lang';


const text = ({text, text2}: {text: any, text2: string}) => {

    const { value } = useLanStore()

  return (
    <p className={`w-24 text-center font-semibold text-sm`}>{value ? text : text2}</p>

  )
}

export default text