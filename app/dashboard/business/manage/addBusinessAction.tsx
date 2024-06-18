"use server";
import prisma from "@/lib/prisma";
import { put, del, PutBlobResult } from "@vercel/blob";

export default async function addBusinessAction(
  formData: FormData
): Promise<string> {
  // find if existing businesses already exists
  const existingBusinesses = await prisma.businessClient.findMany({
    where: {
      name: formData.get("name") as string,
    },
  });

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
    await prisma.businessClient.create({
      data: {
        name: formData.get("name") as string,
        shortName: formData.get("shortName") as string,
        logo: uploadResult.url,
        domains: domainsToArray as string[],
      },
    });
  } catch (error) {}

  return "";
}
