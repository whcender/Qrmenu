"use client"
import { oneCategoryType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { url } from '@/lib/url';

const ListBoxExample = ({selectedItem, setSelectedItem} : any) => {
  
  const { isLoading, data } = useQuery({
    queryKey: ["cate"],
    queryFn: () =>
      fetch(`${url}/api/getCategory`).then((res) => res.json()),
  });

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold mb-2 w-full">Ürün kategorisini seçin</h2>
      <ul className=' gap-1 flex flex-col'>
        {data.length === 0 && <p>Önce Ürün Kategorisi Oluşturun..</p>}
        {data.map((item: oneCategoryType) => (
          <li
            key={item.name}
            onClick={() => handleItemClick(item.name)}
            className={`py-2 cursor-pointer px-5 w-full  rounded-md border border-black ${
              selectedItem === item.name ? 'bg-black text-white hover:bg-black' : ''
            }`}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <p className="mt-4">
        Seçilen Kategori: {selectedItem || 'Seçilmedi'}
      </p>
    </div>
  );
};

export default ListBoxExample;