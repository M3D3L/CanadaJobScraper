import { main } from './modules/main.js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//search parameters job title and province
let jobTitle = "";
let province = "";

//*****Number of pages you would like to scrape if not enough results it defaults to max pages***********//
let numberOfPages = 20;

//****************Settings****************//
let saveToDb = true;
let saveToCSV = true;
let sendEmails = true;

console.log("Welcome to 🇨🇦🍁 Job Bank Scraper by GuillermoMedel.com")
rl.question("What job title are you looking for? Leave blank for all results ", (title) => {
  jobTitle = title;
  rl.question("What province are you looking for? Leave blank for all results ", (prov) => {
    province = prov;
    rl.question("How many pages? Default 20 ", (num) => {
      if(num !== ""){
        numberOfPages = num;
      } else {
        numberOfPages = 20;
      }
      rl.question("Save to DB y/n? Default true ", (db) => {
        if(db === "y" || db === "yes" || db === ""){
          saveToDb = true;
        } else {
          saveToDb = false;
        }
        rl.question("Save to CSV y/n? Default true ", (csv) => {
          if(csv === "y" || csv === "yes" || csv === ""){
            saveToCSV = true;
          } else {
            saveToCSV = false;
          }
          rl.question("Send emails y/n? Enter data in .env file ", (email) => {
            if(email === "y" || email === "yes" || email === ""){
              sendEmails = true;
            } else {
              sendEmails = false;
            }
            rl.close();
            //runs the scraper after all the questions are answered
            main(jobTitle, province, numberOfPages, saveToDb, saveToCSV, sendEmails);
          });
        });
      });
    });
  });
})