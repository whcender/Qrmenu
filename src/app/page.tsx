import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex items-center justify-center flex-col h-[70vh]'>
      <h1 className='w-[60%] text-3xl text-center font-semibold mb-10'>KAFEMİZE <span className='text-red-900'>HOŞGELDİNİZ</span>  QR MENUYE GİTMEK İÇİN AŞAĞI TIKLAYIN :)</h1>
      <Link className=' border border-black rounded-xl bg-black text-white px-5 py-2' href="/category">QR MENUYE GİT</Link>
    </div>
  )
}