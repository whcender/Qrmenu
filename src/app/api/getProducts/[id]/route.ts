import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import translate from "translate";


export const dynamic = 'force-dynamic';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });
    console.log(product);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { pname, imageName, Pdesc, Pprice } = await req.json();

    // Sadece boş olmayan verileri güncelle
    const dataToUpdate: any = {};
    if (pname){
      dataToUpdate.name = pname;
      dataToUpdate.ename = await translate(pname, { from: "tr", to: "en" });
    } 
    if (imageName) dataToUpdate.image = imageName;
    if (Pdesc) {
      dataToUpdate.description = Pdesc;
      dataToUpdate.edescription = await translate(Pdesc, { from: "tr", to: "en" });
    }
    if (Pprice) dataToUpdate.price = Pprice;

    // Sadece güncellenecek veri varsa güncelleme işlemini yap
    if (Object.keys(dataToUpdate).length > 0) {
      const updateProdcuts = await prisma.products.update({
        where: {
          id: id,
        },
        data: dataToUpdate
      });

      return NextResponse.json(updateProdcuts);
    } else {
      // Güncellenecek veri yoksa hata döndür
      return NextResponse.json({ message: "No data to update" });
    }
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" });
  }
}
