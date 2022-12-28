export const pushToArray = (jobArray, jobList, $, baseUrl) => {
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
    //let salary = remove any white space
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

    console.log(i + 1 + " job(s) loaded");
  }
};
