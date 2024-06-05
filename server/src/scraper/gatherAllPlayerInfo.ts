import { activePlayers } from './activePlayers.js';
import { getPlayer } from './getPlayer.js';
import fs from 'fs';

async function gatherFivePlayerInfos()
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
        await wait(10000);
        if (i === 1)
        {
            break;
        }
    }

    await fs.writeFileSync('playerData.json', JSON.stringify(playerInfoArray));
}


gatherFivePlayerInfos();