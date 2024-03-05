"use server";
import { headers } from "next/headers";
import { prisma } from "@/utils/connect";
import ProductCart from '@/components/ProductCart'


export const fetchFav = async (ids: string[]) => {
    headers();

    try {
        const result = await prisma.products.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return result
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
