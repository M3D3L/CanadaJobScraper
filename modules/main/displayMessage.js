export const displayMessage = async (jobTitle, province, timeout, page) => {
  if (jobTitle !== "") {
    await page.type("#searchString", jobTitle);
    if (province !== "") {
      await page.type("#locationstring", province);
      console.log("Searching for " + jobTitle + " in " + province + " 🇨🇦🍁🦫🏒");
    } else {
      console.log(
        "Searching for " + jobTitle + " jobs in all of Canada 🇨🇦🍁🦫🏒"
      );
    }
  } else if (province !== "") {
    console.log("Searching for all jobs in " + province + " 🇨🇦🍁🦫🏒");
  } else {
    console.log("Searching for all jobs in Canada 🇨🇦🍁🦫🏒");
  }
  //set a timeout to see the message
  await page.waitForTimeout(timeout * 4);
};
