"use server";
import prisma from "@/lib/prisma";

export default async function getBusinessEmployeesAction(
  businessId: string
): Promise<
  {
    id: string;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    roles: string[];
    businessId: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
> {
  try {
    return await prisma.businessEmployee.findMany({
      where: {
        businessId: businessId,
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
