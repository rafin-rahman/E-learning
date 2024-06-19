/*
  Warnings:

  - You are about to drop the column `businessClientId` on the `BusinessPurchase` table. All the data in the column will be lost.
  - You are about to drop the `BusinessClient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessClientEmployee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyId` to the `BusinessPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessClientEmployee" DROP CONSTRAINT "BusinessClientEmployee_businessClientId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessPurchase" DROP CONSTRAINT "BusinessPurchase_businessClientId_fkey";

-- AlterTable
ALTER TABLE "BusinessPurchase" DROP COLUMN "businessClientId",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "BusinessClient";

-- DropTable
DROP TABLE "BusinessClientEmployee";

-- CreateTable
CREATE TABLE "Comapany" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "country" TEXT,
    "logo" TEXT,
    "domains" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comapany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyEmployee" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyEmployee_email_key" ON "CompanyEmployee"("email");

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Comapany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchase" ADD CONSTRAINT "BusinessPurchase_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Comapany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
