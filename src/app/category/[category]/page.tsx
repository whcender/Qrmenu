import MenuItems from '@/components/MenuItems'
import { fetchProduct } from "@/actions/getData"


type Props = {
  params: { category: string }
}

const Home = async ({ params }: Props) => {

  
  const products = await fetchProduct(1, params.category)

  return (
    <div>
      <MenuItems />
      <div className='mt-10 '>
            {products}
      </div>
    </div>
  );
};

export default Home;