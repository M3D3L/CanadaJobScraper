export const displayMessage = async (jobTitle, province, timeout, page) => {
  if (jobTitle !== "" && province !== "") {
    if (province !== "") {
      await page.type("#locationstring", province);
      console.log(
        "Searching for " + jobTitle + " jobs in " + province + " 🇨🇦🍁🦫🏒"
      );
    } else {
      console.log(
        "Searching for " + jobTitle + " jobs in all of Canada 🇨🇦🍁🦫🏒"
      );
    }
    await page.type("#searchString", jobTitle);
  } else if (province !== "") {
    console.log("Searching for all jobs in " + province + " 🇨🇦🍁🦫🏒");
  } else {
    console.log("Searching for all jobs in Canada 🇨🇦🍁🦫🏒");
  }
  //set a timeout to see the message and let the page load
  await page.waitForTimeout(timeout * 4);
};
