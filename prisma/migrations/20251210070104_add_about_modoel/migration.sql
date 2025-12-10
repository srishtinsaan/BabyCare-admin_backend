/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "AboutModel" (
    "id" SERIAL NOT NULL,
    "heading" TEXT,
    "subHeading" TEXT,
    "paragraph" TEXT,
    "rightImageUrl" TEXT,
    "bgImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutModel_pkey" PRIMARY KEY ("id")
);
