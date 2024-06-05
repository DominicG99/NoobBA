import cheerio from "cheerio";
import { fetchPlayerPage } from "./fetchPlayerPage.js";
import { grabPlayerSats } from "./grabPlayerStats.js";
import { grabCareerStats } from "./grabCareerStats.js";
import { grabAdvancedStats } from "./grabAdvancedStats.js";
import { grabCareerAdvancedStats } from "./grabCareerAdvancedStats.js";

export async function getPlayer(playerName: string)
{
    try
    {
        const firstResultHTML = await fetchPlayerPage(playerName);
        let $ = cheerio.load(firstResultHTML);
        const name = $('#meta h1').text().trim();

        if (name.length <= 0)
        {
            throw new Error(
                'Search query provided no players.'
            );
        }

        // Grab the player's accolades
        const accolades: string[] = [];
        let championships = 0;
        let mvps = 0;
        let allStars = 0;
        const accoladeList = $('#bling > li');

        accoladeList.each((index, accolade) =>
        {
            const accoladeElement = $(accolade);
            const accoladeText: string | null = $(accolade).text();

            if (/NBA Champ$/.test(accoladeText))
            {
                // If it doesn't have an x in it, it's 1 time
                if (!/x/.test(accoladeText))
                {
                    championships = 1;
                } else
                {
                    championships = parseInt(accoladeText.match(/^\d+/)![0]);
                }
            } else if (/^\d{4}-\d{2} MVP$|^\d+x MVP$/.test(accoladeText))
            {
                // This RegExonly matches MVPs. Not WCF MVPs or ASG or anything
                // And here the logic is very similar to the championships
                if (!/x/.test(accoladeText))
                {
                    mvps = 1;
                } else
                {
                    mvps = parseInt(accoladeText.match(/^\d+/)![0]);
                }
            } else if (/^\d+x All Star$/.test(accoladeText))
            {
                // Here they will all have x's, so just get the leading number
                const regexResult: RegExpMatchArray | null = accoladeText.match(/^\d+/);
                if (regexResult != null)
                {
                    allStars = parseInt(regexResult[0]);
                }
            }
            accolades.push(accoladeElement.text());
        });

        // Now fetch bio info
        let playerInfoContainer = $('#meta div:nth-child(2)');
        if ($('#meta > .nothumb').length > 0)
        {
            // User has no thumbnail, the player info is in a different place.
            playerInfoContainer = $('#meta > .nothumb');
        }
        const nicknames: string[] = [];
        let draftPick = -1;
        let draftYear = -1;
        let draftTeam = '';
        const positions: string[] | null = [];
        let shootingHand = '';
        let college = '';
        let birthplace = '';
        let birthdate: any;
        let debut: any;
        let height = '';
        let weight = -1;
        let careerLength = -1;
        const playerInfoElements = playerInfoContainer.find('p');
        playerInfoElements.each((index, element) =>
        {
            const elementData = $(element);
            const elementText = $(element).text().trim();
            if (/^\(.*\)$/.test(elementText))
            {
                // Nickname check
                const nicknameList = elementText;
                const nicknameArr = nicknameList.replace(/[()\n]/g, '').split(',');
                for (let i = 0; i < nicknameArr.length; i++)
                {
                    nicknames.push(nicknameArr[i].trim());
                }
            }
            else if (/^Draft/.test(elementText))
            {
                // Draft check
                // This returns the number occurences in the draft string
                draftPick = parseInt(elementText.match(/\d+/g)![2]);
                draftYear = parseInt(elementText.match(/\d+/g)![3]);
                draftTeam = elementData.find('a:nth-child(2)').text().trim();
            }
            else if (/^Position/.test(elementText))
            {
                // Position and handedness check
                positions.push(...elementText.match(/Guard|Center|Forward|Small Forward|Point Guard|Shooting Guard|Power Forward/g)!);
                shootingHand = elementText.match(/Right|Left/g)![0];
            }
            else if (/^College/.test(elementText))
            {
                // College check
                college = elementText.slice(9).trim();
            }
            else if (/^Born/.test(elementText))
            {
                // Born info check
                birthplace = elementData
                    .find('span:nth-child(3)')
                    .text()
                    .trim()
                    .slice(3);
                birthdate = new Date(elementData.find('span:nth-child(2)').text().trim());
            }
            else if (/^NBA Debut/.test(elementText))
            {
                debut = new Date(elementText.slice(11).trim());
            }
            else if (/kg\)$/.test(elementText))
            {
                // Height and weight check
                height = elementText.match(/\d-\d+/)![0];
                weight = parseInt(elementText.match(/\d+/g)![2]);
            }
            else if (/^Career Length:/.test(elementText))
            {
                // Grab career length if they're retired
                careerLength = parseInt(elementText.match(/\d+/)![0]);
            }
        });

        const statContainer = $('#div_per_game tbody > tr');

        let stats: any = await grabPlayerSats(statContainer, $);

        // Now get the career stats and load them
        const careerStatsRow = $('#div_per_game tfoot > tr').first();
        stats.career = await grabCareerStats(careerStatsRow, $);

        // Grab the player's advanced stats
        const advancedStatsRows = $('#div_advanced tbody > tr');
        const advancedStats = await grabAdvancedStats(advancedStatsRows, $);

        // Grab the player's career advanced stats
        const careerAdvancedStatsRow = $('#div_advanced tfoot > tr').first();
        const careerAdvancedStats = await grabCareerAdvancedStats(careerAdvancedStatsRow, $);

        // Finally, get the player's NBA.com id and headshot
        let picture = '';
        let playerID = $('#div_stats-nba-com > div > a:nth-child(1)').attr('href');
        // Null check for player that are retired or otherwise missing this link
        if (playerID)
        {
            playerID = playerID.match(/\d+/)![0];
            picture = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerID}.png`;
        } else
        {
            playerID = '';
        }

        // Grab the jersey numbers and put them in an array
        const jerseyContainer = $('.uni_holder .jersey text');

        const jerseyNumbers: any = [];

        jerseyContainer.each((index, element) =>
        {
            const elementText = $(element).text();

            if (!jerseyNumbers.includes(parseInt(elementText)))
            {
                jerseyNumbers.push(parseInt(elementText));
            }
        });

        // Lastly, get the player's career earnings and most recent
        const FAQs = $('#div_faq h3, #div_faq p');

        let recentSalary = -1;
        let careerEarnings = -1;

        FAQs.each((index, element) =>
        {
            const elementText = $(element).text();

            if (/^How much does .* make\?/.test(elementText))
            {
                recentSalary = parseInt(
                    $(element).next().text().match(/[\d,]+/)![0].replace(/,/g, ''));
            }
            else if (/^What is .* net worth\?/.test(elementText))
            {
                careerEarnings = parseInt($(element).next().text().match(/[\d,]+/)![0].replace(/,/g, ''));
            }
        });
        const player = {
            name,
            picture,
            jerseyNumbers,
            positions,
            height,
            weight,
            nicknames,
            championships,
            mvps,
            allStars,
            accolades,
            stats,
            advancedStats,
            careerAdvancedStats,
            shootingHand,
            college,
            birthplace,
            birthdate,
            draftPick,
            draftYear,
            draftTeam,
            debut,
            careerLength,
            recentSalary,
            careerEarnings,
        };

        return JSON.stringify(player);

    }
    catch (err)
    {
        console.error("Failed to fetch BBREF player's page", err);
    }
}
