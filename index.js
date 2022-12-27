//Cheerio makes it makes it easy to select, edit, and view DOM elements.
const cheerio = require("cheerio");
//Puppeteer allows you to control headless Chrome or Chromium over the DevTools Protocol.
const puppeteer = require("puppeteer");
//controls timeouts to avoid being blocked by the website
const timeout = Math.floor(Math.random() * 1000);
//****************MODIFY THESE VALUES****************//
const name = "Guillermo Medel";
const phone = "+1 236-998-8668";
//*****Number of pages you would like to scrape if not enough results it defaults to max pages***********//
let numberOfPages = 200;
//search parameters job title and province
const jobTitle = "";
const province = "";
//*****Your email and password for emails***********//
const email = "guillermoantoniomedel@gmail.com";
//*****Get Google App Password here https://myaccount.google.com/apppasswords***********//
const password = "";

//****************Settings****************//
const saveToDb = true;
const saveToCSV = false;
const sendEmails = false;

//email settings remove from html template if not in use and remove replace script below//
const facebook = "https://www.facebook.com/profile.php?id=100083237295759";
const linkedin = "https://www.linkedin.com/in/guillermo-medel-9a4465151/";
const twitter = "https://twitter.com/GmoMedel";
const profilePic = "https://guillermomedel.com/email/me.jpg";
const skills = ["Websites", "Scraping", "Shopify", "Apps", "SEO", "Emails"];
const emailTitleLine1 = "Happy Holidays!";
const emailTitleLine2 = "Add me to your roster for 2023!";

//email body message
const message =
  "I'm a software developer who offers a range of services customized to meet the specific needs of your business. From creating a professional website to data scraping";
//use the index.html file as a template for the email
const fs = require("fs");
const template = fs.readFileSync("./email.html", "utf8");

//****************Do not modify****************//
const baseUrl = "https://www.jobbank.gc.ca";

