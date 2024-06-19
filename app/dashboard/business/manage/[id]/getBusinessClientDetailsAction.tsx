"use server";
import prisma from "@/lib/prisma";

export default async function getBusinessClientDetailsAction(id: string) {
  try {
    const business = await prisma.businessClient.findUnique({
      where: {
        id: id,
      },
    });

    return business;
  } catch (error) {
    console.error(error);
  }
}
