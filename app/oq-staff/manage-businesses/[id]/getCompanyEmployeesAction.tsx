"use server";
import prisma from "@/lib/prisma";

export default async function getCompanyEmployeesAction(
  companyId: string
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
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
  }[]
> {
  console.log("getCompanyEmployeesAction");
  try {
    return await prisma.companyEmployee.findMany({
      where: {
        companyId: companyId,
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
