export const numPages = async (page, numberOfPages, timeout) => {
  // click on the #moreresultbutton to load more results up to the numberOfPages
  for (let i = 0; i <= numberOfPages - 1; i++) {
    await page.waitForTimeout(timeout);
    const moreButton = await page.$("#moreresultbutton");
    if (moreButton) {
      await moreButton.evaluate((b) => b.click());
      console.log( (i + 1) + " 📄(s) loaded out of " + numberOfPages);
      await page.waitForTimeout(timeout);
    } else {
      console.log(`No more results after ${i--} pages 😔`);
      console.log(`Setting the number of pages to ${i--}`);
      //await timout(1000);
      await page.waitForTimeout(timeout * 7);
      numberOfPages = i - 1;
    }
  }
};
