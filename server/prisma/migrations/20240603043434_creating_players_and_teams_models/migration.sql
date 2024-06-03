-- CreateTable
CREATE TABLE "Player" (
    "player_id" SERIAL NOT NULL,
    "player_name" TEXT NOT NULL,
    "player_ppg" DECIMAL(4,1) NOT NULL,
    "player_rpg" DECIMAL(4,1) NOT NULL,
    "player_apg" DECIMAL(4,1) NOT NULL,
    "team_id" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "Team" (
    "team_id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("team_id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;
