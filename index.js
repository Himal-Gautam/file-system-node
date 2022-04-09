import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as fs from "fs";
dotenv.config();
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("Welcome to file system api");
});

app.get("/create-file", function (request, response) {
  let dir = "./files";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();

  // create-file
  fs.writeFileSync(
    "./files/date-time.txt",
    year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds,
      // console.log(chalk.green("added!"))
    response.send("File created successfully")
  );
});

app.get("/retrieve-files", function (request, response) {
  let dir = "./files";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // retrieve all files from dir
  fs.readdir(
    dir,(err, files) => {
      if (err)
        console.log(err);
      else {
        console.log("\nCurrent directory filenames:");
        files.forEach(file => {
          console.log(file);
        })
        response.send(`Current directory  (${dir}) filenames:\n${files};`)
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server is started in ${PORT}`));
