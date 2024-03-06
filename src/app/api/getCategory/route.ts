import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { auth } from "@/auth"

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {

  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    const categories = await prisma.categories.findMany({
      where: {
        ...(cat ? { name: cat } : {}),
      }
    });
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  const session = await auth()
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Yetkiniz Yok" }),
      { status: 400 }
    );
  }

  try {
    const { categoryName } = await req.json();

    const deleteProducts = await prisma.products.deleteMany({
      where: {
        category: {
          name: categoryName,
        },
      },
    });

    const deletedCategory = await prisma.categories.delete({
      where: {
        name: categoryName,
      },
    });

    return new NextResponse(JSON.stringify(deletedCategory), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {

  const session = await auth()
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Yetkiniz Yok" }),
      { status: 400 }
    );
  }

  const { categoryName, imageName, ecategoryName } = await req.json();


  if (categoryName === "" || imageName === "" || ecategoryName === "") {
    return new NextResponse(
      JSON.stringify({ message: "Bütün Alanları Doldurun!" }),
      { status: 400 }
    );
  }


  const addCategory = await prisma.categories.create({
    data: {
      name: categoryName,
      image: imageName,
      ename: ecategoryName
    }
  });

  return NextResponse.json(addCategory);

}


export async function PUT(req: Request) {

  const session = await auth()
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Yetkiniz Yok" }),
      { status: 400 }
    );
  }

  try {
    const { categoryName, mainName, imageName, ecategoryName } = await req.json();
    console.log(categoryName);


    const updateCategory = await prisma.categories.update({
      where: {
        name: mainName
      },
      data: {
        name: categoryName || undefined,
        image: imageName || undefined,
        ename: ecategoryName || undefined
      }
    })
      ;

    return NextResponse.json(updateCategory);
  }
  catch (error) {
    return NextResponse.json({ message: "An error occurred" });
  }
}