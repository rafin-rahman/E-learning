/*
  Warnings:

  - You are about to drop the column `quantity` on the `BusinessOrder` table. All the data in the column will be lost.
  - You are about to drop the `_BusinessCourseToBusinessOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BusinessCourseToBusinessOrder" DROP CONSTRAINT "_BusinessCourseToBusinessOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessCourseToBusinessOrder" DROP CONSTRAINT "_BusinessCourseToBusinessOrder_B_fkey";

-- AlterTable
ALTER TABLE "BusinessOrder" DROP COLUMN "quantity";

-- DropTable
DROP TABLE "_BusinessCourseToBusinessOrder";

-- CreateTable
CREATE TABLE "BusinessOrderCourseQuantity" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "businessOrderId" TEXT NOT NULL,
    "businessCourseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessOrderCourseQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessOrderCourseQuantity_businessOrderId_businessCourseI_key" ON "BusinessOrderCourseQuantity"("businessOrderId", "businessCourseId");

-- AddForeignKey
ALTER TABLE "BusinessOrderCourseQuantity" ADD CONSTRAINT "BusinessOrderCourseQuantity_businessOrderId_fkey" FOREIGN KEY ("businessOrderId") REFERENCES "BusinessOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessOrderCourseQuantity" ADD CONSTRAINT "BusinessOrderCourseQuantity_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
