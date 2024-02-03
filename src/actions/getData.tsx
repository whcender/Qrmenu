"use server";

import ProductCart from "@/components/ProductCart";
import { prisma } from "@/utils/connect";


// fetchProduct fonksiyonu
export const fetchProduct = async (page: number, cat?: string) => {
    const limit = 8

    try {
        const products = await prisma.products.findMany({
            where: {
                ...(cat ? { categoryname: cat } : {}),
            },
            take: limit,
            skip: (page - 1) * limit,
        });
        return products.map((item: any) => (
            <ProductCart key={item.id} products={item} />
        ));
    } catch (err) {
        console.log(err);

    }
}