import Link from 'next/link';
import { categoryType } from '@/types';
import Image from 'next/image';

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/getCategory", {
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

const Index = async () => {

  const category:categoryType = await getData();

  const offset = 0;

  return (
    <div>
      <div className={`w-full overflow-x-scroll whitespace-nowrap px-3 py-2 transition-all duration-200 ${offset > 270 ? 'fixed top-0 shadow-lg bg-white rounded-b-lg border' : null}`}>
        <ul className="flex gap-4">
          {category.map((item) => (
            <Link className="flex flex-col items-center justify-center" href={`/category/${item.name}`} key={item.name}>
              <p className={`w-24 text-center font-semibold ${offset > 270 ? "text-xs" : "text-sm"}`}>{item.name}</p>
              <div className={` ${offset < 270 ? "w-24 h-24" : "h-14"} flex items-center justify-center`}>
                <Image className='' src={item.image} alt={item.name} width={offset > 270 ? 50 : 100} height={offset > 270 ? 50 : 100} loading='lazy' />
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;