import cheerio from "cheerio";
import { fetchPlayerPage } from "./fetchPlayerPage.js";
import { allPlayers } from './players.js';

async function getPlayer(playerName: string)
{
    try
    {
        const firstResultHTML = await fetchPlayerPage(playerName);
        let $ = cheerio.load(firstResultHTML);
        const name = $('#meta h1').text().trim();

        if (name.length <= 0)
        {
            throw new Error(
                'Search query provided no players.'
            );
        }

        // Now fetch bio info
        let playerInfoContainer = $('#meta div:nth-child(2)');
        if ($('#meta > .nothumb').length > 0)
        {
            // User has no thumbnail, the player info is in a different place.
            playerInfoContainer = $('#meta > .nothumb');
        }
        const nicknames = [];
        let draftPick = -1;
        let draftYear = -1;
        let draftTeam = '';
        const positions = [];
        let shootingHand = '';
        let college = '';
        let birthplace = '';
        let birthdate = '';
        let debut = '';
        let height = '';
        let weight = -1;
        let careerLength = -1;
        const playerInfoElements = playerInfoContainer.find('p');
    }
    catch (err)
    {
        console.error("Failed to fetch BBREF player's page", err);
    }
}