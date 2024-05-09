"use client"
import React from 'react'
import Image from 'next/image'
import { oneProductType } from '@/types';
import { useLanStore } from '@/store/lang';

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

const index = ({ products }: { products: oneProductType }) => {

    const { value } = useLanStore()
    const description = value ? products.description : products.edescription;
    const shortDescription = description.length > 110 ? description.slice(0, 110) + '...' : description;


    return (
        <Drawer>
            <DrawerTrigger asChild>
                <ul className={`flex flex-wrap gap-10 justify-center items-center px-1 mt-4 font-outfit`}>
                    <div className='flex items-center justify-center gap-3 border py-5 px-2  w-full rounded-lg shadow-lg relative' key={products.id}> {/* Anahtar olarak benzersiz bir değer kullanılmalı */}
                        <Image
                            className='rounded-lg size-36 shadow-lg object-cover text-center'
                            src={products.image}
                            alt={products.name}
                            width="144"
                            height="144"
                            loading='lazy'
                            placeholder="blur"
                            blurDataURL="https://i.hizliresim.com/74xpsgl.gif"
                            objectFit='cover'
                        />
                        <div className='flex flex-col gap-4 '>
                            <p className='w-full  font-black text-base capitalize'>{value ? products.name : products.ename}</p>
                            <p className='text-xs text-gray-950 font-semibold w-full '>{shortDescription}</p>
                            <p className='font-black text-black text-lg'><span className='text-xs font-black'>{products.price}</span>₺</p>
                        </div>
                    </div>
                </ul>
            </DrawerTrigger>
            <DrawerContent >
                <div className="mx-auto w-full max-w-sm font-outfit">
                    <DrawerHeader>

                        <p className='w-full  font-black text-base capitalize'>{value ? products.name : products.ename}</p>
                        <p className='text-xs  font-semibold w-full text-zinc-900'>{value ? products.description : products.edescription}</p>
                    </DrawerHeader>
                    <div className="
                        py-2 flex flex-col gap-2 text-center justify-center items-center
                    ">
                        <Image
                            className='rounded-lg  size-44 shadow-lg object-cover text-center'
                            src={products.image}
                            alt={products.name}
                            width="300"
                            height="300"
                            loading='lazy'
                            placeholder="blur"
                            blurDataURL="https://i.hizliresim.com/74xpsgl.gif"
                        />

                        <p className='font-black text-zinc-900 text-center text-xl'><span className='text-base font-black'>{products.price}</span>₺</p>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant={"outline"} className='text-black'>{value ? "Kapat" : "Close"}</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>

    )
}

export default index