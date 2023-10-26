/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

const puppeteer = require('puppeteer');
const chai = require('chai');

const { expect } = chai;

const {
  Given, When, Then, Before, After, setDefaultTimeout,
} = require('cucumber');

const { default: status } = require('cucumber/lib/status.js');
const {
  clickElementSeat, clickVipSeat, chooseRandomDayTime, clickBookTicket, getText, checkButton,
} = require('../../lib/commands.js');

setDefaultTimeout(60000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});
After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

// 1) Scenario: Should book a standard ticket

Given('user is on {string} page', async function (string) {
  return this.page.goto(string);
});

When('user clicks on a day and on time', async function () {
  return chooseRandomDayTime(this.page);
});

When('user click on unoccupied standart seat {string}', async function (string) {
  return clickElementSeat(this.page, string);
});

When('user click on a buttons to book a ticket and to get a QR-code', async function () {
  return clickBookTicket(this.page);
});

Then('user sees the text {string}', async function (string) {
  const actual = await getText(this.page, 'section > div > p:nth-child(7)');
  const expected = await string;
  expect(actual).contains(expected);
});

// 2) Scenario: Should book a vip ticket if not available then book a standart ticket

When('user click on unoccupied VIP seat if not available click on standart seat', async function () {
  return clickVipSeat(this.page);
});

// 3) Scenario: Should not allow to book an occupied seat

When('user are trying to click on an occupied seat {string}', async function (string) {
  return clickElementSeat(this.page, string);
});

Then('a booking button {string} is disabled', async function (string) {
  const actual = await checkButton(this.page, string);
  const expected = 'true';
  expect(actual).contains(expected);
});
