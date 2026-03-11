-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_studentId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `studentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
