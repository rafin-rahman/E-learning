/*
  Warnings:

  - You are about to drop the `Comapany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessPurchase" DROP CONSTRAINT "BusinessPurchase_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyEmployee" DROP CONSTRAINT "CompanyEmployee_companyId_fkey";

-- DropTable
DROP TABLE "Comapany";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "country" TEXT,
    "logo" TEXT,
    "domains" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchase" ADD CONSTRAINT "BusinessPurchase_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
