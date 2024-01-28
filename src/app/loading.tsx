import React from 'react'
import Image from 'next/image'
const index = () => {
  return (
    <div className='h-[100vh] flex items-center justify-center'>
        <Image src={"https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp"} alt='gif' height={200} width={200}/>
    </div>
  )
}

export default index