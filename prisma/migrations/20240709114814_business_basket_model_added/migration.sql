-- CreateTable
CREATE TABLE "BusinessBasket" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessBasket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessBasket_companyId_key" ON "BusinessBasket"("companyId");

-- AddForeignKey
ALTER TABLE "BusinessBasket" ADD CONSTRAINT "BusinessBasket_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
