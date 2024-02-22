"use client"
import React, { useState, useEffect } from 'react';
import Button from '@/components/admin/button'
import { oneCategoryType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { url } from "@/lib/url"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import imageCompression from 'browser-image-compression';
import { app } from "@/utils/firebase"




const Index = () => {


  const queryClient = useQueryClient()

  const [file, setFile] = useState<File | null>(null);
  const [prop, setProp] = useState("");
  const [imageName, setImageName] = useState("");


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

  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${url}/api/getCategory`).then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: ({ name }: { name: string; }) => {
      return fetch(`${url}/api/getCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: name,
          imageName,
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


    mutation.mutate({ name});
    form.reset();
  }

  const deleteCategory = async (categoryName: string) => {
    try {
      await deleteImage(imageName);

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
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Ürün Silindi!")
      }
    } catch (err) {
      toast.error("Bir Hata Oluştu!")
    }
  }

  const deleteImage = async (imageName: string) => {
    try {
        const storage = getStorage(app);
        const imageRef = ref(storage, imageName);
        await deleteObject(imageRef);
        toast.success("Resim başarıyla silindi!");
    } catch (error) {
        console.error("Resim silinirken hata oluştu: ", error);
        toast.error("Resim silinirken bir hata oluştu.");
    }
};

  const compressImage = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 1, // Max dosya boyutu megabayt cinsinden
        maxWidthOrHeight: 200, // Max genişlik veya yükseklik piksel cinsinden
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
      } else {
        // Dosya boyutu istenilenin üzerinde, kullanıcıya uyarı gösterilebilir
        alert("Dosya boyutu istenilenin üzerinde. Lütfen daha küçük bir dosya seçin.");
      }
    }
  };


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
          <input
            type="file"
            id='image'
            onChange={handleFileChange}
          />

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