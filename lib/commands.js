/* eslint-disable linebreak-style */
// const randomNumber = require('./util');

module.exports = {

  async clickElement(page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  async getText(page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  async putText(page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press('Enter');
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },

  async getAttribute(page, selector, string) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.getAttribute(string));
    } catch (error) {
      throw new Error(`Attribute is not available for selector: ${selector}`);
    }
  },

  // Commands for goToMovie tests:

  async chooseRandomDayTime(page) {
    const dayToChoose = 'body > nav > a';
    await page.waitForSelector(dayToChoose);
    const daysToChoose = await page.$$(dayToChoose);
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const minDay = 1;
    const maxDay = daysToChoose.length;
    const dayToGo = `body > nav > a:nth-child(${randomNumber(minDay, maxDay) + minDay})`;
    await page.click(dayToGo);
    const timeToGo = 'body > main > section:nth-child(2) > div.movie-seances__hall > ul > li';
    await page.waitForSelector(timeToGo);
    await page.click(timeToGo);
  },

  async clickElementSeat(page, selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
  },

  async clickVipSeat(page) {
    const vipSeat = '[class="buying-scheme__chair buying-scheme__chair_vip"]';
    await page.waitForSelector(vipSeat);
    const arrayVipSeat = await page.$$(vipSeat);
    if (arrayVipSeat.length === 1) {
      const standartSeat = '[class="buying-scheme__chair buying-scheme__chair_standart"]';
      await page.waitForSelector(standartSeat);
      await page.click(standartSeat);
    }
    await page.click(vipSeat);
  },

  async clickBookTicket(page) {
    const bookingButton = 'section > button';
    await page.waitForSelector(bookingButton);
    await page.click(bookingButton);
    const getQrCodeButton = 'body > main > section > div > button';
    await page.waitForSelector(getQrCodeButton);
    await page.click(getQrCodeButton);
  },

  async checkButton(page, selector) {
    return String(
      await page.$eval(selector, (button) => button.disabled),
    );
  },
};
