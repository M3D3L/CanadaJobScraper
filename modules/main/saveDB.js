import sqlite3 from "sqlite3";

export const saveDB = async (jobArray, timeout) => {
  
  const db = new sqlite3.Database("jobs.db");

  console.log("Database initialized");
  db.serialize(function () {
    db.run(
      "CREATE TABLE IF NOT EXISTS jobs (jobTitle TEXT, business TEXT, salary TEXT, location TEXT, jobUrl TEXT, email TEXT)"
    );
    
    //inserts the jobArray into the database
    const stmt = db.prepare("INSERT INTO jobs VALUES (?, ?, ?, ?, ?, ?)");
    for (let i = 0; i < jobArray.length; i++) {
      if (jobArray[i]) {
        console.log(`Adding job ${i} to database`);
        stmt.run(
          jobArray[i].jobTitle,
          jobArray[i].business,
          jobArray[i].salary,
          jobArray[i].location,
          jobArray[i].jobUrl,
          jobArray[i].email
        );
        console.log(`Job ${i} of ${jobArray.length} added to database 💽`);
      }
    }
    stmt.finalize();
  });
  db.close();
  
  //setTimeout to know when the database is closed
  console.log("Database saved 🤖");
  await new Promise((resolve) => setTimeout(resolve, timeout + 1000 * 2));
};
