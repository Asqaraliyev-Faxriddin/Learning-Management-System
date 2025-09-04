/*
  Warnings:

  - You are about to drop the column `ip` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "ip" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "ip";
