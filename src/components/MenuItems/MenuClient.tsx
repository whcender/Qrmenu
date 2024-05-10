'use client';

import Link from 'next/link';
import Image from 'next/image';
import { categoryTypes } from '@/types'
import Text from './text';
import { useState, useEffect } from 'react';
import React from 'react';

interface MenuClientProps {
  categories: categoryTypes[];
}

const MenuClient: React.FC<MenuClientProps> = ({ categories }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Scroll durumunu takip et
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`sticky top-0 z-10 transition-all duration-200 ${isScrolled ? 'bg-white py-1' : 'bg-white py-3'} border-b border-gray-200`}>
      <div className="w-full overflow-x-scroll whitespace-nowrap px-3">
        <ul className="flex gap-4">
          <Link className="flex flex-col items-center justify-center" href={`/category`}>
            <Text text={"Hepsi"} text2={"All"} />
            <div className={`flex items-center justify-center ${isScrolled ? 'w-20 h-20' : 'w-24 h-24'}`}>
              <Image className='object-cover' src="/menu.webp" alt={"arlan medya hepsi"} width={100} height={100} loading='lazy' placeholder="blur" blurDataURL="https://i.hizliresim.com/74xpsgl.gif" />
            </div>
          </Link>
          {categories.map((item) => (
            <Link className="flex flex-col items-center justify-center" href={`/category/${item.id}`} key={item.id}>
              <Text text={item.name} text2={item.ename} />
              <div className={`flex items-center justify-center ${isScrolled ? 'w-20 h-20' : 'w-24 h-24'}`}>
                <Image className='object-cover' src={item.image} alt={item.name} width={100} height={100} loading='lazy' placeholder="blur" blurDataURL="https://i.hizliresim.com/74xpsgl.gif" />
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuClient;
