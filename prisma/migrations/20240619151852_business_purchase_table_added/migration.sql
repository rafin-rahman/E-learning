/*
  Warnings:

  - You are about to drop the `BusinessClientUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessClientUser" DROP CONSTRAINT "BusinessClientUser_businessClientId_fkey";

-- AlterTable
ALTER TABLE "BusinessClient" ADD COLUMN     "country" TEXT;

-- DropTable
DROP TABLE "BusinessClientUser";

-- CreateTable
CREATE TABLE "BusinessClientEmployee" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "businessClientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessClientEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessPurchase" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "businessClientId" TEXT NOT NULL,
    "businessCourseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCourse" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCourseModule" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "businessCourseId" TEXT,

    CONSTRAINT "BusinessCourseModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessClientEmployee_email_key" ON "BusinessClientEmployee"("email");

-- AddForeignKey
ALTER TABLE "BusinessClientEmployee" ADD CONSTRAINT "BusinessClientEmployee_businessClientId_fkey" FOREIGN KEY ("businessClientId") REFERENCES "BusinessClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchase" ADD CONSTRAINT "BusinessPurchase_businessClientId_fkey" FOREIGN KEY ("businessClientId") REFERENCES "BusinessClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchase" ADD CONSTRAINT "BusinessPurchase_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseModule" ADD CONSTRAINT "BusinessCourseModule_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
