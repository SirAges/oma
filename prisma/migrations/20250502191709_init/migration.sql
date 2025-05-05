/*
  Warnings:

  - You are about to drop the column `address` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `tel` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessName]` on the table `Business` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessAddress` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessCity` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessCountry` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessEmail` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessState` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessTel` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Business_name_key";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "state",
DROP COLUMN "tel",
ADD COLUMN     "businessAddress" TEXT NOT NULL,
ADD COLUMN     "businessCity" TEXT NOT NULL,
ADD COLUMN     "businessCountry" TEXT NOT NULL,
ADD COLUMN     "businessEmail" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessState" TEXT NOT NULL,
ADD COLUMN     "businessTel" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Business_businessName_key" ON "Business"("businessName");
