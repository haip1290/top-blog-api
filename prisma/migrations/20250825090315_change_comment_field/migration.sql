/*
  Warnings:

  - You are about to drop the column `userID` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blogapi"."Comment" DROP CONSTRAINT "Comment_userID_fkey";

-- AlterTable
ALTER TABLE "blogapi"."Comment" DROP COLUMN "userID",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "blogapi"."Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "blogapi"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
