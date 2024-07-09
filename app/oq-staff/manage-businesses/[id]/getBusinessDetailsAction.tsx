"use server";
import prisma from "@/lib/prisma";

export default async function getBusinessDetailsAction(id: string) {
  try {
    const business: any = await prisma.business.findUnique({
      where: {
        id: id,
      },
    });

    return business;
  } catch (error) {
    console.error(error);
  }
}
