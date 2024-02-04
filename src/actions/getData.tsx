"use server";

import ProductCart from "@/components/ProductCart";
import { prisma } from "@/utils/connect";
import { url } from "@/lib/url";


// fetchProduct fonksiyonu
export const fetchProduct = async (page: number, cat?: string) => {

    if (!cat) {
        try {
            const res = await fetch(`${url}/api/getProducts?page=${page}&limit=8`, {
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();

            return result.map((item: any) => (
                <ProductCart key={item.id} products={item} />
            ));


        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }

    }

    if(cat){
        try {
            const res = await fetch(`${url}/api/getProducts?page=${page}&limit=8&cat=${cat}`, {
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();

            return result.map((item: any) => (
                <ProductCart key={item.id} products={item} />
            ));

        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

}