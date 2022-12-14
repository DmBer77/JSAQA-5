const { Given, When, Then, Before, After } = require('cucumber');
const puppeteer = require('puppeteer');
const expect = require('chai');
const { assert } = require('chai');

Before({ timeout: 60 * 1000 }, async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 80 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});
After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});

Given(
    'user is on {string} page',
    { timeout: 60 * 1000 },
    async function (string) {
        return await this.page.goto('http://qamid.tmweb.ru/client/index.php', {
            setTimeout: 60000,
        });
    },
);

When('user clicks day {int}', async function (int) {
    const daySelector = 'body > nav > a:nth-child(' + int + ')';
    await this.page.click(daySelector);
});

When('user selects show {int} and time {int}', async function (int, int2) {
    const timeSelector =
        'body > main > section:nth-child(' +
        int +
        ') > div:nth-child(' +
        int2 +
        ') > ul > li > a';
    await this.page.waitForSelector(timeSelector);
    await this.page.click(timeSelector);
});

When('user clicks row {int} and seat {int}', async function (int, int2) {
    const seatSelector =
        'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(' +
        int +
        ') > span:nth-child(' +
        int2 +
        ')';
    await this.page.waitForSelector(seatSelector);
    await this.page.click(seatSelector);
});

When('user clicks submit button', async function () {
    const btnBook = 'body > main > section > button';
    await this.page.waitForSelector(btnBook);
    await this.page.click(btnBook);
});

Then('user sees the button with name {string}', async function (string) {
    const btnSelector = 'body > main > section > div > button';
    await this.page.waitForSelector(btnSelector, {
        visible: true,
    });
    const actual = await this.page.$eval(btnSelector, link => link.textContent);
    assert.equal(actual, 'Получить код бронирования');
});
