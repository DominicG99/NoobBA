import allSeasonData from '../../src/scraper/seasonScraper/seasonData.json' assert { type: 'json' };
import { PrismaClient, Prisma, SeasonStats, SeasonAdvancedStats } from '@prisma/client'
const prisma = new PrismaClient();

let numSeasons = Object.keys(allSeasonData).length;
for (let i = 0; i < numSeasons; i++)
{
    const seasonID: string = allSeasonData[i].seasonID;
    const mvp: string = allSeasonData[i].mvp;
    const roy: string = allSeasonData[i].roy;
    const dpoy: string = allSeasonData[i].dpoy;
    const mip: string = allSeasonData[i].mip;
    const smoy: string = allSeasonData[i].smoy;
    let seasonExistsAlready = false;
    const season = await prisma.season.findFirst({
        where: {
            season: seasonID
        }
    });
    if (season != null)
    {
        seasonExistsAlready = true;
    }

    if (seasonExistsAlready === false)
    {
        try
        {
            await prisma.season.create({
                data: {
                    season: seasonID,
                    mvp: mvp,
                    dpoy: dpoy,
                    roy: roy,
                    mip: mip,
                    smoy: smoy
                }
            });
            console.log("Successfully Created: " + seasonID);
        }
        catch (error)
        {
            console.error("Couldn't create new season", error);
        }
    }
}