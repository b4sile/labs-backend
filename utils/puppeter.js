import puppeteer from 'puppeteer';

const whSelector = '.product-warehouse .block-cnt a';
const priceSelector = '.product-price .main-price';
const oldPriceSelector = '.product-price .old-price';
const discountSelector = '.product-price .discount';
const shippingSelector = '.modal-shipping-pop .table-bd .table-row';
const reviewSelector = '.product-reviewer .reviews-num';
const statusSelector = '.product-stock .stock-status';
const titleSelector = '.product-title .product-title-text';
const imgSelector = '.image-max img';
const ratingSelector = '.reviewer-rating .average-num';
const wishSelector = '.wish-btn';
const poaSelector = '.product-poa > div';
const poaVariables = (num) => `${poaSelector}:nth-child(${num}) .block-cnt a`;
const timeout = 500;

export const parsePage = async (url) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);

    const { length: whLength } = await page.$$(whSelector);
    const { length: poaLength } = await page.$$(poaSelector);

    const data = {};
    const variants = [];

    for (let i = 0; i < whLength; i++) {
      const whSl = `${whSelector}:nth-child(${i + 1})`;
      if (!(await page.$eval(whSl, (d) => d.classList.contains('active')))) {
        await page.click(whSl);
        await page.waitForNavigation();
      }
      const whValue = await page.$eval(whSl, (d) => d.textContent);

      if (poaLength > 0) {
        const { length: poaVar1Length } = await page.$$(poaVariables(1));
        for (let j = 0; j < poaVar1Length; j++) {
          const currSel = `${poaVariables(1)}:nth-child(${j + 1})`;
          if (await page.$eval(currSel, (d) => d.classList.contains('gray'))) {
            continue;
          }
          if (
            !(await page.$eval(currSel, (d) => d.classList.contains('active')))
          ) {
            await page.click(currSel);
            await page.waitForTimeout(timeout);
          }
          const firstVariable = await page.$eval(
            currSel,
            (d) => d.textContent || d.getAttribute('title')
          );

          if (poaLength > 1) {
            const { length: poaVar2Length } = await page.$$(poaVariables(2));
            for (let k = 0; k < poaVar2Length; k++) {
              const currSel = `${poaVariables(2)}:nth-child(${k + 1})`;
              if (
                await page.$eval(currSel, (d) => d.classList.contains('gray'))
              ) {
                continue;
              }
              if (
                !(await page.$eval(currSel, (d) =>
                  d.classList.contains('active')
                ))
              ) {
                await page.click(currSel);
                await page.waitForTimeout(timeout);
              }
              const secondVariable = await page.$eval(
                currSel,
                (d) => d.textContent || d.getAttribute('title')
              );
              await parseData({
                page,
                variants,
                firstVariable,
                secondVariable,
                whValue,
              });
              await page.click(currSel);
              await page.waitForTimeout(timeout);
            }
          } else {
            await parseData({ page, variants, whValue, firstVariable });
          }

          await page.click(currSel);
          await page.waitForTimeout(timeout);
        }
      } else {
        await parseData({ page, variants, whValue });
      }
    }
    data.variants = JSON.stringify(variants);
    const wish = await page.$eval(wishSelector, (p) => p.textContent);
    const rating = await page.$eval(ratingSelector, (p) => p.textContent);
    const review = await page.$eval(reviewSelector, (p) => p.textContent);
    const img = await page.$eval(imgSelector, (p) => p.getAttribute('src'));
    const title = await page.$eval(
      titleSelector,
      (p) => p.textContent.split(' - ')[0]
    );
    data.wish = wish;
    data.rating = rating;
    data.review = review;
    data.title = title;
    data.img = img;
    return data;
  } catch (err) {
    console.log(err);
    await browser.close();
  }
};

export const parseData = async ({
  page,
  variants,
  firstVariable,
  secondVariable,
  whValue,
}) => {
  const price = await page.$eval(priceSelector, (p) => p.textContent);
  const oldPrice = await page.$eval(oldPriceSelector, (p) => p.textContent);
  const discount = await page.$eval(discountSelector, (p) => p.textContent);
  const status = await page.$eval(statusSelector, (p) => p.textContent);
  const shipping = await page.$$eval(shippingSelector, (n) => {
    const values = n.map((n) => ({
      type: n.querySelector('.carrier').textContent,
      time: n.querySelector('.time').textContent,
      price: n.querySelector('.price').textContent,
    }));
    return values;
  });
  variants.push({
    oldPrice,
    price,
    discount,
    shipping,
    status,
    firstVariable,
    secondVariable,
    whValue,
  });
};
