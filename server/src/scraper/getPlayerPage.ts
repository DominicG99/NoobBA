import cheerio from "cheerio";

async function getPlayerPage(playerName: string) 
{
    const query = encodeURIComponent(playerName);
    
    const resp = await fetch(
        `https://www.basketball-reference.com/search/?&search=${query}`
    );

    const respHTML = await resp.text();

    let $ = cheerio.load(respHTML);
    

}

getPlayerPage("Lebron James");