import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

const index = () => {
    return (
        <div className='flex gap-4 mt-3'>
            <Link href="/dashboard/category">
                <Button variant={"destructive"} size={"sm"}>Kategorileri Düzenle</Button>
            </Link>
            <Link href="/dashboard/product">
                <Button size={"sm"}>Ürünleri Düzenle</Button>
            </Link>
        </div>
    )
}

export default index