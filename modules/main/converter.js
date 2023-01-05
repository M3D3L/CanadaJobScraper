//running this file will convert the sqlite database to json
import sqlite3 from 'sqlite3';
import fs from 'fs';

async function sqliteToJson(dbFile, selectSql) {
  // Load the sqlite3 module

  const db = new sqlite3.Database(dbFile);

  try {
    // Get the data and write it to a file as json
    const data = await new Promise((resolve, reject) => {
      db.all(selectSql, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    fs.writeFileSync('jobs.json', JSON.stringify(data));
    
  }
  catch (err) {
    console.log(err);
  }  
}

// Call the function
sqliteToJson('jobs.db', 'SELECT * FROM jobs');