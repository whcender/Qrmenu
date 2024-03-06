"use client";

import { useGenerationStore } from '@/store/idea-generation';

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SelectDemo() {
  const { theme, setTheme } = useGenerationStore()

  console.log(theme)
  return (
    <div className='flex flex-col'>
    <Select>
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="Dil" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem onClick={()=> setTheme(true)}  value="TR"><p className="flex items-center gap-3 font-semibold"><img className="w-6 " src="turkey.svg" alt="turkey" /> TR</p></SelectItem>
          <SelectItem onClick={()=> setTheme(false)}  value="EN"><p  className="flex items-center gap-3 font-semibold"><img className="w-6" src="en.svg" alt="en" /> EN</p></SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <button onClick={()=> setTheme(!theme)}>anan </button>
    <h1 className="text-3xl font-semibold text-center  text-black">{theme? "ananın amını sikim": "yok"}</h1>
    </div>
  )
}
