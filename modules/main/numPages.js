export const numPages = async (page, numberOfPages, timeout) => {
  await page.click("#searchButton");
  await page.waitForSelector("#moreresultbutton");

  // click on the #moreresultbutton to load more results up to the numberOfPages
  for (let i = 1; i <= numberOfPages - 1; i++) {
    await page.waitForTimeout(timeout);
    const moreButton = await page.$("#moreresultbutton");
    if (moreButton) {
      await moreButton.evaluate((b) => b.click());
      console.log(i + " 📄(s) loaded out of " + numberOfPages);
      await page.waitForTimeout(timeout);
    } else {
      console.log(`No more results after ${i--} pages 😔`);
      console.log(`Setting the number of pages to ${i--}`);
      //await timout(1000);
      (await page.waitForTimeout(timeout)) * 7;
      numberOfPages = i - 1;
    }
  }
};
