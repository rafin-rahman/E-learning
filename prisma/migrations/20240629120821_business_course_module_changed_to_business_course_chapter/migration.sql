/*
  Warnings:

  - You are about to drop the `BusinessCourseModule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessCourseModule" DROP CONSTRAINT "BusinessCourseModule_businessCourseId_fkey";

-- DropTable
DROP TABLE "BusinessCourseModule";

-- CreateTable
CREATE TABLE "BusinessCourseChapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "businessCourseId" TEXT,

    CONSTRAINT "BusinessCourseChapter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessCourseChapter" ADD CONSTRAINT "BusinessCourseChapter_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
