import { z } from "zod";

const MAX_FILE_SIZE = 2000000; // 2MB
const ACCEPTED_IMAGE_TYPES_BUSINESS_LOGO = [
  "image/png",
  "image/jpg",
  "image/jpeg",
];

let allowedDomainSuffixes = [
  ".com",
  ".org",
  ".net",
  ".edu",
  ".gov",
  ".co",
  ".io",
  ".ai",
  ".us",
  ".uk",
  ".au",
  ".ca",
  ".de",
  ".fr",
  ".cn",
  ".ru",
  ".info",
  ".biz",
  ".tv",
  ".me",
  ".blog",
  ".xyz",
  ".shop",
  ".app",
];

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});

export const userPersonalDetailsSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(6),
  telephone: z.string().min(6),
});

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createBusinessClientSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long.",
    })
    .max(50),
  shortName: z.string().optional(),
  country: z.string(),
  logo: z
    .any()
    // checking if the file is an image
    .refine(
      (file) =>
        file.length === 1
          ? ACCEPTED_IMAGE_TYPES_BUSINESS_LOGO.includes(file?.[0]?.type)
          : true,
      "Invalid file. choose either JPEG or PNG image"
    )
    // checking if the file size is less than 2MB
    .refine(
      (file) => (file.length === 1 ? file[0]?.size <= MAX_FILE_SIZE : true),
      "Max file size allowed is 2MB."
    ),
  // domains: must take the string and split it by comma in order to get an array
  domains: z
    .string()
    .min(3)
    .refine((value) => !value.endsWith(","), {
      message: "Domain list must not end with a comma.",
    })
    .refine((value) => !value.endsWith(" "), {
      message: "Domain list must not end with a space.",
    })
    .refine(
      (value) => {
        let domains = value.split(",");
        let valid = true;
        domains.forEach((domain) => {
          let domainSuffix = domain.substring(domain.lastIndexOf("."));
          // remove all spaces
          domainSuffix = domainSuffix.replace(/\s/g, "");
          if (!allowedDomainSuffixes.includes(domainSuffix)) {
            valid = false;
          }
        });
        return valid;
      },
      {
        message:
          "Invalid one or more invalid domain, if error persist contact OQ's technical support.",
      }
    ),
});
