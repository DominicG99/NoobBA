import cheerio from "cheerio";
import { fetchPlayerPage } from "./fetchPlayerPage.js";
import { fetchAllPlayers } from "./fetchAllPlayers.js";

let allPlayers = await fetchAllPlayers();
console.log(allPlayers.length);
async function getPlayer(playerName: string)
{

}