/*
  Warnings:

  - You are about to drop the column `ftPCT` on the `SeasonStats` table. All the data in the column will be lost.
  - You are about to drop the column `threePCT` on the `SeasonStats` table. All the data in the column will be lost.
  - You are about to drop the column `twoPCT` on the `SeasonStats` table. All the data in the column will be lost.
  - Added the required column `ftPct` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threePct` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoPct` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeasonStats" DROP COLUMN "ftPCT",
DROP COLUMN "threePCT",
DROP COLUMN "twoPCT",
ADD COLUMN     "ftPct" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "threePct" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "twoPct" DOUBLE PRECISION NOT NULL;
