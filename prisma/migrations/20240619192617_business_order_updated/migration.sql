/*
  Warnings:

  - You are about to drop the column `businessCourseId` on the `BusinessOrder` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `BusinessOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessOrder" DROP CONSTRAINT "BusinessOrder_businessCourseId_fkey";

-- AlterTable
ALTER TABLE "BusinessOrder" DROP COLUMN "businessCourseId",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_BusinessCourseToBusinessOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessCourseToBusinessOrder_AB_unique" ON "_BusinessCourseToBusinessOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessCourseToBusinessOrder_B_index" ON "_BusinessCourseToBusinessOrder"("B");

-- AddForeignKey
ALTER TABLE "_BusinessCourseToBusinessOrder" ADD CONSTRAINT "_BusinessCourseToBusinessOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "BusinessCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessCourseToBusinessOrder" ADD CONSTRAINT "_BusinessCourseToBusinessOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "BusinessOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
