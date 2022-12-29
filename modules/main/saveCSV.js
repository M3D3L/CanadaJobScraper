import fs from "fs";

export const saveCSV = async (jobArray, timeout) => {
  let csv = "jobTitle, business, salary, location, jobUrl, email, date \n";
  for (let i = 0; i < jobArray.length; i++) {
    if (
      jobArray[i].email !== null &&
      jobArray[i].email !== undefined &&
      jobArray[i].email.includes("@") &&
      !jobArray[i].email.includes("www.") &&
      !jobArray[i].email.includes("http")
    ) {
      csv +=
        jobArray[i].jobTitle +
        "," +
        jobArray[i].business +
        "," +
        jobArray[i].salary +
        "," +
        jobArray[i].location +
        "," +
        jobArray[i].jobUrl +
        "," +
        jobArray[i].email +
        "," +
        jobArray[i].date +
        "\n";
    } else {
      console.log(`Job ${i + 1} is invalid and was skipped 🤖`);
      //delete the job from the jobArray
      jobArray.splice(i, 1);
      //decrement the index to avoid skipping a jobs
      i--;
    }
  }

  //write the csv file to the root folder
  fs.writeFile("jobs.csv", csv, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("jobs.csv saved 📄");
  });

  //setTimeout to know when the csv file is saved
  await new Promise((resolve) => setTimeout(resolve, timeout + 1000 * 2));
};
