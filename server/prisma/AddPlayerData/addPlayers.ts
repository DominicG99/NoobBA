import allPlayerData from '../../src/scraper/playerData.json' assert { type: 'json' };
import { PrismaClient, Prisma, SeasonStats, SeasonAdvancedStats } from '@prisma/client'

interface PlayerSeasonStats
{
    seasonID: string,
    age: number,
    playerID: number,
    gamesPlayed: number,
    gamesStarted: number,
    mpg: number,
    fgm: number,
    fga: number,
    fgPct: number,
    threePM: number,
    threePA: number,
    threePct: number,
    twoPM: number,
    twoPA: number,
    twoPct: number,
    ftm: number,
    fta: number,
    ftPct: number,
    orb: number,
    drb: number,
    trb: number,
    ast: number,
    stl: number,
    bpg: number,
    tnv: number,
    fouls: number,
    ppg: number
}


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

    //Check if player exists already
    const player = await prisma.player.findFirst({
        where: {
            first_name: firstName,
            last_name: lastName,
            college: college
        },
    });
    if (player != null)
    {
        playerExistsAlready = true;
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


    //Create season stats
    if (player?.player_id !== undefined)
    {
        let playerID: number = player?.player_id;
        let playerSeasonStats: PlayerSeasonStats[] = getAllSeasonStats(allPlayerData[i].stats, playerID);
        for (let i = 0; i < playerSeasonStats.length; i++)
        {
            if (playerSeasonStats[i].seasonID != undefined)
            {
                let seasonID: string = await findSeasonID(playerSeasonStats[i].seasonID);
                const seasonStats = await prisma.seasonStats.findFirst({
                    where: {
                        player_id: player.player_id,
                        season_id: playerSeasonStats[i].seasonID,
                    },
                });
                if (seasonStats == null)
                {
                    try
                    {
                        await prisma.seasonStats.create({
                            data: {
                                season_id: seasonID,
                                age: playerSeasonStats[i].age,
                                player_id: playerID,
                                gamesPlayed: playerSeasonStats[i].gamesPlayed,
                                gamesStarted: playerSeasonStats[i].gamesStarted,
                                mpg: playerSeasonStats[i].mpg,
                                fgm: playerSeasonStats[i].fgm,
                                fga: playerSeasonStats[i].fga,
                                fgPct: playerSeasonStats[i].fgPct,
                                threePM: playerSeasonStats[i].threePM,
                                threePA: playerSeasonStats[i].threePA,
                                threePct: playerSeasonStats[i].threePct,
                                twoPM: playerSeasonStats[i].twoPM,
                                twoPA: playerSeasonStats[i].twoPA,
                                twoPct: playerSeasonStats[i].twoPct,
                                ftm: playerSeasonStats[i].ftm,
                                fta: playerSeasonStats[i].fta,
                                ftPct: playerSeasonStats[i].ftPct,
                                orb: playerSeasonStats[i].orb,
                                drb: playerSeasonStats[i].drb,
                                trb: playerSeasonStats[i].trb,
                                ast: playerSeasonStats[i].ast,
                                stl: playerSeasonStats[i].stl,
                                bpg: playerSeasonStats[i].bpg,
                                tnv: playerSeasonStats[i].tnv,
                                fouls: playerSeasonStats[i].fouls,
                                ppg: playerSeasonStats[i].ppg,
                            }
                        });
                        console.log("Successfully created " + seasonID + " for " + firstName + " " + lastName);
                    }
                    catch (error)
                    {
                        console.error("Couldn't create season stats for player " + player.first_name + " " + player.last_name, error);

                    }
                }
                else
                {
                    console.log("Skipping");
                }
            }
        }
    }
}

function getAllSeasonStats(stats: object, playerID: number): PlayerSeasonStats[]
{
    const numSeasons = Object.keys(stats).length;
    let seasonStats: PlayerSeasonStats[] = [];

    for (const [season, statValues] of Object.entries(stats))
    {
        if (season != "career")
        {
            const obj = {
                seasonID: season,
                age: statValues.age,
                playerID: playerID,
                gamesPlayed: statValues.games,
                gamesStarted: statValues.games_started,
                mpg: statValues.mpg,
                fgm: statValues.fg,
                fga: statValues.fga,
                fgPct: statValues.fg_pct,
                threePM: statValues["3p"],
                threePA: statValues["3pa"],
                threePct: statValues["3p_pct"],
                twoPM: statValues["2p"],
                twoPA: statValues["2pa"],
                twoPct: statValues["2p_pct"],
                ftm: statValues.ft,
                fta: statValues.fta,
                ftPct: statValues.ft_pct,
                orb: statValues.orb,
                drb: statValues.drb,
                trb: statValues.trb,
                ast: statValues.ast,
                stl: statValues.stl,
                bpg: statValues.bpg,
                tnv: statValues.tpg,
                fouls: statValues.pf,
                ppg: statValues.ppg,
            }
            seasonStats.push(obj);
        }
    }
    return seasonStats;
}

async function findSeasonID(seasonID: string | undefined): Promise<string>
{
    try
    {
        const season = await prisma.season.findFirst({
            where: {
                season: seasonID
            },
        });
        if (season != null)
        {
            return season.season;
        }
        else
        {
            return "";
        }
    }
    catch (error)
    {
        console.error("Could not find season", error);
        return "";
    }
}