// app/actions/fetchCategory.ts
"use server";

import { categoryTypes } from '@/types';
import { prisma } from '@/utils/connect';
import { headers } from 'next/headers';

export const fetchCategory = async (): Promise<categoryTypes[]> => {
  headers(); // Server Action'ın çalıştığını göstermek için kullanılır

  try {
    const categories = await prisma.categories.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
