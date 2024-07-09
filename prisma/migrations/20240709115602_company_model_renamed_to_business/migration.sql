
-- DropForeignKey
ALTER TABLE "BusinessBasket" DROP CONSTRAINT "BusinessBasket_companyId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessPurchase" DROP CONSTRAINT "BusinessPurchase_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyEmployee" DROP CONSTRAINT "CompanyEmployee_companyId_fkey";

-- DropIndex
DROP INDEX "BusinessBasket_companyId_key";

-- AlterTable
ALTER TABLE "BusinessBasket" RENAME COLUMN "companyId" TO "businessId";

-- AlterTable
ALTER TABLE "BusinessPurchase" RENAME COLUMN "companyId" TO "businessId";

-- AlterTable
ALTER TABLE "CompanyEmployee" RENAME COLUMN "companyId" TO "businessId";

-- AlterTable
ALTER TABLE "Company" RENAME TO "Business";

-- CreateIndex
CREATE UNIQUE INDEX "BusinessBasket_businessId_key" ON "BusinessBasket"("businessId");

-- AddForeignKey
ALTER TABLE "CompanyEmployee" ADD CONSTRAINT "CompanyEmployee_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessBasket" ADD CONSTRAINT "BusinessBasket_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchase" ADD CONSTRAINT "BusinessPurchase_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
