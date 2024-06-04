import cheerio from "cheerio";

export async function fetchPlayerPage(playerName: string): Promise<string> 
{
    const query = encodeURIComponent(playerName);

    const response = (await fetch(`https://www.basketball-reference.com/search/?&search=${query}`));
    const responseHTML = await response.text();
    let $ = cheerio.load(responseHTML);
    if ($('#meta h1').length > 0)
    {
        return responseHTML;
    }

    const firstResultHREF = $('#players > .search-item')
        .first()
        .find('.search-item-url')
        .text();

    const firstResult = await fetch(
        `https://www.basketball-reference.com/${firstResultHREF}`
    );
    const firstResultHTML = await firstResult.text();
    return firstResultHTML;
}

