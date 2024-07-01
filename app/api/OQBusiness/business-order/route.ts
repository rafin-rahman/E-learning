import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const body = await request.json();
  const { companyId } = body;

  try {
    const businessOrders = await prisma.businessPurchase.findMany({
      where: {
        companyId: companyId,
        status: "COMPLETED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!businessOrders) {
      return NextResponse.json({ error: "No order found" });
    }

    return NextResponse.json({ data: businessOrders });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error:
        "Ops, Something went wrong while fetching list of all business orders",
    });
  }
}
