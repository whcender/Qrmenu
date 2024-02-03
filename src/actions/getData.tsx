"use server";

import ProductCart from "@/components/ProductCart";
import { oneProductType, productType } from "@/types";
import { prisma } from "@/utils/connect";
import { url } from "@/lib/url";



// fetchProduct fonksiyonu
export const fetchProduct = async (page: number, cat?: string) => {
    const limit = 8
    if (cat) {
        try {
            const products = await prisma.products.findMany({
                where: {
                    categoryname: cat
                },
                take: limit,
                skip: (page - 1) * limit,
            });
            return products.map((item: any, index: number) => (
                <ProductCart key={item.id} products={item} />
            ));
        } catch (err) {
            console.log(err);

        }
    }
    if (!cat) {
        try {
            const products = await prisma.products.findMany({
                take: limit,
                skip: (page - 1) * limit, // Calculate the offset based on the page and limit
            });

            return products.map((item: any, index: number) => (
                <ProductCart key={item.id} products={item} />
            ));

        } catch (err) {
            console.log(err);

        }
    }
}


// if (!cat) {
//     const respon = await fetch(`http://localhost:3000/api/getProducts?page=${page}&limit=8`)

//     const data = await respon.json();

//     return data.map((item: oneProductType, index: number) => (
//         <ProductCart key={item.id} products={item} index={index} />
//     ));
// }

// const response = await fetch(`http://localhost:3000/api/getProducts?page=${page}&limit=8&category=${cat}`)

// const data = await response.json();

// return data.map((item: oneProductType, index: number) => (
//     <ProductCart key={item.id} products={item} index={index} />
// ));
