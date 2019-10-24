
//Test using a jest-puppeteer
describe('Google', () => {
    beforeAll(async () => {
        wait page.setViewport({ width: 1680, height: 1050 });
        await page.goto("https://www.google.com");
    });

    it('Should be titled "Google"', async() => {
        await expect(page.title()).resolves.toMatch('Google');
    });

});
