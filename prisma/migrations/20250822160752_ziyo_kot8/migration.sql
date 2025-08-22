/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `coursecategory` will be added. If there are existing duplicate values, this will fail.
  - Made the column `updatedAt` on table `homeworks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `homeworksubmissions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `readAt` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `questionsanswer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "homeworks" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "homeworksubmissions" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "readAt" SET NOT NULL,
ALTER COLUMN "readAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "questionsanswer" ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "transaction" TEXT NOT NULL,
    "state" INTEGER NOT NULL,
    "pid" TEXT NOT NULL,
    "reason" INTEGER,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "performTime" TIMESTAMP(3),
    "cancelTime" TIMESTAMP(3),
    "amount" DECIMAL(65,30) NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transaction_key" ON "Transaction"("transaction");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_pid_key" ON "Transaction"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "coursecategory_name_key" ON "coursecategory"("name");
