const puppeteer = require('puppeteer');
const getChrome = require("./getChrome");

const getText = async el => await (await el.getProperty('innerText')).jsonValue();

const order = async (place, product) => {
  const chrome = await getChrome();

  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
  });

  const page = await browser.newPage();
  await page.goto('https://lunching.pl/homepage');
  
  await page.waitFor('input#login');
  
  await page.type('input#login', process.env.LOGIN);
  await page.type('input#password', process.env.PASSWORD);
  
  await page.$$eval('input#login',
  ([input]) => input.closest('form').querySelector('button').click()
  )
  
  await page.goto('https://lunching.pl/user/restaurants/');

  await page.waitFor('app-restaurant h3');

  const placeHeaders = await page.$$('app-restaurant h3');
  const placeHeadersTexts = await Promise.all(placeHeaders.map(async header => await getText(header)));
  const placeHeaderIndex = placeHeadersTexts.findIndex(header => header.trim().toUpperCase() === place.trim().toUpperCase());

  await placeHeaders[placeHeaderIndex].click();
  
  await page.waitFor('.itemHeader');
  
  const productHeaders = await page.$$('.itemHeader h3');
  const productHeadersTexts = await Promise.all(productHeaders.map(async header => await getText(header)));
  const productHeaderIndex = productHeadersTexts.findIndex(header => header.trim().toUpperCase() === product.trim().toUpperCase());
  await productHeaders[productHeaderIndex].click();

  await (await page.$('app-basket button.confirm')).click()

  await page.waitFor('mat-dialog-container button.lunching-btn.mat-raised-button');
  
  const buttons = await page.$$('mat-dialog-container button.lunching-btn.mat-raised-button');
  const buttonsTexts = await Promise.all(buttons.map(async header => await getText(header)));
  const buttonIndex = buttonsTexts.findIndex(header => header.trim().toUpperCase() === 'POTWIERDZAM');
  const confirmButton = buttons[buttonIndex];

  await confirmButton.click()

  await page.waitFor('app-thank-you');

  await browser.close();

  await new Promise(resolve => setTimeout(() => {
    chrome.instance.kill();
    resolve();
  }, 0));
};

module.exports = order;
