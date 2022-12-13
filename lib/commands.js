module.exports = {
    clickElement: async function (page, selector) {
        try {
            await page.waitForSelector(selector);
            await page.click(selector);
        } catch (error) {
            throw new Error(`Selector is not clickable: ${selector}`);
        }
    },

    spotTheDay: async function (day) {
        const daySelector = 'body > nav > a:nth-child(' + day + ')';
        try {
            return daySelector;
        } catch (error) {
            throw new Error(`Selector is not clickable: ${daySelector}`);
        }
    },

    spotTheTime: async function (film, time) {
        const timeSelector =
            'body > main > section:nth-child(' +
            film +
            ') > div:nth-child(' +
            time +
            ') > ul > li > a';
        try {
            return timeSelector;
        } catch (error) {
            throw new Error(`Selector is not clickable: ${timeSelector}`);
        }
    },

    clickSeat: async function (page, row, seat) {
        let seatSelector =
            'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(' +
            row +
            ') > span:nth-child(' +
            seat +
            ')';
        try {
            // await page.waitForSelector(seatSelector);
            await page.click(seatSelector);
        } catch (error) {
            throw new Error(`Selector is not clickable: ${seatSelector}`);
        }
    },
};
