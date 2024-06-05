import cheerio from "cheerio";
import fs from 'fs';
export async function fetchAllPlayers(): Promise<string[]>
{
    let alphabet: string[] = ["q", "r", "s", "t", "u", "v", "w", "y", "z"];//["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", 

    let baseURI: string = "https://www.basketball-reference.com/players/";
    let allPlayers = [];
    for (let i = 0; i < alphabet.length; i++)
    {
        const resp = await fetch(baseURI + alphabet[i]);
        const respHTML = await resp.text();
        let $ = cheerio.load(respHTML);
        let inActivePlayerNames = $('th > a');
        let activePlayerNames = $('th > strong > a');
        for (let j = 0; j < inActivePlayerNames.length; j++)
        {
            let name = $(inActivePlayerNames[j]).text();
            allPlayers.push(name);
        }
        for (let j = 0; j < activePlayerNames.length; j++)
        {
            let name = $(activePlayerNames[j]).text();
            allPlayers.push(name);
        }
    }
    //await fs.writeFileSync('allPlayers.json', JSON.stringify(allPlayers));
    return allPlayers;
}

fetchAllPlayers();