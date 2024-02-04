import MenuItems from '@/components/MenuItems'
import LoadMore from '@/components/LoadMore'
import ProductCart from '@/components/ProductCart'
import { url } from '@/lib/url'


const fetchProduct = async (page: number, cat?: string) => {

    if (!cat) {
        try {
            const res = await fetch(`${url}/api/getProducts?page=${page}&limit=8`, {
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();

            return result.map((item: any) => (
                <ProductCart key={item.id} products={item} />
            ));


        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }

    }
}

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