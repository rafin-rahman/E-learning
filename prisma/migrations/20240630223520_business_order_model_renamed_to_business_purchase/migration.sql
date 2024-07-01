-- Step 1: Create the new BusinessPurchase table
CREATE TABLE "BusinessPurchase" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'COMPLETED',
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BusinessPurchase_pkey" PRIMARY KEY ("id")
);

-- Step 2: Copy data from BusinessOrder to BusinessPurchase
INSERT INTO "BusinessPurchase" ("id", "status", "companyId", "createdAt", "updatedAt")
SELECT "id", "status", "companyId", "createdAt", "updatedAt" FROM "BusinessOrder";

-- Step 3: Add the new column businessPurchaseId to BusinessOrderCourseQuantity
ALTER TABLE "BusinessOrderCourseQuantity" ADD COLUMN "businessPurchaseId" TEXT;

-- Step 4: Update BusinessOrderCourseQuantity with corresponding businessPurchaseId
UPDATE "BusinessOrderCourseQuantity" boq
SET "businessPurchaseId" = (SELECT bp."id" FROM "BusinessPurchase" bp WHERE bp."id" = boq."businessOrderId");

-- Step 5: Drop the old foreign key and index
ALTER TABLE "BusinessOrderCourseQuantity" DROP CONSTRAINT "BusinessOrderCourseQuantity_businessOrderId_fkey";
DROP INDEX "BusinessOrderCourseQuantity_businessOrderId_businessCourseI_key";

-- Step 6: Drop the old column businessOrderId
ALTER TABLE "BusinessOrderCourseQuantity" DROP COLUMN "businessOrderId";

-- Step 7: Add constraints and indexes for businessPurchaseId
ALTER TABLE "BusinessOrderCourseQuantity" ALTER COLUMN "businessPurchaseId" SET NOT NULL;
ALTER TABLE "BusinessOrderCourseQuantity" ADD CONSTRAINT "BusinessOrderCourseQuantity_businessPurchaseId_fkey" FOREIGN KEY ("businessPurchaseId") REFERENCES "BusinessPurchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE UNIQUE INDEX "BusinessOrderCourseQuantity_businessPurchaseId_businessCour_key" ON "BusinessOrderCourseQuantity"("businessPurchaseId", "businessCourseId");

-- Step 8: Add foreign key to BusinessPurchase
ALTER TABLE "BusinessPurchase" ADD CONSTRAINT "BusinessPurchase_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 9: Drop the old BusinessOrder table
DROP TABLE "BusinessOrder";
