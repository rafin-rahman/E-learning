
-- AlterForeignKey
ALTER TABLE "BusinessPurchase" RENAME CONSTRAINT "BusinessPurchase_businessCourseId_fkey" TO "BusinessOrder_businessCourseId_fkey";

-- AlterForeignKey
ALTER TABLE "BusinessPurchase" RENAME CONSTRAINT "BusinessPurchase_companyId_fkey" TO "BusinessOrder_companyId_fkey";

-- RenameTable
ALTER TABLE "BusinessPurchase" RENAME TO "BusinessOrder";

