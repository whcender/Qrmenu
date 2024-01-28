import { prisma } from "@/utils/connect";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("category");
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    if (cat) {
        try {
            const products = await prisma.products.findMany({
                where: {
                    categoryname: cat
                },
                take: limit,
                skip: (page - 1) * limit,
            });
            return new NextResponse(JSON.stringify(products), { status: 200 });
        } catch (err) {
            console.log(err);
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong!" }),
                { status: 500 }
            );
        }
    }

    if(!cat){
        try {
            const products = await prisma.products.findMany({
                take: limit,
                skip: (page - 1) * limit, // Calculate the offset based on the page and limit
            });


            return new NextResponse(JSON.stringify(products), { status: 200 });
        } catch (err) {
            console.log(err);
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong!" }),
                { status: 500 }
            );
        }
    }

};



export async function DELETE(req: Request) {

    try {
        const { productName } = await req.json();

        const deleteProducts = await prisma.products.delete({
            where: {
                name: productName,
            },
        });

        return NextResponse.json(deleteProducts, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "An error occurred" });
    }
}


export async function POST(req: Request) {
    const { categoryName, productName, productDescription, productPrice, productImage } = await req.json();
    const existingCategory = await prisma.categories.findUnique({
        where: {
            name: categoryName
        }
    });

    if (existingCategory) {
        // Yeni ürünü oluşturun ve kategoriye bağlayın
        const newProduct = await prisma.products.create({
            data: {
                name: productName,
                price: productPrice,
                description: productDescription,
                image: productImage,
                category: {
                    connect: {
                        name: existingCategory.name
                    }
                }
            }
        });

        return NextResponse.json(newProduct);
    } else {
        return NextResponse.json({ message: "Category not found." });
    }
}