"use client"
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanStore } from '@/store/lang';

export default function SelectDemo() {

  const { setValue } = useLanStore()

  const handleLanguageChange = (lang: string) => {
    setValue(lang === 'EN' ? false : true)
  };

  return (
    <div className='flex flex-col'>
      <Select defaultValue="TR" onValueChange={(lang) => handleLanguageChange(lang)}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Dil" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="TR">
              <p className="flex items-center gap-3 font-semibold">
                <img className="w-6 " src="turkey.svg" alt="turkey" /> TR
              </p>
            </SelectItem>
            <SelectItem value="EN">
              <p className="flex items-center gap-3 font-semibold">
                <img className="w-6" src="en.svg" alt="en" /> EN
              </p>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
