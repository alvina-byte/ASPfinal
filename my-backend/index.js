const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database('./tasks.db', function(err){
    if (err) {
        console.error(err);
        process.exit(1); //Bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
      }
});

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })