async function sqliteToJson(dbFile, selectSql) {
  // Load the sqlite3 module
  const sqlite3 = require('sqlite3').verbose();

  const db = new sqlite3.Database(dbFile);

  try {
    // Get the data
    const data = await new Promise((resolve, reject) => {
      db.all(selectSql, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

  }
  catch (err) {
    console.log(err);
  }  
}

// Call the function
sqliteToJson('jobs.db', 'SELECT * FROM jobs');