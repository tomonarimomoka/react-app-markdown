/*
  Warnings:

  - You are about to drop the column `createAt` on the `Markdata` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Markdata` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Markdata` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Markdata" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Markdata_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Markdata" ("accountId", "content", "id", "title") SELECT "accountId", "content", "id", "title" FROM "Markdata";
DROP TABLE "Markdata";
ALTER TABLE "new_Markdata" RENAME TO "Markdata";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "mail" TEXT,
    "age" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("age", "id", "mail", "name", "pass", "updatedAt") SELECT "age", "id", "mail", "name", "pass", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
