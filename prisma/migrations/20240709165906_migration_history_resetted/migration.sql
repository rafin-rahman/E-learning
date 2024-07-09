-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "roles" TEXT[],
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW_ACCOUNT',
    "idDocument" TEXT,
    "qualificationDocument" TEXT,
    "englishLanguageCertificate" TEXT,
    "cvDocument" TEXT,
    "personalStatementDocument" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountedPrice" DOUBLE PRECISION,
    "duration" TEXT NOT NULL,
    "courseType" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "courseLevelId" TEXT NOT NULL,
    "courseSubjectId" TEXT NOT NULL,
    "deliveryPartnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryPartner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSubject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseLevel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "country" TEXT,
    "logo" TEXT,
    "domains" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessEmployee" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT[],
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessBasket" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessBasket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessPurchase" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "businessId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessPurchaseCourseQuantity" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "businessPurchaseId" TEXT NOT NULL,
    "businessCourseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPurchaseCourseQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCourse" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCourseChapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "progressionPercentage" TEXT NOT NULL,
    "businessEmployeeId" TEXT NOT NULL,
    "businessCourseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCourseChapter_pkey" PRIMARY KEY ("id")
);

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
    "businessEmployeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessCourseChapterQuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_studentId_key" ON "StudentProfile"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessEmployee_email_key" ON "BusinessEmployee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessBasket_businessId_key" ON "BusinessBasket"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessPurchaseCourseQuantity_businessPurchaseId_businessC_key" ON "BusinessPurchaseCourseQuantity"("businessPurchaseId", "businessCourseId");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseLevelId_fkey" FOREIGN KEY ("courseLevelId") REFERENCES "CourseLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseSubjectId_fkey" FOREIGN KEY ("courseSubjectId") REFERENCES "CourseSubject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_deliveryPartnerId_fkey" FOREIGN KEY ("deliveryPartnerId") REFERENCES "DeliveryPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessEmployee" ADD CONSTRAINT "BusinessEmployee_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessBasket" ADD CONSTRAINT "BusinessBasket_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchase" ADD CONSTRAINT "BusinessPurchase_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchaseCourseQuantity" ADD CONSTRAINT "BusinessPurchaseCourseQuantity_businessPurchaseId_fkey" FOREIGN KEY ("businessPurchaseId") REFERENCES "BusinessPurchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessPurchaseCourseQuantity" ADD CONSTRAINT "BusinessPurchaseCourseQuantity_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapter" ADD CONSTRAINT "BusinessCourseChapter_businessEmployeeId_fkey" FOREIGN KEY ("businessEmployeeId") REFERENCES "BusinessEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapter" ADD CONSTRAINT "BusinessCourseChapter_businessCourseId_fkey" FOREIGN KEY ("businessCourseId") REFERENCES "BusinessCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuiz" ADD CONSTRAINT "BusinessCourseChapterQuiz_businessCourseChapterId_fkey" FOREIGN KEY ("businessCourseChapterId") REFERENCES "BusinessCourseChapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuizQuestions" ADD CONSTRAINT "BusinessCourseChapterQuizQuestions_businessCourseChapterQu_fkey" FOREIGN KEY ("businessCourseChapterQuizId") REFERENCES "BusinessCourseChapterQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuizAttempt" ADD CONSTRAINT "BusinessCourseChapterQuizAttempt_businessCourseChapterQuiz_fkey" FOREIGN KEY ("businessCourseChapterQuizId") REFERENCES "BusinessCourseChapterQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCourseChapterQuizAttempt" ADD CONSTRAINT "BusinessCourseChapterQuizAttempt_businessEmployeeId_fkey" FOREIGN KEY ("businessEmployeeId") REFERENCES "BusinessEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
