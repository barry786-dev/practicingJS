const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util.js');

jest.useRealTimers();

test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('Anna', 28);
  expect(text2).toBe('Anna (28 years old)');
});

test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
  const text2 = generateText();
  expect(text2).toBe('undefined (undefined years old)');
});

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 29);
  expect(text).toBe('Max (29 years old)');
  const text2 = checkAndGenerate('Anna', 28);
  expect(text2).toBe('Anna (28 years old)');
  const text3 = checkAndGenerate('', null);
  expect(text3).toBe(false);
  const text4 = checkAndGenerate();
  expect(text4).toBe(false);
});

test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    // args: ['--window-size=1280,800'],
    executablePath: '',
  });
  //const page = await browser.newPage();
  // const page = await browser.currentPage();
  const [page] = await browser.pages();
  // await page.goto('file:///mnt/c/Users/Maoma/Desktop/index.html');
  await page.goto(
    'file:///home/barry/Desktop/js/testing-01-starting-setup/index.html'
  );
  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', (el) => el.textContent);
  expect(finalText).toBe('Anna (28 years old)');
  await browser.close();
}, 10000);
