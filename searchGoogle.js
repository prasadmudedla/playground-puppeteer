
const puppeteer = require('puppeteer');

puppeteer.launch({

}).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1680, height: 1050});
    await page.goto('https://www.google.com');

    await page.screenshot({
        path: './screenshots/page2.png'
    });
    await browser.close();
});

