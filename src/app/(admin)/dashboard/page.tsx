import Buttons from "@/app/(admin)/_components/buttons"
import Image from "next/image"

const page = async() => {
  
    return (
    <div className="flex flex-col items-center justify-center mt-10">
      <p className="font-bold">İşlem Seçin</p>
      <Buttons />
      <Image className="mt-16" src="/settings.png" width={100} height={100} alt="dash"/>
    </div>
  )
}

export default page