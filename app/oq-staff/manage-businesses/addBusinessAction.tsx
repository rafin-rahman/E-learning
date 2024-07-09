"use server";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { log } from "node:util";

export default async function addBusinessAction(
  formData: FormData
): Promise<{ error?: string; message?: string; status: number }> {
  //TODO: ensure that the business name is unique alongside the country

  // find if existing businesses already exists
  // const existingBusinesses = await prisma.business.findMany({
  //   where: {
  //     name: formData.get("name") as string,
  //   },
  // });

  // remove all the spaces from formData.domains and create an array by splitting by comma
  const domainsToArray = (formData.get("domains") as string)
    // remove all the spaces
    .replace(/\s/g, "")
    // split by comma
    .split(",");

  const logo = formData.get("logo") as File;

  const pathName = "businessClients/" + formData.get("name") + "/" + logo.name;

  // Upload the logo to the storage
  const uploadResult = await put(pathName, logo, {
    access: "public",
  });

  try {
    const newCompany = await prisma.business.create({
      data: {
        name: formData.get("name") as string,
        shortName: formData.get("shortName") as string,
        country: formData.get("country") as string,
        // if no logo is uploaded, then set the logo to empty string
        logo: logo.name ? uploadResult.url : "",
        domains: domainsToArray as string[],
      },
    });

    if (!newCompany) {
      return { error: "Failed to create a new company", status: 500 };
    }

    return { message: "Company created successfully", status: 200 };
  } catch (error) {
    console.log("Error: ", error);
    return {
      error:
        "Ops, Something went wrong, failed to create a new company, check dev logs for more details",
      status: 500,
    };
  }
}
