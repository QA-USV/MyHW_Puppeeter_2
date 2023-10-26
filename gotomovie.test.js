/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const { url } = require('./features/selectors.json');

const {
  getText, clickElementSeat, clickVipSeat, chooseRandomDayTime, clickBookTicket, checkButton,
} = require('./lib/commands.js');

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe('GoToMovie app tests', () => {
  beforeEach(async () => {
    await page.goto(url);
  }, 30000);
  test('successfully book a standard ticket', async () => {
    await chooseRandomDayTime(page);
    const standartSeat = '[class="buying-scheme__chair buying-scheme__chair_standart"]';
    await clickElementSeat(page, standartSeat);
    await clickBookTicket(page);
    const ticketInfo = 'section > div > p:nth-child(7)';
    await page.waitForSelector(ticketInfo);
    const actual = await getText(page, ticketInfo);
    const expected = 'Покажите QR-код нашему контроллеру для подтверждения бронирования.';
    expect(actual).equals(expected);
  }, 60000);

  test('successfully book a VIP ticket, if not available then book a standart ticket', async () => {
    await chooseRandomDayTime(page);
    const vipSeat = '[class="buying-scheme__chair buying-scheme__chair_vip"]';
    await clickVipSeat(page, vipSeat);
    await clickBookTicket(page);
    const ticketInfo = 'section > div > p:nth-child(7)';
    await page.waitForSelector(ticketInfo);
    const actual = await getText(page, ticketInfo);
    const expected = 'Покажите QR-код нашему контроллеру для подтверждения бронирования.';
    expect(actual).equals(expected);
  }, 60000);

  test('not allow to book an occupied seat', async () => {
    await chooseRandomDayTime(page);
    const takenSeat = '[class="buying-scheme__chair buying-scheme__chair_standart buying-scheme__chair_taken"]';
    await clickElementSeat(page, takenSeat);
    const selector = '[class="acceptin-button"]';
    const actual = await checkButton(page, selector);
    const expected = 'true';
    expect(actual).contains(expected);
  });
});
