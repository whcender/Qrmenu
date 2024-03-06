"use client";

import { useLanStore } from '@/store/lang';

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
  const { setValue } = useLanStore()
  return (
    <Select>
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="Dil" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem  onClick={() => setValue(false)} value="TR"><p className="flex items-center gap-3 font-semibold"><img className="w-6 " src="turkey.svg" alt="turkey" /> TR</p></SelectItem>
          <SelectItem onClick={() => setValue(true)} value="EN"><p className="flex items-center gap-3 font-semibold"><img className="w-6" src="en.svg" alt="en" /> EN</p></SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
