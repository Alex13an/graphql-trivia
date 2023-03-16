/*
  Warnings:

  - You are about to drop the column `genderId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_genderId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `genderId`,
    ADD COLUMN `gender_id` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
