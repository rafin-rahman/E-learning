"use server";
import prisma from "@/lib/prisma";

export default async function addBusinessAction(
  formData: FormData
): Promise<string> {
  // remove all the spaces from formData.domains and create an array by splitting by comma
  const domainsToArray = (formData.get("domains") as string)
    // remove all the spaces
    .replace(/\s/g, "")
    // split by comma
    .split(",");
  console.log(domainsToArray);

  try {
    await prisma.businessClient.create({
      data: {
        name: formData.get("name") as string,
        shortName: formData.get("shortName") as string,
        logo: formData.get("logo") as string,
        domains: domainsToArray as string[],
      },
    });
  } catch (error) {}

  return "";
}
