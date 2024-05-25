import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // function to hash password
  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

  // delete all users
  await prisma.user.deleteMany();

  // Seed users
  await prisma.user.createMany({
    data: [
      {
        firstName: "Esmee",
        lastName: "Garrett",
        email: "admin@gmail.com",
        password: await hashPassword("123123"),
        role: ["ADMIN"],
      },
      {
        firstName: "Keanu",
        lastName: "Patton",
        email: "basic@gmail.com",
        password: await hashPassword("123123"),
        role: ["admission_officer"],
        permissions: ["can_delete_students"],
      },
      {
        firstName: "Hugo",
        lastName: "Mcgee",
        email: "superadmin@gmail.com",
        password: await hashPassword("123123"),
        role: ["SUPER_ADMIN"],
      },
    ],
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
