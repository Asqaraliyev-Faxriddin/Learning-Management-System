/*
  Warnings:

  - You are about to drop the `Cursecategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_cursecategoryId_fkey";

-- DropTable
DROP TABLE "Cursecategory";

-- CreateTable
CREATE TABLE "courseCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "courseCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_cursecategoryId_fkey" FOREIGN KEY ("cursecategoryId") REFERENCES "courseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
