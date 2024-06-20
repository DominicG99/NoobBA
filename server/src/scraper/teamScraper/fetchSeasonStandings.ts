import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';

interface TeamStanding {
    conference: string;
    team: string;
    wins: number;
    losses: number;
    winLossPct: number;
    gb: number;
    psG: number;
    paG: number;
    srs: number;
    seed: number;
    madePlayoffs: boolean;
}

async function fetchStandings(year: number): Promise<string> {
    const url = `https://www.basketball-reference.com/leagues/NBA_${year}_standings.html`;
    const { data } = await axios.get(url);
    return data;
}

function parseStandings(html: string): TeamStanding[] {
    const $ = cheerio.load(html);
    const standings: TeamStanding[] = [];
    const conferenceNames = ['Eastern Conference', 'Western Conference'];
    const conferenceIds = ['E', 'W'];

    conferenceNames.forEach((conference, index) => {
        const conferenceTable = $(`table#confs_standings_${conferenceIds[index]}`);
        conferenceTable.find('tbody > tr').each((i, element) => {
            const teamElement = $(element).find('th[data-stat="team_name"] a');
            if (teamElement.length === 0) return; // Skip empty rows

            const team = teamElement.text().trim();
            const seed = parseInt($(element).find('th[data-stat="team_name"]').text().match(/\((\d+)\)/)?.[1] ?? '0');
            const madePlayoffs = $(element).find('th[data-stat="team_name"]').text().includes('*');
            
            const wins = parseInt($(element).find('[data-stat="wins"]').text().trim());
            const losses = parseInt($(element).find('[data-stat="losses"]').text().trim());
            const winLossPct = parseFloat($(element).find('[data-stat="win_loss_pct"]').text().trim());
            const gb = parseFloat($(element).find('[data-stat="gb"]').text().trim() || '0');
            const psG = parseFloat($(element).find('[data-stat="pts_per_g"]').text().trim());
            const paG = parseFloat($(element).find('[data-stat="opp_pts_per_g"]').text().trim());
            const srs = parseFloat($(element).find('[data-stat="srs"]').text().trim());

            standings.push({
                conference,
                team,
                wins,
                losses,
                winLossPct,
                gb,
                psG,
                paG,
                srs,
                seed,
                madePlayoffs,
            });
        });
    });
    return standings;
}

async function getSeasonStandings(startYear: number, endYear: number): Promise<void> {
    const allStandings: { [season: string]: TeamStanding[] } = {};

    for (let year = startYear; year >= endYear; year--) {
        const html = await fetchStandings(year);
        const standings = parseStandings(html);
        const seasonString = `${year - 1}-${year.toString().slice(2)}`;
        allStandings[seasonString] = standings;

        // Wait for 5 seconds to avoid getting banned
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    // Save the standings to a JSON file
    fs.writeFileSync('standings.json', JSON.stringify(allStandings, null, 2));
}

// Fetch standings for the past 21 seasons
getSeasonStandings(2024, 2004);
