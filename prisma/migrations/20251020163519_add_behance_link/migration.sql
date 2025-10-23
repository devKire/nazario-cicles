/*
  Warnings:

  - You are about to drop the column `linkedinLink` on the `ContactInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactInfo" DROP COLUMN "linkedinLink",
ADD COLUMN     "behanceLink" TEXT;
