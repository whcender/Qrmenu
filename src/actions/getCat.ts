"use server";

import { prisma } from "@/utils/connect";

export const getCat = async () => {
    const categories = await prisma.categories.findMany({
        select: {
            name: true,
            image: true,
        },
    });

    return categories;
}