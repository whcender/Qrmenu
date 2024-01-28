"use client";


import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchProduct } from "@/actions/getData";

let page = 2;

export type AnimeCard = JSX.Element

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    if (inView && !reachedEnd) {
      fetchProduct(page).then((res) => {
        // Eğer gelen veri boşsa, bu sayfa sonu demektir
        if (res.length === 0) {
          setReachedEnd(true);
        } else {
          setData([...data, ...res]);
          page++;
        }
      });
    }
  }, [inView, reachedEnd, data]);

  return (
    <>
      <section>
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        {reachedEnd ? (
          <h2 className='mt-4 font-semibold font-osw text-center'>AFİYET <span className='text-red-700'>OLSUN</span> :)</h2>
        ) : (
          <div ref={ref}>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default LoadMore;