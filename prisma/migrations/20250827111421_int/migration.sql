/*
  Warnings:

  - You are about to drop the `coursecategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_cursecategoryId_fkey";

-- DropForeignKey
ALTER TABLE "mentorprofiles" DROP CONSTRAINT "mentorprofiles_userId_fkey";

-- DropTable
DROP TABLE "coursecategory";

-- CreateTable
CREATE TABLE "Cursecategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cursecategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mentorprofiles" ADD CONSTRAINT "mentorprofiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_cursecategoryId_fkey" FOREIGN KEY ("cursecategoryId") REFERENCES "Cursecategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
