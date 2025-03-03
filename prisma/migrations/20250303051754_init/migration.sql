-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "admin_id" TEXT NOT NULL,
    "admin_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "medicalcenter_name" TEXT NOT NULL,
    "medicalcenter_number" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medicalcenter_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "residentNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "specimen_number" TEXT NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "chartNumber" INTEGER NOT NULL,
    "reception_date" DATETIME NOT NULL,
    "reception_number" TEXT NOT NULL,
    "testCode" TEXT NOT NULL,
    "hospital_testcode" TEXT NOT NULL,
    "test_name" TEXT NOT NULL,
    "text_result" TEXT,
    "sentence_result" TEXT,
    "highLow" TEXT,
    "remark" TEXT,
    "reference_range" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "TestResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_id_key" ON "Admin"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_medicalcenter_number_key" ON "Admin"("medicalcenter_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_medicalcenter_number_key" ON "User"("medicalcenter_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_residentNumber_key" ON "User"("residentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TestResult_specimen_number_key" ON "TestResult"("specimen_number");
