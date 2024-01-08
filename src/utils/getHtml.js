const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const { getJson } = require("./htmlFormatter.js");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const getHtml = () => {
  try {
    puppeteer.use(StealthPlugin());
    puppeteer.launch({ headless: "new" }).then(async (browser) => {
      console.log("Running tests..");
      const page = await browser.newPage();
      await page.goto(
        "https://www.basketball-reference.com/leagues/NBA_2024_totals.html"
      );
      await page.waitForTimeout(5000);
      const html = await page.evaluate(
        () => document.documentElement.innerHTML
      );

      fs.writeFile(`public/htmlData/siteHTML.html`, html, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
      await browser.close();
      console.log("Got HTML!");
    });
  } catch (err) {
    console.log(err);
  }
};
getHtml();
getJson();
