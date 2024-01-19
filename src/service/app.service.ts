import { Injectable } from '@nestjs/common';
import * as playwright from 'playwright-aws-lambda';
import * as _ from 'lodash';
import { AppCrawlerGetResDto } from '../dto/appCrawlerGetRes.dto';

@Injectable()
export class AppService {
  async crawler(): Promise<AppCrawlerGetResDto> {
    let browser = null;
    try {
      browser = await playwright.launchChromium({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(
        'https://www.latenitex.com/products/faux-suede-hooded-puffer-jacket?variant=43895596613871',
      );
      const liElements = await page.$$(
        '#Slider-Thumbnails-template--17140330889455__main li',
      );
      const imageUrlList: any[] = [];
      await Promise.all(
        _.map(liElements, async (liElement) => {
          // 获取每个li下的img元素的src属性
          const imgSrc = await liElement.$eval('img', (img) => img.src);
          imageUrlList.push(imgSrc);
        }),
      );
      //
      const title = await page
        .locator(
          '#ProductInfo-template--17140330889455__main > div.product__title > h1',
        )
        .innerText();
      //
      const originalPrice = await page
        .locator(
          '#price-template--17140330889455__main > div > div > div.price__sale > span:nth-child(2) > s',
        )
        .innerText();
      //
      const preferentialPrice = await page
        .locator(
          '#price-template--17140330889455__main > div > div > div.price__sale > span.price-item.price-item--sale.price-item--last',
        )
        .innerText();
      //
      const colorList: any[] = [];
      const colorElements = await page.$$(
        '#variant-radios-template--17140330889455__main > fieldset:nth-child(1) label',
      );
      await Promise.all(
        colorElements.map(async (labelElement) => {
          const labelText = await labelElement.innerText();
          colorList.push(labelText);
        }),
      );
      //
      const sizeList: any[] = [];
      const sizeElements = await page.$$(
        '#variant-radios-template--17140330889455__main > fieldset:nth-child(2) label',
      );
      await Promise.all(
        sizeElements.map(async (labelElement) => {
          const labelText = await labelElement.innerText();
          sizeList.push(labelText);
        }),
      );
      //
      const descriptionList: any[] = [];
      const descriptionElements = await page.$$(
        '#ProductInfo-template--17140330889455__main > div.product__description.rte.quick-add-hidden > p',
      );
      await Promise.all(
        descriptionElements.map(async (labelElement) => {
          const labelText = await labelElement.innerText();
          descriptionList.push(labelText);
        }),
      );
      //
      await page.waitForSelector(
        '#ProductInfo-template--17140330889455__main > div.product__description.rte.quick-add-hidden > div.ks-chart-container.sizing-chart-container > div > div > div.ks-table-content-wrapper.ks-toggle-style-1 > div.ks-table-wrapper > table > tbody > tr:nth-child(1)',
        { state: 'visible' },
      );
      const rows = await page.$$(
        '#ProductInfo-template--17140330889455__main > div.product__description.rte.quick-add-hidden > div.ks-chart-container.sizing-chart-container > div > div > div.ks-table-content-wrapper.ks-toggle-style-1 > div.ks-table-wrapper > table > tbody > .ks-table-row',
      );
      const data = await Promise.all(
        rows.map(async (row) => {
          const columns = await row.$$('.ks-table-cell');
          return await Promise.all([
            page.evaluate((el) => el.textContent.trim(), columns[0]),
            page.evaluate((el) => el.textContent.trim(), columns[1]),
            page.evaluate((el) => el.textContent.trim(), columns[2]),
            page.evaluate((el) => el.textContent.trim(), columns[3]),
          ]);
        }),
      );
      const keys = data[0];
      const measure: any = _.map(data.slice(1), (row) =>
        _.zipObject(keys, row),
      );
      return {
        imageUrlList,
        title,
        originalPrice,
        preferentialPrice,
        colorList,
        sizeList,
        measure,
        descriptionList,
      };
    } catch (e: any) {
      return { err: e.message, stack: e.stack } as any;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
