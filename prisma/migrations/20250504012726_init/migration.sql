/*
  Warnings:

  - You are about to drop the column `certificateUrl` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "certificateUrl",
ADD COLUMN     "certificateFile" JSONB;
