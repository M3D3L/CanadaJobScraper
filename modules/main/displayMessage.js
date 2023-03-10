export const displayMessage = async (jobTitle, province, timeout, page) => {
  await page.type("#locationstring", province);
  await page.type("#searchString", jobTitle);
  if (jobTitle !== "") {
    if (province !== "") {
      console.log(
        "Searching for " + jobTitle + " jobs in " + province + " đ¨đĻđđĻĢđ"
      );
    } else {
      console.log(
        "Searching for " + jobTitle + " jobs in all of Canada đ¨đĻđđĻĢđ"
      );
    }
  } else if (province !== "") {
    console.log("Searching for all jobs in " + province + " đ¨đĻđđĻĢđ");
  } else {
    console.log("Searching for all jobs in Canada đ¨đĻđđĻĢđ");
  }
  //set a timeout to see the message and let the page load
  await page.waitForTimeout(timeout * 4);
  await page.click("#searchButton");
  await page.waitForSelector("#moreresultbutton");
};
