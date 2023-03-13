export const scrapeNewPage = async (jobArray, i, browser, cheerio) => {
  //open a new page and go to the jobUrl
  const newPage = await browser.newPage();
  await newPage.goto(jobArray[i].jobUrl);

  //check if the #applynowbutton exists and then click on it
  const applyNowButton = await newPage.$("#applynowbutton");
  if (applyNowButton) {
    await applyNowButton.evaluate((b) => b.click());
    await newPage.waitForSelector("#howtoapply");
  }
  //load the html from the new page and use cheerio to select the howToApply
  const newHtml = await newPage.content();
  const $$ = cheerio.load(newHtml);

  // await newPage.waitForSelector("#howtoapply");
  const email = $$("#howtoapply > p > a").text();

  //add the email to the job object
  jobArray[i].email = email;
  if (
    jobArray[i].email !== null &&
    jobArray[i].email !== undefined &&
    jobArray[i].email.includes("@") &&
    !jobArray[i].email.includes("www.") &&
    !jobArray[i].email.includes("http")
  ) {
    console.log("Scraped email " + email);
  } else {
    //delete the job from the jobArray
    jobArray.splice(i, 1);

    //decrement the index to avoid skipping a job
    
    console.log("email is null or invalid and was deleted");
    i = i - 1;
  }

  //close the new page
  await newPage.close();
};
