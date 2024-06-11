/*
  Warnings:

  - You are about to drop the column `player_apg` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `player_name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `player_ppg` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `player_rpg` on the `Player` table. All the data in the column will be lost.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `team_id` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `careerLength` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `draftTeam` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shootingHand` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conference_name` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_name` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_id_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "player_apg",
DROP COLUMN "player_name",
DROP COLUMN "player_ppg",
DROP COLUMN "player_rpg",
ADD COLUMN     "accolades" TEXT,
ADD COLUMN     "allStarCount" INTEGER,
ADD COLUMN     "careerLength" INTEGER NOT NULL,
ADD COLUMN     "championships" INTEGER,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "draftTeam" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "jerseyNumber" INTEGER[],
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL,
ADD COLUMN     "positions" TEXT[],
ADD COLUMN     "shootingHand" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
ALTER COLUMN "team_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
DROP COLUMN "team_id",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "conference_name" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "short_name" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Conference" (
    "conference_name" TEXT NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("conference_name")
);

-- CreateTable
CREATE TABLE "CareerStats" (
    "player_id" INTEGER NOT NULL,
    "gamesPlayed" INTEGER NOT NULL,
    "gamesStarted" INTEGER NOT NULL,
    "mpg" DOUBLE PRECISION NOT NULL,
    "fgm" INTEGER NOT NULL,
    "fga" INTEGER NOT NULL,
    "threePM" INTEGER NOT NULL,
    "threePA" INTEGER NOT NULL,
    "twoPM" INTEGER NOT NULL,
    "twoPA" INTEGER NOT NULL,
    "ftm" INTEGER NOT NULL,
    "fta" INTEGER NOT NULL,
    "orb" INTEGER NOT NULL,
    "drb" INTEGER NOT NULL,
    "trb" INTEGER NOT NULL,
    "ast" INTEGER NOT NULL,
    "stl" INTEGER NOT NULL,
    "bpg" DOUBLE PRECISION NOT NULL,
    "tnv" DOUBLE PRECISION NOT NULL,
    "fouls" INTEGER NOT NULL,
    "ppg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CareerStats_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "SeasonStats" (
    "season" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "gamesPlayed" INTEGER NOT NULL,
    "gamesStarted" INTEGER NOT NULL,
    "mpg" DOUBLE PRECISION NOT NULL,
    "fgm" INTEGER NOT NULL,
    "fga" INTEGER NOT NULL,
    "threePM" INTEGER NOT NULL,
    "threePA" INTEGER NOT NULL,
    "twoPM" INTEGER NOT NULL,
    "twoPA" INTEGER NOT NULL,
    "ftm" INTEGER NOT NULL,
    "fta" INTEGER NOT NULL,
    "orb" INTEGER NOT NULL,
    "drb" INTEGER NOT NULL,
    "trb" INTEGER NOT NULL,
    "ast" INTEGER NOT NULL,
    "stl" INTEGER NOT NULL,
    "bpg" DOUBLE PRECISION NOT NULL,
    "tnv" DOUBLE PRECISION NOT NULL,
    "fouls" INTEGER NOT NULL,
    "ppg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SeasonStats_pkey" PRIMARY KEY ("season")
);

-- CreateTable
CREATE TABLE "CareerAdvancedStats" (
    "player_id" INTEGER NOT NULL,
    "per" INTEGER NOT NULL,
    "tsPct" DOUBLE PRECISION NOT NULL,
    "fg3PerFgaPct" DOUBLE PRECISION NOT NULL,
    "ftr" DOUBLE PRECISION NOT NULL,
    "orbPct" DOUBLE PRECISION NOT NULL,
    "drbPct" DOUBLE PRECISION NOT NULL,
    "trbPct" DOUBLE PRECISION NOT NULL,
    "astPct" DOUBLE PRECISION NOT NULL,
    "stlPct" DOUBLE PRECISION NOT NULL,
    "blkPct" DOUBLE PRECISION NOT NULL,
    "tovPct" DOUBLE PRECISION NOT NULL,
    "usgPct" DOUBLE PRECISION NOT NULL,
    "ows" DOUBLE PRECISION NOT NULL,
    "dws" DOUBLE PRECISION NOT NULL,
    "ws" DOUBLE PRECISION NOT NULL,
    "wsPer48" DOUBLE PRECISION NOT NULL,
    "obpm" DOUBLE PRECISION NOT NULL,
    "dbpm" DOUBLE PRECISION NOT NULL,
    "bpm" DOUBLE PRECISION NOT NULL,
    "vorp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CareerAdvancedStats_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "SeasonAdvancedStats" (
    "season" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "per" INTEGER NOT NULL,
    "tsPct" DOUBLE PRECISION NOT NULL,
    "fg3PerFgaPct" DOUBLE PRECISION NOT NULL,
    "ftr" DOUBLE PRECISION NOT NULL,
    "orbPct" DOUBLE PRECISION NOT NULL,
    "drbPct" DOUBLE PRECISION NOT NULL,
    "trbPct" DOUBLE PRECISION NOT NULL,
    "astPct" DOUBLE PRECISION NOT NULL,
    "stlPct" DOUBLE PRECISION NOT NULL,
    "blkPct" DOUBLE PRECISION NOT NULL,
    "tovPct" DOUBLE PRECISION NOT NULL,
    "usgPct" DOUBLE PRECISION NOT NULL,
    "ows" DOUBLE PRECISION NOT NULL,
    "dws" DOUBLE PRECISION NOT NULL,
    "ws" DOUBLE PRECISION NOT NULL,
    "wsPer48" DOUBLE PRECISION NOT NULL,
    "obpm" DOUBLE PRECISION NOT NULL,
    "dbpm" DOUBLE PRECISION NOT NULL,
    "bpm" DOUBLE PRECISION NOT NULL,
    "vorp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SeasonAdvancedStats_pkey" PRIMARY KEY ("season")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_conference_name_fkey" FOREIGN KEY ("conference_name") REFERENCES "Conference"("conference_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerStats" ADD CONSTRAINT "CareerStats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonStats" ADD CONSTRAINT "SeasonStats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerAdvancedStats" ADD CONSTRAINT "CareerAdvancedStats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonAdvancedStats" ADD CONSTRAINT "SeasonAdvancedStats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;
