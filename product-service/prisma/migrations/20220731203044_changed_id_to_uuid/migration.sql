/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `product_id` on the `stock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_product_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "stock" DROP COLUMN "product_id",
ADD COLUMN     "product_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stock_product_id_key" ON "stock"("product_id");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
