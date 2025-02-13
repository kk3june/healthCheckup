/*
  Warnings:

  - You are about to drop the column `medicalCenter` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `admin_id` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the column `medicalCenter` on the `TestResult` table. All the data in the column will be lost.
  - You are about to drop the column `residentNumber` on the `TestResult` table. All the data in the column will be lost.
  - You are about to alter the column `chartNumber` on the `TestResult` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `medicalCenterId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TestResult` table without a default value. This is not possible if the table is not empty.
  - Made the column `chartNumber` on table `TestResult` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "MedicalCenter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medicalCenterIdNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medicalCenterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "residentNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_medicalCenterId_fkey" FOREIGN KEY ("medicalCenterId") REFERENCES "MedicalCenter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "medicalCenterId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Admin_medicalCenterId_fkey" FOREIGN KEY ("medicalCenterId") REFERENCES "MedicalCenter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Admin" ("createdAt", "id", "password", "username") SELECT "createdAt", "id", "password", "username" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
CREATE TABLE "new_TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "specimenNumber" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "chartNumber" INTEGER NOT NULL,
    "receptionDate" DATETIME NOT NULL,
    "receptionNumber" TEXT NOT NULL,
    "testCode" TEXT NOT NULL,
    "hospitalTestCode" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "textResult" TEXT,
    "sentenceResult" TEXT,
    "highLow" TEXT,
    "remark" TEXT,
    "referenceRange" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TestResult" ("age", "chartNumber", "createdAt", "gender", "highLow", "hospitalTestCode", "id", "receptionDate", "receptionNumber", "recipientName", "referenceRange", "remark", "sentenceResult", "specimenNumber", "testCode", "testName", "textResult") SELECT "age", "chartNumber", "createdAt", "gender", "highLow", "hospitalTestCode", "id", "receptionDate", "receptionNumber", "recipientName", "referenceRange", "remark", "sentenceResult", "specimenNumber", "testCode", "testName", "textResult" FROM "TestResult";
DROP TABLE "TestResult";
ALTER TABLE "new_TestResult" RENAME TO "TestResult";
CREATE UNIQUE INDEX "TestResult_specimenNumber_key" ON "TestResult"("specimenNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "MedicalCenter_medicalCenterIdNumber_key" ON "MedicalCenter"("medicalCenterIdNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_residentNumber_key" ON "User"("residentNumber");