//****************Main****************//
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(baseUrl);
  page.waitForNavigation();
  await page.waitForSelector("#searchString");

  //adds the job title and province to the search bar and clicks on the search button
  if (jobTitle !== "") {
    await page.type("#searchString", jobTitle);
    if (province !== "") {
      await page.type("#locationstring", province);
      console.log("Searching for " + jobTitle + " in " + province + "🇨🇦🍁🦫🏒");
    } else {
      console.log(
        "Searching for " + jobTitle + " jobs in all of Canada 🇨🇦🍁🦫🏒"
      );
    }
  } else if (province !== "") {
    console.log("Searching for all jobs in " + province + "🇨🇦🍁🦫🏒");
  } else {
    console.log("Searching for all jobs in Canada 🇨🇦🍁🦫🏒");
  }

  await page.click("#searchButton");
  await page.waitForSelector("#moreresultbutton");

  // click on the #moreresultbutton to load more results up to the numberOfPages
  for (let i = 1; i <= numberOfPages - 1; i++) {
    await page.waitForTimeout(timeout);
    const moreButton = await page.$("#moreresultbutton");
    if (moreButton) {
      await moreButton.evaluate((b) => b.click());
      console.log(i + " page(s) 📄 loaded out of " + numberOfPages);
      await page.waitForTimeout(timeout);
    } else {
      console.log(`No more results after ${i--} pages 😔`);
      console.log(`Setting the number of pages to ${i--}`);
      //await timout(1000);
      (await page.waitForTimeout(timeout)) * 7;
      numberOfPages = i - 1;
    }
  }

  //loads the html from the page and uses cheerio to select the jobs from the page
  const html = await page.content();

  const $ = cheerio.load(html);
  const jobList = $("article");
  const jobArray = [];

  //loop through the jobList and add scrape the data to the jobArray
  for (let i = 0; i < jobList.length; i++) {
    const jobTitle = $(jobList[i]).find(".noctitle").text().split("\n")[0];
    const list = $(jobList[i]).find(".list-unstyled");
    const business = list.find(".business").text().split("\n")[0];
    //let location = remove any white space

    const location = list
      .find(".location")
      .text()
      .split("\n, span")
      .filter((item) => item !== "")
      .join(", ");

    const salary = list
      .find(".salary")
      .text()
      .split("\n, span")
      .filter((item) => item !== "")
      .join(", ");

    const jobUrl = baseUrl + $(jobList[i]).find("a").attr("href");

    jobArray.push({
      jobTitle,
      business,
      salary,
      location,
      jobUrl,
    });

    //console.log the interval of jobs loaded

    console.log(i + 1 + " job(s) loaded");
  }
  let j = 0;
  let k = ["🌕", "🛸", "☄️", "🌠", "🌎"];
  let l = 0;
  //begin the loop to open each job and scrape the email address aka howToApply
  for (let i = 0; i < jobArray.length; i++) {
    //console.log and toggle betwtween three dots to show progress
    if (j === 0) {
      console.log("Loading job " + i + " of " + jobArray.length + "🚀");
      j++;
    } else if (j === 1) {
      console.log("Loading job " + i + " of " + jobArray.length + "🔥🚀");
      j++;
    } else if (j === 2) {
      console.log("Loading job " + i + " of " + jobArray.length + "🔥🔥🚀");
      j++;
      //fire emoji
    } else if (j === 3) {
      console.log("Loading job " + i + " of " + jobArray.length + "🔥🔥🔥🚀");
      j++;
    } else {
      console.log(
        "Loading job " + i + " of " + jobArray.length + "🔥🔥🔥🔥🚀" + `${k[l]}`
      );
      j = 0;
      if (l < 4) {
        l++;
      } else {
        l = 0;
      }
    }

    const newPage = await browser.newPage();
    await newPage.goto(jobArray[i].jobUrl);
    //optional deleting since the jobUrl is no longer needed
    //check if the #applynowbutton exists and then click on it
    const applyNowButton = await newPage.$("#applynowbutton");
    if (applyNowButton) {
      await applyNowButton.evaluate((b) => b.click());
      await newPage.waitForSelector("#howtoapply");
    }
    //load the html from the new page and use cheerio to select the howToApply
    const newHtml = await newPage.content();
    const $$ = cheerio.load(newHtml);

    await newPage.waitForSelector("#howtoapply");
    const howToApply = $$("#howtoapply > p > a").text();
    if (howToApply) {
      //add the howToApply to the job object
      jobArray[i].howToApply = howToApply;
      console.log("Scraped email " + howToApply);
    } else {
      //delete the job object if there is no howToApply and continue the loop
      delete jobArray[i];
      console.log("howToApply is null");
      continue;
    }
    //close the new page
    await newPage.close();
  }

  //send emails to the howToApply addresses using nodemailer
  if (sendEmails) {
    const nodemailer = require("nodemailer");
    console.log("Nodemailer initialized 🏃‍♂️");
    //setTimeout to know when the emails are begining to be sent
    setTimeout(() => {
      console.log("Sending emails 📧");
    }, timeout * 2 + 1000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${email}`,
        pass: `${password}`,
      },
    });

    for (let i = 0; i < jobArray.length; i++) {
      //set timeout to avoid spamming the email server
      await new Promise((resolve) => setTimeout(resolve, timeout * 2 + 1000));
      console.log(
        `Sending 📧 ${i} of ${jobArray.length} to ${jobArray[i].howToApply}`
      );

      //replace the placeholders in the email.html file with the job information
      const updatedTemplate = template
        .replace("{{emailTitleLine1}}", emailTitleLine1)
        .replace("{{emailTitleLine2}}", emailTitleLine2)
        .replace("{{name}}", name)
        .replace("{{name2}}", name)
        .replace("{{phone}}", phone)
        .replace("{{email}}", email)
        .replace("{{jobTitle}}", jobArray[i].jobTitle)
        .replace("{{business}}", jobArray[i].business)
        .replace("{{business2}}", jobArray[i].business)
        .replace("{{business3}}", jobArray[i].business)
        .replace("{{message}}", message)
        .replace("{{facebook}}", facebook)
        .replace("{{linkedin}}", linkedin)
        .replace("{{twitter}}", twitter)
        .replace("{{profilePic}}", profilePic)
        .replace("{{skills1}}", skills[0])
        .replace("{{skills2}}", skills[1])
        .replace("{{skills3}}", skills[2])
        .replace("{{skills4}}", skills[3])
        .replace("{{skills5}}", skills[4])
        .replace("{{skills6}}", skills[5]);

      const mailOptions = {
        from: `${name}`,
        to: `${jobArray[i].howToApply}`,
        subject:
          "" +
          jobArray[i].jobTitle +
          " job position at " +
          jobArray[i].business +
          "",
        //use the index.html file as the email body and replace the placeholders with the job information
        html: updatedTemplate,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log("Email sent to " + jobArray[i].howToApply + "✔️");
    }
    console.log("Emails sent to " + jobArray.length + " people 😺");
  }

  //optional save the jobArray to a sqlite database
  if (saveToDb) {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database("jobs.db");

    console.log("Database initialized");
    db.serialize(function () {
      db.run(
        "CREATE TABLE IF NOT EXISTS jobs (jobTitle TEXT, business TEXT, salary TEXT, location TEXT, jobUrl TEXT, howToApply TEXT)"
      );

      const stmt = db.prepare("INSERT INTO jobs VALUES (?, ?, ?, ?, ?, ?)");
      for (let i = 0; i < jobArray.length; i++) {
        if (jobArray[i]) {
          console.log(`Adding job ${i} to database`);
          stmt.run(
            jobArray[i].jobTitle,
            jobArray[i].business,
            jobArray[i].salary,
            jobArray[i].location,
            jobArray[i].jobUrl,
            jobArray[i].howToApply
          );
          console.log(`Job ${i} of ${jobArray.length} added to database 💽`);
        }
      }
      stmt.finalize();
    });
    db.close();
    //setTimeout to know when the database is closed
    console.log("Database saved 🤖");
    await new Promise((resolve) => setTimeout(resolve, timeout + 1000 * 2));
  }

  //optional save the jobArray to a csv file
  if (saveToCSV) {
    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: "jobs.csv",
      header: [
        { id: "jobTitle", title: "Job Title" },
        { id: "business", title: "Business" },
        { id: "salary", title: "Salary" },
        { id: "location", title: "Location" },
        { id: "jobUrl", title: "Job URL" },
        { id: "howToApply", title: "Email" },
      ],
    });

    csvWriter.writeRecords(jobArray).then(() => console.log("Saved to CSV 📝")).catch((err) => console.log(err));
  }

  //close the browser and end the program
  await browser.close();
  console.log("Thank you for using CanadaJobScraper by GuillermoMedel.com ☕");
  console.log("Browser closed 👋");
})();
