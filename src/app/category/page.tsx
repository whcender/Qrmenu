import MenuItems from '@/components/MenuItems'
import { fetchProduct } from "@/actions/getData"
import LoadMore from '@/components/LoadMore'




const page = async () => {

    const products = await fetchProduct(1)

    return (
        <div>
            <MenuItems />
            <div className='mt-10 '>
                {products}
                <LoadMore />
            </div>
        </div>
    )
}

export default page