"use server";
import prisma from "@/lib/prisma";

export default async function loadBusinessesAction() {
  try {
    const businesses = await prisma.company.findMany({
      where: {
        status: "ACTIVE",
      },
      select: {
        id: true,
        name: true,
        logo: true,
      },
    });

    if (!businesses) {
      return {
        error: "No businesses found",
        status: 404,
      };
    }

    // Must return name, logo, licenses, and earnings
    // add mock data for now for licenses and earnings, need to push new properties licenses and earnings to businesses
    const updatedBusinesses: any = businesses.map((business) => {
      return {
        ...business,
        licenses: Math.floor(Math.random() * 100).toString(),
        earnings: Math.floor(Math.random() * 10000).toString(),
      };
    });

    return updatedBusinesses;
  } catch (error) {
    console.error("Error loading businesses:", error);
    return {
      error: "An unexpected error occurred. Please try again.",
      status: 500,
    };
  }
}
