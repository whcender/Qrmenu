'use client'
import React, { useState, useEffect } from 'react';
import Button from '@/components/admin/button';
import { oneCategoryType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { url } from "@/lib/url";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import imageCompression from 'browser-image-compression';
import { app } from "@/utils/firebase";
import { convertToWebP } from '@/utils/imageConversion';

const Index = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [prop, setProp] = useState('');
  const [imageName, setImageName] = useState('');

  const handleWebPUpload = async (file: File) => {
    // WebP dönüştürme
    const webpBuffer = await convertToWebP(await file.arrayBuffer());
    const storage = getStorage(app);
    const name = `${new Date().getTime()}.webp`;
    const storageRef = ref(storage, `categories/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, webpBuffer);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            toast.info('Bekleyin! Resim yükleniyor...');
            break;
        }
      },
      (error) => {
        // Upload hatası
        console.error('Error uploading: ', error);
      },
      () => {
        // Upload başarıyla tamamlandı
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageName(downloadURL);
          toast.success('Resim başarıyla yüklendi!');
        });
      }
    );
  };

  const compressImage = async (file: File) => {
    try {
      const options = {
        maxSizeMB: 1, // Maksimum dosya boyutu MB cinsinden
        maxWidthOrHeight: 200, // Maksimum genişlik veya yükseklik piksel cinsinden
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
        await handleWebPUpload(compressedFile);
      } else {
        // Dosya boyutu istenilenin üzerinde, kullanıcıya uyarı gösterilebilir
        alert('Dosya boyutu istenilenin üzerinde. Lütfen daha küçük bir dosya seçin.');
      }
    }
  };

  useEffect(() => {
    // Firebase üzerinden dosya yükleme
    const storage = getStorage(app);

    const upload = () => {
      if (!file) return;

      const name = `${new Date().getTime() + file.name}`;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              break;
            case 'running':
              toast.info('Bekleyin! Resim yükleniyor...');
              break;
          }
        },
        (error) => {
          // Upload hatası
          console.error('Error uploading: ', error);
        },
        () => {
          // Upload başarıyla tamamlandı
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageName(downloadURL);
            toast.success('Resim başarıyla yüklendi!');
          });
        }
      );
    };

    if (file) {
      upload();
    }
  }, [file]);

  const { isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetch(`${url}/api/getCategory`).then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      return fetch(`${url}/api/getCategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName: name,
          imageName,
        }),
      });
    },
    onSuccess(result) {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      if (result.ok) {
        toast.success('Kategori Eklendi!');
      }
      if (result.status === 400) {
        result.json().then((data) => {
          toast.error(data.message);
        });
      }
    },
  });

  const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input1 = form.elements[0] as HTMLInputElement;
    const name = input1.value;

    mutation.mutate({ name });
    form.reset();
  };

  const deleteCategory = async (categoryName: string, image: string) => {
    try {
      await deleteImage(image);

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
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast.success('Ürün Silindi!');
      }
    } catch (err) {
      toast.error('Bir Hata Oluştu!');
    }
  };

  const deleteImage = async (image: string) => {
    try {
      const storage = getStorage(app);
      const imageRef = ref(storage, image);
      await deleteObject(imageRef);
      toast.success('Resim başarıyla silindi!');
    } catch (error) {
      console.error('Resim silinirken hata oluştu: ', error);
      toast.error('Resim silinirken bir hata oluştu.');
    }
  };

  if (isLoading) return 'Loading...';

  return (
    <div className='mt-10'>
      <div className='mb-11'>
        <h4 className='font-semibold ml-2 underline mt-3'>Yeni Kategori Ekle</h4>
        <form
          onSubmit={(e) => {
            addCategory(e);
          }}
          className='flex flex-col gap-4 items-center justify-around w-[90%] m-auto mt-4'
        >
          <input className='border border-black rounded-sm px-3 py-1' type='text' placeholder='Kategori İsmi..' />
          <input type='file' id='image' onChange={handleFileChange} accept='image/*' />

          <button className='border border-black text-white rounded bg-black px-3 py-1' type='submit'>
            Kategori Ekle
          </button>
        </form>
      </div>
      <h4 className='font-semibold ml-2 underline'>Kategori Düzenlemesi</h4>
      <div className='flex flex-col'>
        {data.map((category: oneCategoryType) => (
          <div
            key={category.name}
            className='flex flex-row justify-between items-center border-b border-gray-300 py-2 w-[90%] m-auto'
          >
            <p className='ml-2 font-semibold'>{category.name}</p>
            <div className='flex flex-row '>
              <button
                onClick={async () => {
                  setProp(category.name);
                  setImageName(category.image);
                }}
              >
                <Button image={imageName} mainNamee={prop} />
              </button>

              <button
                onClick={() => {
                  const userConfirmed = window.confirm('Onaylıyor musunuz?');
                  if (userConfirmed) {
                    deleteCategory(category.name, category.image);
                  } else {
                    null;
                  }
                }}
                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded'
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
