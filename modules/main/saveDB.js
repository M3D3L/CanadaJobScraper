import sqlite3 from "sqlite3";

export const saveDB = async (jobArray, timeout) => {
  
  const db = new sqlite3.Database("jobs.db");

  console.log("Database initialized");
  db.serialize(function () {
    db.run(
      "CREATE TABLE IF NOT EXISTS jobs (jobTitle TEXT, business TEXT, salary TEXT, location TEXT, jobUrl TEXT, email TEXT, date TEXT)"
    );
    
    //inserts the jobArray into the database
    const stmt = db.prepare("INSERT INTO jobs VALUES (?, ?, ?, ?, ?, ?, ?)");
    for (let i = 0; i < jobArray.length; i++) {
      if (jobArray[i].email !== null && jobArray[i].email !== undefined && jobArray[i].email.includes("@") && !jobArray[i].email.includes("www.") && !jobArray[i].email.includes("http")) {
        stmt.run(
          jobArray[i].jobTitle,
          jobArray[i].business,
          jobArray[i].salary,
          jobArray[i].location,
          jobArray[i].jobUrl,
          jobArray[i].email,
          jobArray[i].date
        );
        console.log(`Job ${i + 1} of ${jobArray.length} added to database 💽`);
      } else {
        console.log(`Job ${i + 1} is invalid and was skipped 🤖`);
      }
    }
    stmt.finalize();
  });
  db.close();
  
  //setTimeout to know when the database is closed
  console.log("Database saved 🤖");
  await new Promise((resolve) => setTimeout(resolve, timeout + 1000 * 2));
};
