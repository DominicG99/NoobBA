import cheerio from "cheerio";

export async function fetchPlayerPage(season: string): Promise<object> 
{
    const linkPrefix: string = "https://www.basketball-reference.com/leagues/NBA_";
    const linkEnding: string = ".html";
    const link: string = linkPrefix + season + linkEnding;
    const response = (await fetch(link));
    const responseHTML = await response.text();
    let $ = cheerio.load(responseHTML);
    const seasonID: string = $('#info h1 span').first().text();
    const divHTML = await $('#content > div#all_all_awards');
    let contents = divHTML.contents();
    //MVP, ROY, DPOY, MIP, 6MOY
    let awardArray: string[] = [];
    contents.each((index, element) =>
    {
        //Loads as a comment as first for some reason...
        if (element.type === 'comment')
        {
            if (element.data)
            {
                const $element = cheerio.load(element.data, { xmlMode: true });
                const tableRows = $element('div.table_container > table').find('tr');
                tableRows.each((index, rowElement) =>
                {
                    const secondCell = $element(rowElement).find('td').eq(1);
                    awardArray.push(secondCell.text());
                });
            }
        }
    });

    let outputObject = {
        seasonID: seasonID,
        mvp: awardArray[1],
        roy: awardArray[2],
        dpoy: awardArray[3],
        mip: awardArray[4],
        smoy: awardArray[5]
    }

    return outputObject;
}

console.log(await fetchPlayerPage("2010"));