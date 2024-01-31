"use client"
import React, { useState } from 'react';
import Button from '@/components/admin/button'
import { oneCategoryType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { url } from "@/lib/url"



const Index = () => {


    const queryClient = useQueryClient()

    const [prop, setProp] = useState("");
    const [imageName, setImageName] = useState("");

    const { isLoading, data } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            fetch(`${url}/api/getCategory`).then((res) => res.json()),
    });

    const mutation = useMutation({
        mutationFn: ({ name, picture }: { name: string; picture: string }) => {
            return fetch(`${url}/api/getCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryName: name,
                    imageName: picture,
                }),
            });
        },
        onSuccess(result) {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            if (result.ok) {
                toast.success("Kategori Eklendi!");
            }
            if (result.status === 400) {
                result.json().then((data) => {
                    toast.error(data.message);
                })
            }
        },
    });


    const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input1 = form.elements[0] as HTMLInputElement;
        const name = input1.value;
        const input2 = form.elements[1] as HTMLInputElement;
        const picture = input2.value;


        mutation.mutate({ name, picture });
        form.reset();
    }

    const deleteCategory = async (categoryName: string) => {
        try {
            const response = await fetch(`${url}/api/getCategory`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    categoryName: categoryName,
                }),
            });

            if (response.ok) {
                toast.success("Ürün Silindi!")
            }
        } catch (err) {
            toast.error("Bir Hata Oluştu!")
        }
    }


    if (isLoading) return "Loading...";
    return (
        <div className='mt-10'>
            <div className='mb-11'>
                <h4 className='font-semibold ml-2 underline mt-3'>Yeni Kategori Ekle</h4>
                <form onSubmit={
                    (e) => {
                        addCategory(e);
                    }
                } className='flex flex-col gap-4 items-center justify-around w-[90%] m-auto mt-4'>
                    <input className='border border-black rounded-sm px-3 py-1' type="text" placeholder='Kategori İsmi..' />
                    <input className='border border-black rounded-sm px-3 py-1' type="text" placeholder='Kategori Resim Linki..' />

                    <button className='border border-black text-white rounded bg-black px-3 py-1' type='submit'>Kategori Ekle</button>
                </form>
            </div>
            <h4 className='font-semibold ml-2 underline'>Kategori Düzenlemesi</h4>
            <div className='flex flex-col'>
                {
                    data.map((category: oneCategoryType) => (
                        <div key={category.name} className='flex flex-row justify-between items-center border-b border-gray-300 py-2 w-[90%] m-auto'>
                            <p className='ml-2 font-semibold'>{category.name}</p>
                            <div className='flex flex-row '>
                                <button onClick={async () => {
                                    setProp(category.name);
                                    setImageName(category.image);
                                }}><Button image={imageName} mainNamee={prop} /></button>

                                <button onClick={() => {
                                    const userConfirmed = window.confirm("Onaylıyor musunuz?");
                                    if (userConfirmed) {
                                        deleteCategory(category.name);
                                    } else {
                                        null;
                                    }
                                }} className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded'>Sil</button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Index;