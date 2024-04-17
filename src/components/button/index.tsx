import * as React from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { GiHamburgerMenu } from "react-icons/gi"

export default function DrawerDemo() {


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="fixed right-3 bottom-5 bg-black rounded-full p-3"> <GiHamburgerMenu size={30} color="white" /> </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <p>İşletme bilgileri</p>
                    </div>
                    <DrawerFooter>
                        <Button>Bize Puan ver</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Kapat</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
