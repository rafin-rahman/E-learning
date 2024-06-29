/*
  Warnings:

  - You are about to drop the column `description` on the `BusinessCourseChapter` table. All the data in the column will be lost.
  - Added the required column `companyEmployeeId` to the `BusinessCourseChapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progressionPercentage` to the `BusinessCourseChapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BusinessCourseChapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessCourseChapter" DROP COLUMN "description",
ADD COLUMN     "companyEmployeeId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "progressionPercentage" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "BusinessCourseChapterQuiz" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "businessCourseChapterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCourseChapterQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCourseChapterQuizQuestions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "businessCourseChapterQuizId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCourseChapterQuizQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCourseChapterQuizAttempt" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "businessCourseChapterQuizId" TEXT NOT NULL,
    "companyEmployeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCourseChapterQuizAttempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessCourseChapter" ADD CONSTRAINT "BusinessCourseChapter_companyEmployeeId_fkey" FOREIGN KEY ("companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuiz" ADD CONSTRAINT "BusinessCourseChapterQuiz_businessCourseChapterId_fkey" FOREIGN KEY ("businessCourseChapterId") REFERENCES "BusinessCourseChapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuizQuestions" ADD CONSTRAINT "BusinessCourseChapterQuizQuestions_businessCourseChapterQu_fkey" FOREIGN KEY ("businessCourseChapterQuizId") REFERENCES "BusinessCourseChapterQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuizAttempt" ADD CONSTRAINT "BusinessCourseChapterQuizAttempt_businessCourseChapterQuiz_fkey" FOREIGN KEY ("businessCourseChapterQuizId") REFERENCES "BusinessCourseChapterQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuizAttempt" ADD CONSTRAINT "BusinessCourseChapterQuizAttempt_companyEmployeeId_fkey" FOREIGN KEY ("companyEmployeeId") REFERENCES "CompanyEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
