const puppeteer = require('puppeteer');

void (async () => {

    try {
        //Create a browser
        const browser = await puppeteer.launch();

        // Create a page in browser
        const page = await browser.newPage();

        //Navigate to a Website
        await page.goto('https://scrapethissite.com/pages/forms/');

        //Take a screenshot and save it to the folder/screenshots/page1.png
        await page.screenshot({
            path: './screenshots/page1.png'
        });

        //Save the page as PDF
        await page.pdf({ path: './pdfs/page1.pdf' });

        //Grab team data
        const teams = await page.evaluate(() => {
            const grabFromRow = (row, classname) => row
                .querySelector(`td.${classname}`)
                .innerText
                .trim();

            //Selector
            const TEAM_ROW_SELECTOR = "tr.team";

            //Intialized a Array to save the data
            const data = [];

            //get all the Team Rows
            const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR);

            //Loopover each team row, creating objects
            for(const tr of teamRows) {
                data.push({
                    name: grabFromRow(tr, 'name'),
                    year: grabFromRow(tr, 'year'),
                    wins: grabFromRow(tr, 'wins'),
                    losses : grabFromRow(tr, 'losses')
                });
            }
            return data;
        });

        //Logging the data to check
        console.log(JSON.stringify(teams, null, 2));

        const fs = require('fs');
        fs.writeFile(
            './json/teams.json',
            JSON.stringify(teams, null, 2),
            (err) => err ? console.log('Data not written!', err) : console.log('Data Written!')
        );
        await browser.close();

    } catch (error) {
        console.log(error);
    }

})();
