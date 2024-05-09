"use server";

import ProductCart from "@/components/ProductCart";
import { prisma } from "@/utils/connect";
import { headers } from "next/headers";

// fetchProduct fonksiyonu
export const fetchProduct = async (page: number, cat?: string) => {
    headers();


    const limit = 8;
    if (!cat) {
        try {
            const result = await prisma.products.findMany({
                take: limit,
                skip: (page - 1) * limit,
            });

            return result.map((item: any) => (
                <ProductCart key={item.id} products={item} />
            ));


        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }

    }

    if (cat) {
        try {
            const result = await prisma.products.findMany({
                where: {
                    categoryId: cat,
                    // Büyük/küçük harf duyarlılığını dikkate almadan arama yapar

                }

            });

            return result.map((item: any) => (
                <ProductCart key={item.id} products={item} />
            ));

        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

}