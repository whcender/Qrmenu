import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

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
      const { pname, imageName, Pdesc ,Pprice } = await req.json();
      
  
      const updateProdcuts = await prisma.products.update({
        where: {
          id: id,
        },
        data: {
          name: pname || undefined,
          image: imageName || undefined,
          price: Pprice || undefined,
          description: Pdesc || undefined,
        }
      })
        ;
  
      return NextResponse.json(updateProdcuts);
    }
    catch (error) {
      return NextResponse.json({ message: "An error occurred" });
    }
  }