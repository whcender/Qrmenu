import Link from 'next/link'
import { BsInstagram } from 'react-icons/bs'
import Lang from "@/components/lang"


const index = () => {

    return (
        <div className={`w-full border-b-2  rounded-md`}>
            <div className='px-3 py-6 container flex justify-between items-center'>
                <div className='flex flex-col items-center '>
                    <Link href={"/"}>
                        <h2 className='text-xl font-medium uppercase tracking-wide text-black font-osw'>Rosacarolina</h2>
                    </Link>
                    <span className='bg-black w-full h-0.5'>-</span>
                    <h4 className='text-sm font-normal tracking-wide text-gray-700 text-left w-full font-osw'>Menu</h4>
                </div>
                <div className='flex gap-3 items-center'>
                    <a href="https://www.instagram.com/__rosacarolinacafeoltu/?hl=tr">
                        <h3 className='shadow text-xs items-center font-semibold border border-black text-black py-1 px-2 rounded-lg flex gap-2'>
                            <BsInstagram
                                className='text-black'
                                size={20}
                            />
                        </h3>
                    </a>
                    <Lang />
                </div>
            </div>
        </div>
    )
}

export default index
