/*
  Warnings:

  - You are about to drop the `stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_product_id_fkey";

-- DropTable
DROP TABLE "stocks";

-- CreateTable
CREATE TABLE "stock" (
    "product_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_product_id_key" ON "stock"("product_id");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
