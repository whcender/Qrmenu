"use client"

import imageCompression from 'browser-image-compression';
import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "@/utils/firebase"
import { url } from '@/lib/url';




import React from 'react'

const index =  (image: any ,mainNamee: any) => { 

    const [file, setFile] = useState<File | null>(null);
    const [categoryName, setCategoryName] = useState("");
    const [imageName, setImageName] = useState("");

    
    const mainName = image.mainNamee;

    useEffect(() => {
        // Check if 'file' is not null before proceeding
        if (file) {
          const storage = getStorage(app);
    
          const upload = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);
    
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    break;
                  case "running":
                    toast.info("Bekleyin! Resim yükleniyor...")
                    break;
                }
              },
              (error) => {
                // Handle upload error
                console.error("Error uploading: ", error);
              },
              () => {
                // Upload completed successfully
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageName(downloadURL);
                    toast.success("Resim başarıyla yüklendi!")
                  // Set the download URL or do something with it
                  
                });
              }
            );
          };
    
          // Call the upload function
          upload();
        }
      }, [file]); // Add dependencies if needed
      

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => {
            return fetch(`${url}/api/getCategory`, {
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
      if (mainNamee && image.image) {
        const userConfirmed = window.confirm("Onaylıyor musunuz?");
        if (userConfirmed) {
            // Resmi sil
            await deleteImage();

            // Yeni resmi yükle
            mutation.mutate();
        }
    } else {
        // Eğer eski resim adı veya yeni resim adı yoksa sadece güncelle
        mutation.mutate();
    }
    }

    const deleteImage = async () => {
      try {
          const storage = getStorage(app);
          const imageRef = ref(storage, image.image);
          await deleteObject(imageRef);
          toast.success("Eski resim başarıyla silindi!");
      } catch (error) {
          console.error("Resim silinirken hata oluştu: ", error);
          toast.error("Resim silinirken bir hata oluştu.");
      }
  };

    const compressImage = async (file: File) => {
        try {
          const options = {
            maxSizeMB: 1, // Max dosya boyutu megabayt cinsinden
            maxWidthOrHeight: 100, // Max genişlik veya yükseklik piksel cinsinden
            useWebWorker: true,
          };
    
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        } catch (error) {
          console.error('Dosya sıkıştırma hatası:', error);
          return null;
        }
      };

      const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
    
        if (selectedFile) {
          const compressedFile = await compressImage(selectedFile);
    
          if (compressedFile) {
            setFile(compressedFile);
          }else {
            // Dosya boyutu istenilenin üzerinde, kullanıcıya uyarı gösterilebilir
            alert("Dosya boyutu istenilenin üzerinde. Lütfen daha küçük bir dosya seçin.");
          }
        }
      };

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
                            type="file"
                            id='image'
                            onChange={handleFileChange}
                        />
                    </fieldset>

                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button onClick={() => {
                                    updateCategory();
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