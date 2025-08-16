/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blogapi"."Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- AlterTable
ALTER TABLE "blogapi"."Comment" DROP COLUMN "authorId",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "blogapi"."Comment" ADD CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "blogapi"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
