import Link from 'next/link';
import { categoryType } from '@/types';
import Image from 'next/image';
import { getCat } from '@/actions/getCat';


const Index = async () => {

  const category:categoryType = await getCat();

  const offset = 0;

  return (
    <div>
      <div className={`w-full overflow-x-scroll whitespace-nowrap px-3 py-2 transition-all duration-200 `}>
        <ul className="flex gap-4">
          {category.map((item) => (
            <Link className="flex flex-col items-center justify-center" href={`/category/${item.name}`} key={item.name}>
              <p className={`w-24 text-center font-semibold ${offset > 270 ? "text-xs" : "text-sm"}`}>{item.name}</p>
              <div className={`w-24 h-24 flex items-center justify-center`}>
                <Image  src={item.image} alt={item.name} width={ 100} height={ 100} loading='lazy' />
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;