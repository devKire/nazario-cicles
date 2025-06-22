/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyKey]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotencyKey` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "idempotencyKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_idempotencyKey_key" ON "Appointment"("idempotencyKey");
