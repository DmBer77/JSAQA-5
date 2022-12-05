const { Given, When, Then, Before, After } = require('cucumber');
const puppeteer = require('puppeteer');
const expect = require('chai');
const { assert } = require('chai');

Before(async function () {
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

Given('user is on {string} page', async function (string) {
    return await this.page.goto('http://qamid.tmweb.ru/client/index.php', {
        setTimeout: 15000,
    });
});

When('user click to {string}', async function (string) {
    await this.page.click('body > nav > a:nth-child(4)');
    await this.page.click(
        'body > main > section:nth-child(2) > div:nth-child(2) > ul > li > a',
    );

    await this.page.waitForSelector(
        'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(7) > span:nth-child(5)',
    );
    await this.page.click(
        'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(7) > span:nth-child(5)',
    );
    await this.page.click('body > main > section > button');
});

Then('user sees the button with name {string}', async function (string) {
    const btnSelector = '.acceptin-button';
    await this.page.waitForSelector(btnSelector, {
        visible: true,
    });
    const actual = await this.page.$eval(btnSelector, link => link.textContent);
    // expect(actual).contain('Получить код бронирования');
    assert.equal(actual, 'Получить код бронирования');
});
