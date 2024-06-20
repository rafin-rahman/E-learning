"use server";
import prisma from "@/lib/prisma";

export default async function getCompanyDetailsAction(id: string) {
  try {
    const business: any = await prisma.company.findUnique({
      where: {
        id: id,
      },
    });

    return business;
  } catch (error) {
    console.error(error);
  }
}
