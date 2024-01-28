import React from 'react'
import Image from 'next/image'
import { oneProductType } from '@/types';


const index = ({ products, index }: { products: oneProductType, index: number }) => {
    return (
            <ul className={`flex flex-wrap gap-10 justify-center items-center px-1 `}>

                <div className='flex flex-col items-center justify-center gap-3 border p-5  w-full rounded-lg shadow-lg' key={products.id}> {/* Anahtar olarak benzersiz bir değer kullanılmalı */}
                    <Image
                        className='rounded-lg w-36 h-36 shadow-lg object-cover'
                        src={products.image}
                        alt={products.name}
                        width="200"
                        height="200"
                        loading='lazy'
                    />
                    <p className='w-44 text-center font-semibold text-sm'>{products.name}</p>
                    <p className='text-xs text-gray-600 font-medium w-[95%] text-center'>{products.description}</p>
                    <p className='font-semibold text-gray-700 text-lg'><span className='text-xs font-bold'>{products.price}</span>₺</p>
                </div>
            </ul>

    )
}

export default index