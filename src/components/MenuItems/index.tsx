import Link from 'next/link';
import { categoryType } from '@/types';
import Image from 'next/image';
import { url } from '@/lib/url';
import Text from './text';


const Index = async () => {
  const getData = async () => {
    try {
      const res = await fetch(`${url}/api/getCategory`, {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const category: categoryType = await getData();

  return (
    <div>
      <div className={`w-full overflow-x-scroll whitespace-nowrap px-3 py-2 transition-all duration-200  `}>
        <ul className="flex gap-4">
          <Link className="flex flex-col items-center justify-center" href={`/category`}>
            <Text text={"Hepsi"} text2={"All"} />
            <div className={`w-24 h-24 flex items-center justify-center`}>
              <Image className='w-24 h-24 object-cover' src="/menu.webp" alt={"arlan medya hepsi"} width={100} height={100} loading='lazy' placeholder="blur" blurDataURL="https://i.hizliresim.com/74xpsgl.gif" />
            </div>
          </Link>
          {category.map((item) => (
            <Link className="flex flex-col items-center justify-center" href={`/category/${item.name}`} key={item.name}>
              <Text text={item.name} text2={item.ename} />
              <div className={`w-24 h-24 flex items-center justify-center`}>
                <Image className='w-24 h-24 object-cover' src={item.image} alt={item.name} width={100} height={100} loading='lazy' placeholder="blur" blurDataURL="https://i.hizliresim.com/74xpsgl.gif" />
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
