"use client"
import React from 'react'
import Image from 'next/image'
import { oneProductType } from '@/types';
import { useLanStore } from '@/store/lang';

const index = ({ products }: { products: oneProductType }) => {

    const { value } = useLanStore()
    const description = value ? products.description : products.edescription;
    const shortDescription = description.length > 120 ? description.slice(0, 120) + '...' : description;


    return (
        <ul className={`flex flex-wrap gap-10 justify-center items-center px-1 mt-4 font-outfit`}>
            <div className='flex items-center justify-center gap-3 border p-5  w-full rounded-lg shadow-lg relative' key={products.id}> {/* Anahtar olarak benzersiz bir değer kullanılmalı */}
                <Image
                    className='rounded-lg w-36 h-36 shadow-lg object-cover'
                    src={products.image}
                    alt={products.name}
                    width="200"
                    height="200"
                    loading='lazy'
                    placeholder="blur"
                    blurDataURL="https://i.hizliresim.com/74xpsgl.gif"
                />
                <div className='flex flex-col gap-4'>
                    <p className='w-full  font-black text-lg capitalize'>{value ? products.name : products.ename}</p>
                    <p className='text-xs text-gray-600 font-semibold w-full '>{shortDescription}</p>
                    <p className='font-black text-gray-700 text-lg'><span className='text-xs font-black'>{products.price}</span>₺</p>
                </div>
            </div>
        </ul>
    )
}

export default index
