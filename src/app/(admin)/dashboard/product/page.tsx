import React from 'react'
import ProductDash from '@/components/admin/productDash'
import Link from 'next/link'

const page = () => {
  return (
    <div>
        <h2 className='w-2/3 mt-3 m-auto text-center font-semibold'>Admin Panelindesiniz Ürün ve Kategori Eklemelerini Burdan Yapabilirsiniz.</h2>
        <h3 className='text-gray text-xs w-2/3 m-auto text-center'>(Yapacağınız Değişikliklerden Site Etkilecektir.)</h3>
        <ProductDash />
        <div className='mt-9 flex items-center justify-center flex-col gap-3'>
          <Link href={"/dashboard"} className='underline text-sm opacity-90 text-center'>Admin Paneline Geri Dön</Link>
        </div>
    </div>
  )
}

export default page