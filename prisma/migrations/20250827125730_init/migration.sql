-- DropForeignKey
ALTER TABLE "lastactivity" DROP CONSTRAINT "lastactivity_courseId_fkey";

-- DropForeignKey
ALTER TABLE "lastactivity" DROP CONSTRAINT "lastactivity_groupId_fkey";

-- DropForeignKey
ALTER TABLE "lastactivity" DROP CONSTRAINT "lastactivity_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "lessonbolim" DROP CONSTRAINT "lessonbolim_courseId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_bolimId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_courseId_fkey";

-- DropForeignKey
ALTER TABLE "mentorprofiles" DROP CONSTRAINT "mentorprofiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "rating" DROP CONSTRAINT "rating_userId_fkey";

-- AddForeignKey
ALTER TABLE "mentorprofiles" ADD CONSTRAINT "mentorprofiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastactivity" ADD CONSTRAINT "lastactivity_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastactivity" ADD CONSTRAINT "lastactivity_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "lessonbolim"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lastactivity" ADD CONSTRAINT "lastactivity_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonbolim" ADD CONSTRAINT "lessonbolim_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_bolimId_fkey" FOREIGN KEY ("bolimId") REFERENCES "lessonbolim"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
