import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { auth } from "@/auth"
import translate from "translate";


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

  const { categoryName, imageName } = await req.json();


  if (categoryName === "" || imageName === "") {
    return new NextResponse(
      JSON.stringify({ message: "Bütün Alanları Doldurun!" }),
      { status: 400 }
    );
  }

  const ecategoryName = await translate(categoryName, { from: "tr", to: "en" });

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
  const session = await auth();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Yetkiniz Yok" }),
      { status: 400 }
    );
  }

  try {
    const { categoryName, mainName, imageName } = await req.json();

    // Sadece boş olmayan verileri güncelle
    const dataToUpdate: any = {};
    if (categoryName) {
      dataToUpdate.name = categoryName;
      dataToUpdate.ename = await translate(categoryName, { from: "tr", to: "en" });
    }
    if (imageName) dataToUpdate.image = imageName;

    // Sadece güncellenecek veri varsa güncelleme işlemini yap
    if (Object.keys(dataToUpdate).length > 0) {
      const updateCategory = await prisma.categories.update({
        where: {
          name: mainName
        },
        data: dataToUpdate
      });

      return NextResponse.json(updateCategory);
    } else {
      // Güncellenecek veri yoksa hata döndür
      return NextResponse.json({ message: "No data to update" });
    }
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" });
  }
}
