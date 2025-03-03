-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "admin_id" TEXT NOT NULL,
    "admin_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "medicalcenter_name" TEXT NOT NULL,
    "medicalcenter_number" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Admin" ("admin_id", "admin_name", "createdAt", "id", "medicalcenter_name", "medicalcenter_number", "password") SELECT "admin_id", "admin_name", "createdAt", "id", "medicalcenter_name", "medicalcenter_number", "password" FROM "Admin";
DROP TABLE "Admin";
ALTER TABLE "new_Admin" RENAME TO "Admin";
CREATE UNIQUE INDEX "Admin_admin_id_key" ON "Admin"("admin_id");
CREATE UNIQUE INDEX "Admin_medicalcenter_number_key" ON "Admin"("medicalcenter_number");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medicalcenter_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "residentNumber" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("age", "createdAt", "gender", "id", "medicalcenter_number", "name", "residentNumber") SELECT "age", "createdAt", "gender", "id", "medicalcenter_number", "name", "residentNumber" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_medicalcenter_number_key" ON "User"("medicalcenter_number");
CREATE UNIQUE INDEX "User_residentNumber_key" ON "User"("residentNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
