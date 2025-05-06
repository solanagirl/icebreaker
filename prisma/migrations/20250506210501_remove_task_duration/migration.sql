/*
  Warnings:

  - You are about to drop the column `duration` on the `TaskConfig` table. All the data in the column will be lost.
  - Changed the type of `duration` on the `GameConfig` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GameConfig" DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TaskConfig" DROP COLUMN "duration";
