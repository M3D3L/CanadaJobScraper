import cheerio from 'cheerio';
import { pushToArray } from './pushToArray.js';
import { spaceship } from '../main/spaceship.js';
import { scrapeNewPage } from '../main/scrapeNewPage.js';

export const runScraper = async (
  jobArray, page, baseUrl, browser
) => {
  //loads the html from the page and uses cheerio to select the jobs from the page
  const html = await page.content();

  const $ = cheerio.load(html);
  const jobList = $("article");

  //loop through the jobList and add the scraped data to the jobArray
  pushToArray(jobArray, jobList, $, baseUrl);

  //variables to toggle the emoji animation in the console
  let j = 0;
  let k = 0;

  for (let i = 0; i < jobArray.length; i++) {
    // use the spaceship function to toggle the emoji animation in the console
    await spaceship(jobArray, i, j, k);

    if (j < 4) {
     j++;
    } else {
      j = 0;
      if(k < 4) {
        k++;
      } else {
        k = 0;
      }
    }
    //begin the loop to open each job and scrape the email address aka howToApply
    await scrapeNewPage(jobArray, i, browser, cheerio);
  }
};
