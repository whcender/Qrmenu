
import { auth } from "@/auth"
import { signOut } from "@/auth"

const page = async() => {
  
  //old way
    const session = await auth()
    {JSON.stringify(session)}

    return (
    <div>
      <form action={async ()=>{
        "use server";

        await signOut()
      }}>
        <button>Sign Out</button>
        <p className="mt-10 text-2xl">{session?.user?.name}</p>
      </form>
    </div>
  )
}

export default page