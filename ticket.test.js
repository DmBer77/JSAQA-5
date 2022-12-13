const {
    clickElement,
    clickSeat,
    spotTheDay,
    spotTheTime,
} = require('./lib/commands.js');
let page;
const btnBook = 'body > main > section > button';
const btnGetTheCode = '.acceptin-button';

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
        const day = await spotTheDay(4);
        const time = await spotTheTime(2, 2);

        await clickElement(page, day);
        await clickElement(page, time);
        await clickSeat(page, 7, 5);
        await clickElement(page, btnBook);

        await page.waitForSelector(btnGetTheCode, {
            visible: true,
        });
        const actual = await page.$eval(
            btnGetTheCode,
            link => link.textContent,
        );
        expect(actual).toContain('Получить код бронирования');
    });

    test('Second test - positive', async () => {
        const day = await spotTheDay(7);
        const time = await spotTheTime(1, 2);

        await clickElement(page, day);
        await clickElement(page, time);
        await clickSeat(page, 6, 5);
        await clickElement(page, btnBook);

        await page.waitForSelector(btnGetTheCode, {
            visible: true,
        });
        const actual = await page.$eval(
            btnGetTheCode,
            link => link.textContent,
        );
        expect(actual).toContain('Получить код бронирования');
    });

    test('Third text - negative', async () => {
        const time = await spotTheTime(2, 3);

        await page.waitForSelector(time, {
            visible: true,
        });
        const actual = await page.$eval(time, link => link.className);
        expect(actual).toContain(
            'movie-seances__time acceptin-button-disabled',
        );
    });
});
