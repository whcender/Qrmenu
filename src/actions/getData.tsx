"use server";

import ProductCart from "@/components/ProductCart";
import { oneProductType } from "@/types";
import { url } from "@/lib/url";

// fetchProduct fonksiyonu
export const fetchProduct = async (page: number, cat?: string) => {
    if (!cat) {
        const respon = await fetch(`http://localhost:3000/api/getProducts?page=${page}&limit=8`)

        const data = await respon.json();

        return data.map((item: oneProductType, index: number) => (
            <ProductCart key={item.id} products={item} index={index} />
        ));
    }

    const response = await fetch(`http://localhost:3000/api/getProducts?page=${page}&limit=8&category=${cat}`)

    const data = await response.json();

    return data.map((item: oneProductType, index: number) => (
        <ProductCart key={item.id} products={item} index={index} />
    ));

}
