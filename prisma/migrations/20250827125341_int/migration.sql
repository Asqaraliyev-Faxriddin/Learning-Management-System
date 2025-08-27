/*
  Warnings:

  - You are about to drop the `CourseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_courseCategoryId_fkey";

-- DropTable
DROP TABLE "CourseCategory";

-- CreateTable
CREATE TABLE "Cursecategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cursecategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "Cursecategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
