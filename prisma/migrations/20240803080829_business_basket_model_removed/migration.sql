/*
  Warnings:

  - You are about to drop the `BusinessBasket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessBasket" DROP CONSTRAINT "BusinessBasket_businessId_fkey";

-- DropTable
DROP TABLE "BusinessBasket";
