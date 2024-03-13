"use client";


import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchProduct } from "@/actions/getData";



export type AnimeCard = JSX.Element

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);
  const [reachedEnd, setReachedEnd] = useState(false);
    //burası yeni eklendi öncesinde let ile tanımlıyorduk
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (inView && !reachedEnd) {
      fetchProduct(page).then((res) => {
        // Eğer gelen veri boşsa, bu sayfa sonu demektir
        if (res?.length === 0) {
          setReachedEnd(true);
        } else {
          if(res){
            setData([...data, ...res]);
            setPage(page + 1);
          }
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
          null
        ) : (
          <div ref={ref}>
            <Image
              src="/loading.gif"
              alt="spinner"
              width={80}
              height={80}
              className="object-contain mt-4"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default LoadMore;
