"use client"
import React, { useState } from 'react';
import SelectCategory from '../selectCategory';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { oneProductType } from '@/types';
import ButtonProduct from '../buttonProduct';
import { toast } from 'react-toastify';
import {url} from "@/lib/url"

const Index = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState("");

  const [prop, setProp] = useState("");
  const [imageName, setImageName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [id, setId] = useState("");

  const { isLoading, error, data: allProducts } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${url}/api/getProducts?page=1&limit=3000`).then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${url}/api/getProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: selectedItem,
          productName: productName,
          productDescription: productDescription,
          productPrice: productPrice,
          productImage: productImage,
        }),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Ürün Eklendi!")
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    mutation.mutate(); 
    form.reset();
  };

  const deleteProduct = async (productName: string) => {
    try {
      const response = await fetch(`${url}/api/getProducts`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName,
        }),
      });

      if (response.ok) {
        toast.success("Ürün Silindi!")
      } else {
        toast.error("Ürün Silinemedi!")
      }
    } catch (err) {
      console.log('Error:', err);
    }
  };

  const [searchTerm, setSearchTerm] = useState<string>('');

  if (isLoading) return "Loading...";

  // data dizisini searchTerm'e göre filtrele
  const filteredData = allProducts.filter((item: oneProductType) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div>
        <h4 className='font-semibold ml-2 underline mt-3'>Ürün Ekle</h4>
                <form onSubmit={
                    (e) => {
                        handleUpdate(e);
                    }
                } className='flex flex-col gap-4 items-center justify-around w-[90%] m-auto mt-4'>
                    <input onChange={(e) => {
                        setProductName(e.target.value)
                    }} className='border border-black rounded-sm px-3 py-1 w-full' type="text" placeholder='Ürün İsmi..' />
                    <input onChange={(e) => {
                        setProductImage(e.target.value)
                    }} className='border border-black rounded-sm px-3 py-1 w-full' type="text" placeholder='Resim Linki..' />
                    <input onChange={(e) => {
                        setProductDescription(e.target.value)
                    }} className='border border-black rounded-sm px-3 py-1 w-full' type="text" placeholder='Ürün açıklaması (opsiyonel)..' />
                    <input onChange={(e) => {
                        const price = parseInt(e.target.value)
                        setProductPrice(price)
                    }} className='border border-black rounded-sm px-3 py-1 w-full' type="number" placeholder='Fiyat..' />
                    <SelectCategory selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                    <button type="submit" className='border border-black text-white rounded bg-black px-3 py-3 w-full'>Ürün Ekle</button>
                </form>
      </div>

      <h4 className='font-semibold ml-2 underline mt-7'>Ürün Düzenle</h4>
      {/* Arama kutusu */}
      <input
        type="text"
        placeholder="Ürün Ara"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='ml-2 mt-2 p-1 border border-gray-300 rounded'
      />

      {/* Filtrelenmiş veriyi göster */}
      {filteredData.map((item: oneProductType) => (
        <div key={item.name} className='flex flex-row justify-between items-center border-b border-gray-300 py-2 w-[90%] m-auto'>
          <p className='ml-2 font-semibold'>{item.name}</p>
          <div className='flex flex-row '>
            <button onClick={async () => {
              setProp(item.name);
              setImageName(item.image);
              setDesc(item.description);
              setPrice(item.price);
              setId(item.id);
            }}>
              <ButtonProduct image={imageName} mainNamee={prop} price={price} desc={desc} id={id} />
            </button>
            <button onClick={() => {
              const userConfirmed = window.confirm("Onaylıyor musunuz?");
              if (userConfirmed) {
                deleteProduct(item.name);
              } else {
                null;
              }
            }} className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded'>Sil</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
