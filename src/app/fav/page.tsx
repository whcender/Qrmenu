"use client"
import React, { useEffect, useState } from 'react'
import MenuItems from '@/components/MenuItems'
import { fetchFav } from "@/actions/getFav"
import ProductCart from '@/components/ProductCart'
import { oneProductType } from '@/types'

const Page = () => {
    const [fav, setFav] = useState<any[]>([])

    useEffect(() => {
        const takeItems = async () => {
            const id = localStorage.getItem("favoriteIds");
            if (id === null) {
                return;
            }

            const lastId = JSON.parse(id);
            const result = await fetchFav(lastId);
            setFav(result)
        }

        takeItems();
    }, []) // boş dependency array, useEffect'in yalnızca ilk render'da çalışmasını sağlar

    return (
        <div>
            <MenuItems />
            {fav.length > 0 ? (
                <div className='mt-5'>
                    <h2 className='font-bold'>Favori Ürünleriniz</h2>
                    {fav.map((item: oneProductType) => (
                        <ProductCart key={item.id} products={item} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-[100%]'>
                <p className='text-center font-semibold'>Favori ürünlerinizi bulunamadık :(.</p>
                </div>
            )}
        </div>
    )
}

export default Page
