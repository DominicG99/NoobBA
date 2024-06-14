import cheerio from "cheerio";
import { get } from "http";
import fs from 'fs';

export async function getTeams()
{
    const link = "https://www.basketball-reference.com/teams/";
    const response = await fetch(link);
    const responseHTML = await response.text();
    let $ = cheerio.load(responseHTML);
    const tableRows = $('#content > div#all_teams_active #teams_active').find('tr').find('th').find('a');
    let activeTeams: string[] = []
    tableRows.each(function (this: HTMLElement)
    {
        const teamName = $(this).text();
        activeTeams.push(teamName);
    });
    await fs.writeFileSync('teams.json', JSON.stringify(activeTeams));
}

getTeams();