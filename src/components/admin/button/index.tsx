"use client"
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';



import React from 'react'

const index =  (image: any ,mainNamee: any) => { 

    const [categoryName, setCategoryName] = useState("");
    const [imageName, setImageName] = useState("");
    
    const mainName = image.mainNamee;
      

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`https://rosacarolina-menu.vercel.app/api/category/getcategory`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryName, mainName, imageName
                }),
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Kategori Başarıyla Güncellendi!")
        },
    });

    const updateCategory = async () => {
        mutation.mutate();
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mr-2">
                    Düzenle
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 opacity-40 bg-gray-600" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                        Kategoriyi Düzenle
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Değişiklikleri kaydetmek için "Değişiklikleri Kaydet" butonuna tıklayın. (Değiştirmek istemediğiniz alanları boş bırakabilirsiniz.)
                    </Dialog.Description>
                    {/* For add any field just copy and paste this fieldset and change the label and id */}
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                            Kategori İsmi
                        </label>
                        <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="name"
                            placeholder={image.mainNamee}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="name">
                            Resim Linki
                        </label>
                        <input
                            className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                            id="image"
                            placeholder={image.image.length > 0 ? image.image : "Resim Yok (Link Girin)"}
                            onChange={(e) => setImageName(e.target.value)}
                        />
                    </fieldset>

                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button onClick={() => {
                                const userConfirmed = window.confirm("Onaylıyor musunuz?");

                                if (userConfirmed) {
                                    updateCategory();
                                } else {
                                    null;
                                }
                            }
                            } className="border border-black bg-green4 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                                Değişiklikleri Kaydet
                            </button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            X
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default index