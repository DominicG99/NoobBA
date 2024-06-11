import allPlayerData from '../../src/scraper/playerData.json' assert { type: 'json' };
import { PrismaClient, Prisma, SeasonStats, SeasonAdvancedStats } from '@prisma/client'

const prisma = new PrismaClient()

let numPlayers = Object.keys(allPlayerData).length;

for (let i = 0; i < numPlayers; i++)
{
    const fullName = allPlayerData[i].name.split(" ");
    const firstName: string = fullName[0];
    const lastName: string = fullName[1];
    const college: string | "" = allPlayerData[i].college;
    const jerseyNumbers = allPlayerData[i].jerseyNumbers;
    const height = allPlayerData[i].height;
    const weight = allPlayerData[i].weight;
    const picture = allPlayerData[i].picture;
    const shootingHand: string = allPlayerData[i].shootingHand;
    const careerLength = allPlayerData[i].careerLength;
    const draftPick = allPlayerData[i].draftPick;
    const draftYear = allPlayerData[i].draftYear;
    const draftTeam = allPlayerData[i].draftTeam;
    const positions = allPlayerData[i].positions;
    const allStarCount = allPlayerData[i].allStars;
    const numChampionships: number = allPlayerData[i].championships;
    const accolades: string[] = allPlayerData[i].accolades;
    const seasonStats: SeasonStats[] = [];//allPlayerData[i].stats;
    const advancedSeasonStats: SeasonAdvancedStats[] = [];
    let playerExistsAlready = false;
    try
    {
        const player = await prisma.player.findFirst({
            where: {
                first_name: firstName,
                last_name: lastName,
                college: college
            },
        });
        playerExistsAlready = true;
    }
    catch (error)
    {
        console.error("Player not found", error);
    }
    if (playerExistsAlready === false)
    {
        try
        {
            await prisma.player.create({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    college: college,
                    jerseyNumber: { set: jerseyNumbers },
                    height: height,
                    weight: weight,
                    shootingHand: shootingHand,
                    careerLength: careerLength,
                    draftTeam: draftTeam,
                    positions: { set: positions },
                    allStarCount: allStarCount,
                    championships: numChampionships,
                    picture: picture,
                    seasonStats: { create: seasonStats },
                    advancedSeasonStats: { create: advancedSeasonStats },
                }
            });
            console.log("Successfully Created: " + firstName + " " + lastName);
        } catch (error)
        {
            console.error("Couldn't create new player", error);
        }
    }

}

// function getAllSeasonStats(stats)
// {
//     const numSeasons = Object.keys(stats).length;
//     let seasonStats = [];
//     for (let i = 0; i < numSeasons; i++)
//     {
//         //We have to find the playerID for stats...

//     }
//     return seasonStats;
// }
