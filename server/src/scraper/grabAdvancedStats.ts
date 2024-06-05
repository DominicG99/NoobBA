//@ts-nocheck
import cheerio from 'cheerio';

export function grabAdvancedStats(statsRow, $): any
{
    const stats = {};

    statsRow.each((index, row) =>
    {
        const rowData = $(row);

        if (rowData.find('[data-stat="lg_id"]').text().trim() !== 'NBA')
        {
            return;
        }

        const season = rowData.find('th').text().trim();
        stats[season] = {
            per: parseInt(rowData.find('[data-stat="per"]').text().trim()),
            ts_pct: parseFloat(rowData.find('[data-stat="ts_pct"]').text().trim()),
            fg3a_per_fga_pct: parseFloat(rowData.find('[data-stat="fg3a_per_fga_pct"]').text().trim()),
            ftr: parseFloat(rowData.find('[data-stat="fta_per_fga_pct"]').text().trim()),
            orb_pct: parseFloat(rowData.find('[data-stat="orb_pct"]').text().trim()),
            drb_pct: parseFloat(rowData.find('[data-stat="drb_pct"]').text().trim()),
            trb_pct: parseFloat(rowData.find('[data-stat="trb_pct"]').text().trim()),
            ast_pct: parseFloat(rowData.find('[data-stat="ast_pct"]').text().trim()),
            stl_pct: parseFloat(rowData.find('[data-stat="stl_pct"]').text().trim()),
            blk_pct: parseFloat(rowData.find('[data-stat="blk_pct"]').text().trim()),
            tov_pct: parseFloat(rowData.find('[data-stat="tov_pct"]').text().trim()),
            usg_pct: parseFloat(rowData.find('[data-stat="usg_pct"]').text().trim()),
            ows: parseFloat(rowData.find('[data-stat="ows"]').text().trim()),
            dws: parseFloat(rowData.find('[data-stat="dws"]').text().trim()),
            ws: parseFloat(rowData.find('[data-stat="ws"]').text().trim()),
            ws_per_48: parseFloat(rowData.find('[data-stat="ws_per_48"]').text().trim()),
            obpm: parseFloat(rowData.find('[data-stat="obpm"]').text().trim()),
            dbpm: parseFloat(rowData.find('[data-stat="dbpm"]').text().trim()),
            bpm: parseFloat(rowData.find('[data-stat="bpm"]').text().trim()),
            vorp: parseFloat(rowData.find('[data-stat="vorp"]').text().trim()),
        };
    });

    return stats;
}