/*
  Warnings:

  - You are about to drop the `BusinessOrderCourseQuantity` table. If the table is not empty, all the data it contains will be lost.

*/
-- -- DropForeignKey
-- ALTER TABLE "BusinessOrderCourseQuantity" DROP CONSTRAINT "BusinessOrderCourseQuantity_businessCourseId_fkey";
--
-- -- DropForeignKey
-- ALTER TABLE "BusinessOrderCourseQuantity" DROP CONSTRAINT "BusinessOrderCourseQuantity_businessPurchaseId_fkey";
--
-- -- RenameTable
-- ALTER TABLE "BusinessOrderCourseQuantity" RENAME TO "BusinessPurchaseCourseQuantity"
--
-- -- CreateIndex
-- CREATE UNIQUE INDEX "BusinessPurchaseCourseQuantity_businessPurchaseId_businessC_key" ON "BusinessPurchaseCourseQuantity"("businessPurchaseId", "businessCourseId");
--
--
-- -- AddForeignKey
-- ALTER TABLE "BusinessPurchaseCourseQuantity" ADD CONSTRAINT "BusinessPurchaseCourseQuantity_businessPurchaseId_fkey" FOREIGN KEY ("businessPurchaseId") REFERENCES "BusinessPurchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
--
-- -- AddForeignKey
-- ALTER TABLE "BusinessPurchaseCourseQuantity" ADD CONSTRAINT "BusinessPurchaseCourseQuantity_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Drop foreign key constraints
ALTER TABLE "BusinessOrderCourseQuantity" DROP CONSTRAINT "BusinessOrderCourseQuantity_businessCourseId_fkey";
ALTER TABLE "BusinessOrderCourseQuantity" DROP CONSTRAINT "BusinessOrderCourseQuantity_businessPurchaseId_fkey";

-- Rename the table
ALTER TABLE "BusinessOrderCourseQuantity" RENAME TO "BusinessPurchaseCourseQuantity";

-- Create unique index
CREATE UNIQUE INDEX "BusinessPurchaseCourseQuantity_businessPurchaseId_businessC_key" ON "BusinessPurchaseCourseQuantity"("businessPurchaseId", "businessCourseId");

-- Add foreign key constraints
ALTER TABLE "BusinessPurchaseCourseQuantity" ADD CONSTRAINT "BusinessPurchaseCourseQuantity_businessPurchaseId_fkey" FOREIGN KEY ("businessPurchaseId") REFERENCES "BusinessPurchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "BusinessPurchaseCourseQuantity" ADD CONSTRAINT "BusinessPurchaseCourseQuantity_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
