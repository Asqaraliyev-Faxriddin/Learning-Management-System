/*
  Warnings:

  - You are about to drop the column `cursecategoryId` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the `courseCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseCategoryId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_cursecategoryId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "cursecategoryId",
ADD COLUMN     "courseCategoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "courseCategory";

-- CreateTable
CREATE TABLE "CourseCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "CourseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
