//Puppeteer allows you to control headless Chrome or Chromium over the DevTools Protocol.
import puppeteer from "puppeteer";
import { displayMessage } from "./main/displayMessage.js";
import { numPages } from "./main/numPages.js";
import { runScraper } from "./main/runScraper.js";
import { filterArray } from "./main/filterArray.js";
import { sendMail } from "./main/sendMail.js";
import { saveDB } from "./main/saveDB.js";
import { saveCSV } from "./main/saveCSV.js";
import { cleanData } from "./main/cleanData.js";

const baseUrl = "https://www.jobbank.gc.ca";
//controls timeouts to avoid being blocked by the website
const timeout = Math.floor(Math.random() * 1000);

export const main = async (
  jobTitle,
  province,
  numberOfPages,
  saveToDb,
  saveToCSV,
  sendEmails,
  filterEmail
) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(baseUrl);
  page.waitForNavigation();
  //waits for the search bar to load
  await page.waitForSelector("#searchString");

  //adds the job title and province to the search bar and clicks on the search button
  await displayMessage(jobTitle, province, timeout, page);

  //clicks on the more results button to load more results
  await numPages(page, numberOfPages, timeout);
  
  //scrapes the jobs from the page and adds them to the jobArray
  let jobArray = [];
  await runScraper(jobArray, page, baseUrl, browser);

  //filters out duplicate emails
  if(filterEmail) {
    jobArray = await filterArray(jobArray, 'email');
  }

  //cleans the data
  jobArray = await cleanData(jobArray);
  
  //send emails using nodemailer
  if (sendEmails) {
    await sendMail(jobArray, timeout);
  }

  //optional save the jobArray to a sqlite database
  if (saveToDb) {
    await saveDB(jobArray, timeout);
  }

  const goodbye = () => {
    browser.close();
    console.log(
      "Thank you for using CanadaJobScraper by GuillermoMedel.com ☕"
    );
    console.log("Browser closed 👋");
  };

  //optional save the jobArray to a csv file
  if (saveToCSV) {
    await saveCSV(jobArray, timeout);
    //close the browser and end the program
    goodbye();
  
    //exit the program
    process.exit();
  }

  goodbye();
};
