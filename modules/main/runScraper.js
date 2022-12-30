import cheerio from "cheerio";
import { pushToArray } from "./pushToArray.js";
import { spaceship } from "../main/spaceship.js";
import { scrapeNewPage } from "../main/scrapeNewPage.js";

export const runScraper = async (jobArray, page, baseUrl, browser) => {
  //loads the html from the page and uses cheerio to select the jobs from the page
  const html = await page.content();

  const $ = cheerio.load(html);
  const jobList = $("article");

  //loop through the jobList and add the scraped data to the jobArray
  pushToArray(jobArray, jobList, $, baseUrl);

  //variables to toggle the emoji animation in the console

  for (let i = 0; i < jobArray.length; i++) {
    // use the spaceship function to toggle the emoji animation in the console
   await spaceship(jobArray.length, i);

    //begin the loop to open each job and scrape the email
    await scrapeNewPage(jobArray, i, browser, cheerio);
  }
};
