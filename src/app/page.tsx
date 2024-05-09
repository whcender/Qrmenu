import Link from 'next/link'

export default async function Home() {

  return (
<div className='flex items-center justify-center flex-col h-[70vh] gap-4'>
      <img className='w-[40%] h-[40%]' src='/logob.png' alt='logo' />
      <h1 className='w-[90%] text-3xl text-white text-center font-semibold '>KAFEMİZE <span className='text-red-900'>HOŞGELDİNİZ <br /></span>  QR MENUYE GİTMEK İÇİN AŞAĞI TIKLAYIN :)</h1>
      <Link className=' border border-white rounded-xl bg-white font-black text-black px-5 py-2 font-osw' href="/category">QR MENUYE GİT</Link>
    </div>
  )
}