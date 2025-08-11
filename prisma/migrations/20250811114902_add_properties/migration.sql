-- AlterTable
ALTER TABLE "blogapi"."Comment" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "blogapi"."Post" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "blogapi"."User" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
