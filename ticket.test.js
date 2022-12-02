const { clickElement } = require('./lib/commands.js');
let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://qamid.tmweb.ru/client/index.php');
    // await page.setDefaultNavigationTimeout(80000);
});

afterEach(() => {
    page.close();
});

describe('Movie tickets tests', () => {
    test('First test - positive', async () => {
        await clickElement(page, 'body > nav > a:nth-child(4)');
        await clickElement(
            page,
            'body > main > section:nth-child(2) > div:nth-child(2) > ul > li > a',
        );
        await clickElement(
            page,
            'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(7) > span:nth-child(5)',
        );
        await clickElement(page, 'body > main > section > button');

        const btnSelector = '.acceptin-button';
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain('Получить код бронирования');
    });

    test('Second test - positive', async () => {
        await clickElement(page, 'body > nav > a:nth-child(7)');
        await clickElement(
            page,
            'body > main > section:nth-child(3) > div:nth-child(2) > ul > li > a',
        );
        await clickElement(
            page,
            'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(8) > span:nth-child(5)',
        );
        await clickElement(page, 'body > main > section > button');

        const btnSelector = '.acceptin-button';
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain('Получить код бронирования');
    });

    test('Third text - negative', async () => {
        await clickElement(
            page,
            'body > nav > a.page-nav__day.page-nav__day_today.page-nav__day_chosen',
        );
        await clickElement(
            page,
            'body > main > section:nth-child(3) > div:nth-child(3) > ul > li > a',
        );

        const actualUrl = await page.url();
        const actual = typeof actualUrl;

        const targetUrl = 'http://qamid.tmweb.ru/client/hall.php';

        expect(actual).not.toEqual(targetUrl);
    });
});
