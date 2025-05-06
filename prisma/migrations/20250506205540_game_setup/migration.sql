-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('Registered', 'Active', 'Eliminated', 'Completed');

-- CreateEnum
CREATE TYPE "TaskSubmissionType" AS ENUM ('TextAnswer', 'ImageUpload', 'SocialLink');

-- CreateEnum
CREATE TYPE "VoteOptionsType" AS ENUM ('W', 'L');

-- CreateEnum
CREATE TYPE "PredictionOutcome" AS ENUM ('Hit', 'Miss', 'TBD', 'NoAnswer');

-- CreateEnum
CREATE TYPE "SignalType" AS ENUM ('Volume', 'Mentions', 'Sentiment');

-- CreateEnum
CREATE TYPE "SignalTolerance" AS ENUM ('Low', 'Mid', 'High');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "link" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailRecord" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" SERIAL NOT NULL,
    "emailId" TEXT NOT NULL,
    "lastActive" TIMESTAMP(3) NOT NULL,
    "status" "SessionStatus" NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "eventId" TEXT NOT NULL,
    "configId" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameConfig" (
    "id" SERIAL NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "configId" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskConfig" (
    "id" SERIAL NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "submissionType" "TaskSubmissionType" NOT NULL,

    CONSTRAINT "TaskConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskSelection" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "TaskSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskResult" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "TaskResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskSubmission" (
    "userSessionId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "taskResultId" INTEGER NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskSubmission_pkey" PRIMARY KEY ("userSessionId","taskId","taskResultId")
);

-- CreateTable
CREATE TABLE "VoteContent" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "VoteContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoteItem" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "VoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoteSubmission" (
    "userSessionId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "vote" "VoteOptionsType" NOT NULL,

    CONSTRAINT "VoteSubmission_pkey" PRIMARY KEY ("userSessionId","itemId")
);

-- CreateTable
CREATE TABLE "PredictionRound" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "PredictionRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionConfig" (
    "id" SERIAL NOT NULL,
    "signal" "SignalType" NOT NULL,
    "difficulty" "SignalTolerance" NOT NULL,

    CONSTRAINT "PredictionConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionQuestion" (
    "id" SERIAL NOT NULL,
    "predictionConfigId" INTEGER NOT NULL,

    CONSTRAINT "PredictionQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PredictionResult" (
    "userSessionId" INTEGER NOT NULL,
    "outcome" "PredictionOutcome" NOT NULL,
    "roundId" INTEGER NOT NULL,

    CONSTRAINT "PredictionResult_pkey" PRIMARY KEY ("userSessionId","roundId")
);

-- CreateTable
CREATE TABLE "_EmailRecordToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EmailRecordToEvent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TaskToTaskSelection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TaskToTaskSelection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailRecord_address_key" ON "EmailRecord"("address");

-- CreateIndex
CREATE INDEX "_EmailRecordToEvent_B_index" ON "_EmailRecordToEvent"("B");

-- CreateIndex
CREATE INDEX "_TaskToTaskSelection_B_index" ON "_TaskToTaskSelection"("B");

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "EmailRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_configId_fkey" FOREIGN KEY ("configId") REFERENCES "GameConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_configId_fkey" FOREIGN KEY ("configId") REFERENCES "TaskConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSelection" ADD CONSTRAINT "TaskSelection_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskResult" ADD CONSTRAINT "TaskResult_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_userSessionId_fkey" FOREIGN KEY ("userSessionId") REFERENCES "UserSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskSubmission" ADD CONSTRAINT "TaskSubmission_taskResultId_fkey" FOREIGN KEY ("taskResultId") REFERENCES "TaskResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteItem" ADD CONSTRAINT "VoteItem_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "VoteContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteSubmission" ADD CONSTRAINT "VoteSubmission_userSessionId_fkey" FOREIGN KEY ("userSessionId") REFERENCES "UserSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteSubmission" ADD CONSTRAINT "VoteSubmission_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "VoteItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionRound" ADD CONSTRAINT "PredictionRound_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionQuestion" ADD CONSTRAINT "PredictionQuestion_predictionConfigId_fkey" FOREIGN KEY ("predictionConfigId") REFERENCES "PredictionConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionResult" ADD CONSTRAINT "PredictionResult_userSessionId_fkey" FOREIGN KEY ("userSessionId") REFERENCES "UserSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictionResult" ADD CONSTRAINT "PredictionResult_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "PredictionRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmailRecordToEvent" ADD CONSTRAINT "_EmailRecordToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "EmailRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmailRecordToEvent" ADD CONSTRAINT "_EmailRecordToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToTaskSelection" ADD CONSTRAINT "_TaskToTaskSelection_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToTaskSelection" ADD CONSTRAINT "_TaskToTaskSelection_B_fkey" FOREIGN KEY ("B") REFERENCES "TaskSelection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
