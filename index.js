const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/gyan", (req, res) => {
  res.send("Hello gyan");
});

app.listen(8000, (err) => {
  if (err) {
    console.log("Error on firing up the server", err.message);
  }
  console.log(`Server is running on port ${8000}`);
});
