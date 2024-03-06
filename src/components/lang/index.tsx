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
  return (
    <Select>
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="Dil" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple"><p className="flex items-center gap-3 font-semibold"><img className="w-6 " src="turkey.svg" alt="turkey" /> TR</p></SelectItem>
          <SelectItem value="banana"><p className="flex items-center gap-3 font-semibold"><img className="w-6" src="en.svg" alt="en" /> EN</p></SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
