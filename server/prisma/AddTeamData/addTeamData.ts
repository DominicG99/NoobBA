import { fetchMostRecentSeason, fetchTeamPage, getTeamsActivePlayers } from '../../src/scraper/teamScraper/fetchTeamPage.js';
import teams from '../../src/scraper/teamScraper/teams.json'assert { type: 'json' };

for (let i = 0; i < teams.length; i++)
{
    const teamName = teams[i];
    console.log(teamName);
}


