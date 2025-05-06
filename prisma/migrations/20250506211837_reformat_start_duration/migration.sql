/*
  Warnings:

  - You are about to drop the column `configId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `GameConfig` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_configId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "configId",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 3600;

-- AlterTable
ALTER TABLE "UserSession" ALTER COLUMN "status" SET DEFAULT 'Registered';

-- DropTable
DROP TABLE "GameConfig";
