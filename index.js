const { json } = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.json());

var contactList = [
  {
    name: "Gyan",
    phone: "123123123",
  },
  {
    name: "prakash",
    phone: "12312312323",
  },
  {
    name: "kumar",
    phone: "389434394349",
  },
];

app.get("/gyan", (req, res) => {
  console.log(res);
  return res.render("home", {
    title: "this is gyan",
  });
});

app.get("/", (req, res) => {
  return res.render("contact", {
    contactList,
  });
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  contactList.push({
    name: req.body.name,
    phone: req.body.phone,
  });
  return res.redirect("/");
});

// app.delete("/delete-contact", (req, res) => {
//   console.log(req.body);
// });

app.listen(8000, (err) => {
  if (err) {
    console.log("Error on firing up the server", err.message);
  }
  console.log(`Server is running on port ${8000}`);
});
