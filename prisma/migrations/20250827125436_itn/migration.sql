/*
  Warnings:

  - You are about to drop the column `courseCategoryId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the `Cursecategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cursecategoryId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_courseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "mentorprofiles" DROP CONSTRAINT "mentorprofiles_userId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "courseCategoryId",
ADD COLUMN     "cursecategoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cursecategory";

-- CreateTable
CREATE TABLE "coursecategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coursecategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coursecategory_name_key" ON "coursecategory"("name");

-- AddForeignKey
ALTER TABLE "mentorprofiles" ADD CONSTRAINT "mentorprofiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_cursecategoryId_fkey" FOREIGN KEY ("cursecategoryId") REFERENCES "coursecategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
