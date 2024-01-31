
import { auth } from "@/auth"
import { signOut } from "@/auth"
import { Button } from "../../../../components/ui/button"

const page = async() => {
  
  //old way
    const session = await auth()
    {JSON.stringify(session)}

    return (
    <div className="mt-5 flex flex-col gap-2">
      <form className="items-center flex  gap-5 justify-between" action={async ()=>{
        "use server";

        await signOut()
      }}>
        <p className="font-osw text-lg">Merahaba! <span className="font-bold uppercase">{session?.user?.name}</span></p>
        <Button variant={"outline"}>Çıkış Yap</Button>
      </form>
      <div className="w-full h-[2px] bg-black"></div>
    </div>
  )
}

export default page