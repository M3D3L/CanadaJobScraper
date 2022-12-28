import cheerio from 'cheerio';

export const runScraper = async (
  jobArray, page, baseUrl, browser
) => {
  //loads the html from the page and uses cheerio to select the jobs from the page
  const html = await page.content();

  const $ = cheerio.load(html);
  const jobList = $("article");

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
};
