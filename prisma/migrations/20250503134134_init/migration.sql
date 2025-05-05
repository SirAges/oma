/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `businessDescription` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoFile` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ninFile` to the `Kyc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "logoUrl",
ADD COLUMN     "businessDescription" TEXT NOT NULL,
ADD COLUMN     "logoFile" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Kyc" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "ninFile" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName";
