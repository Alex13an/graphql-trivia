/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Gender` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Gender_title_key` ON `Gender`(`title`);
