/*
  Warnings:

  - The primary key for the `SeasonAdvancedStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `season` on the `SeasonAdvancedStats` table. All the data in the column will be lost.
  - The primary key for the `SeasonStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `season` on the `SeasonStats` table. All the data in the column will be lost.
  - Added the required column `season_id` to the `SeasonAdvancedStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fgPct` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ftPCT` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `season_id` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threePCT` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoPCT` to the `SeasonStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeasonAdvancedStats" DROP CONSTRAINT "SeasonAdvancedStats_pkey",
DROP COLUMN "season",
ADD COLUMN     "season_id" TEXT NOT NULL,
ADD CONSTRAINT "SeasonAdvancedStats_pkey" PRIMARY KEY ("season_id", "player_id");

-- AlterTable
ALTER TABLE "SeasonStats" DROP CONSTRAINT "SeasonStats_pkey",
DROP COLUMN "season",
ADD COLUMN     "fgPct" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ftPCT" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "season_id" TEXT NOT NULL,
ADD COLUMN     "threePCT" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "twoPCT" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "fgm" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fga" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "threePM" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "threePA" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "twoPM" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "twoPA" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ftm" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fta" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "orb" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "drb" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "trb" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "ast" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "stl" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fouls" SET DATA TYPE DOUBLE PRECISION,
ADD CONSTRAINT "SeasonStats_pkey" PRIMARY KEY ("season_id", "player_id");

-- CreateTable
CREATE TABLE "Season" (
    "season" TEXT NOT NULL,
    "mvp" TEXT NOT NULL,
    "dpoy" TEXT NOT NULL,
    "roy" TEXT NOT NULL,
    "mip" TEXT NOT NULL,
    "smoy" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("season")
);

-- AddForeignKey
ALTER TABLE "SeasonStats" ADD CONSTRAINT "SeasonStats_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("season") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonAdvancedStats" ADD CONSTRAINT "SeasonAdvancedStats_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("season") ON DELETE RESTRICT ON UPDATE CASCADE;
