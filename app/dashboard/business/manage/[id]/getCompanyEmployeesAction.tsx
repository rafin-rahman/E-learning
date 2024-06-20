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
    const employees = await prisma.companyEmployee.findMany({
      where: {
        companyId: companyId,
      },
    });

    return employees;
  } catch (error) {
    console.error(error);
    return [];
  }
}
