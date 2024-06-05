import { activePlayers } from './activePlayers.js';
import { getPlayer } from './getPlayer.js';
import fs from 'fs';

async function gatherPlayerInfos()
{
    let playerInfoArray: any = [];
    let timeoutOffset = 0;

    const wait = (t: number) => new Promise((resolve, reject) => setTimeout(resolve, t))

    for (let i = 0; i < activePlayers.length; i++)
    {
        let info = await getPlayer(activePlayers[i]);
        if (typeof info === 'string')
        {
            playerInfoArray.push(JSON.parse(info));
        }
        //await wait(5000);
        if (i === 0)
        {
            break;
        }
    }

    await fs.writeFileSync('playerData.json', JSON.stringify(playerInfoArray));
}


gatherPlayerInfos();