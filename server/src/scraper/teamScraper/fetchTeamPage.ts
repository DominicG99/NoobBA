import cheerio from "cheerio";

export async function fetchTeamPage(teamName: string) 
{
    const query = encodeURIComponent(teamName);
    const response = (await fetch(`https://www.basketball-reference.com/search/?&search=${query}`));
    const responseHTML = await response.text();
    let $ = cheerio.load(responseHTML);
    if ($('#meta h1').length > 0)
    {
        return responseHTML;
    }

    const firstResultHREF = $('#teams > .search-item').first().find('.search-item-url').text();
    const firstResult = await fetch(
        `https://www.basketball-reference.com/${firstResultHREF}`
    );
    const firstResultHTML = await firstResult.text();
    return firstResultHTML;
}

export async function fetchMostRecentSeason(teamPage: string)
{
    let $ = cheerio.load(teamPage);
    let pageHREF = $('#content > .table_wrapper').find('th').find('a').first().attr('href');
    const mostRecentSeasonPage = await fetch(`https://www.basketball-reference.com/${pageHREF}`);
    const mostRecentSeasonHTML = await mostRecentSeasonPage.text();
    return mostRecentSeasonHTML;
}

export async function getTeamsActivePlayers(mostRecentTeamPage: string) 
{
    let $ = cheerio.load(mostRecentTeamPage);
    let tableRows = $('#content >div#all_roster').find('tbody').find('td[data-stat="player"]');
    let activeTeamPlayers: string[] = [];
    tableRows.each(function (this: HTMLElement)
    {
        const player = $(this).text();
        activeTeamPlayers.push(player);
    });
    return activeTeamPlayers;
}
