import { getSeason } from "./getSeason.js";
import fs from 'fs';


async function getLast20Years()
{
    const wait = (t: number) => new Promise((resolve, reject) => setTimeout(resolve, t))

    let seasonArr = [];
    for (let i = 2004; i < 2025; i++)
    {
        let season = await getSeason(String(i));
        seasonArr.push(season);
        await wait(5000);
        console.log("getting season " + i);
    }
    await fs.writeFileSync('seasonData.json', JSON.stringify(seasonArr));
}

getLast20Years();



