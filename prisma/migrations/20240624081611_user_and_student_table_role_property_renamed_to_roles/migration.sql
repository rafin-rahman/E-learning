/*
  Warnings:

  - You are about to drop the column `role` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BusinessOrder" ALTER COLUMN "status" SET DEFAULT 'COMPLETED';

-- AlterTable
ALTER TABLE "Student" RENAME COLUMN "role" TO "roles";


-- AlterTable
ALTER TABLE "User" RENAME COLUMN "role" TO "roles";
