//@ts-nocheck
import cheerio from 'cheerio';

export function grabCareerAdvancedStats(careerStatsRow, $): any {
    const careerStats = {
        per: parseFloat(careerStatsRow.find('[data-stat="per"]').text().trim()),
        ts_pct: parseFloat(careerStatsRow.find('[data-stat="ts_pct"]').text().trim()),
        fg3a_per_fga_pct: parseFloat(careerStatsRow.find('[data-stat="fg3a_per_fga_pct"]').text().trim()),
        ftr: parseFloat(careerStatsRow.find('[data-stat="fta_per_fga_pct"]').text().trim()),
        orb_pct: parseFloat(careerStatsRow.find('[data-stat="orb_pct"]').text().trim()),
        drb_pct: parseFloat(careerStatsRow.find('[data-stat="drb_pct"]').text().trim()),
        trb_pct: parseFloat(careerStatsRow.find('[data-stat="trb_pct"]').text().trim()),
        ast_pct: parseFloat(careerStatsRow.find('[data-stat="ast_pct"]').text().trim()),
        stl_pct: parseFloat(careerStatsRow.find('[data-stat="stl_pct"]').text().trim()),
        blk_pct: parseFloat(careerStatsRow.find('[data-stat="blk_pct"]').text().trim()),
        tov_pct: parseFloat(careerStatsRow.find('[data-stat="tov_pct"]').text().trim()),
        usg_pct: parseFloat(careerStatsRow.find('[data-stat="usg_pct"]').text().trim()),
        ows: parseFloat(careerStatsRow.find('[data-stat="ows"]').text().trim()),
        dws: parseFloat(careerStatsRow.find('[data-stat="dws"]').text().trim()),
        ws: parseFloat(careerStatsRow.find('[data-stat="ws"]').text().trim()),
        ws_per_48: parseFloat(careerStatsRow.find('[data-stat="ws_per_48"]').text().trim()),
        obpm: parseFloat(careerStatsRow.find('[data-stat="obpm"]').text().trim()),
        dbpm: parseFloat(careerStatsRow.find('[data-stat="dbpm"]').text().trim()),
        bpm: parseFloat(careerStatsRow.find('[data-stat="bpm"]').text().trim()),
        vorp: parseFloat(careerStatsRow.find('[data-stat="vorp"]').text().trim()),
    };

    return careerStats;
}