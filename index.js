const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Contact = require("./models/contact");
const app = express();

mongoose
  .connect("mongodb://localhost/contact")
  .then(() => console.log("Connected to mongodb database sucessfully"))
  .catch((err) => console.log("Error", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.static("assets"));

app.get("/", (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      console.log("Error in fetching data from db");
      return;
    }
    return res.render("contact", {
      contactList: contacts,
    });
  });
});

app.post("/add-contact", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
  });
  await contact.save();

  return res.redirect("/");
});

app.get("/delete-contact/:id", (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndDelete({ _id: id }, (err, contact) => {
    if (err) {
      console.log("Err", err);
      return;
    }
    return res.redirect("/");
  });
});

app.listen(8000, (err) => {
  if (err) {
    console.log("Error on firing up the server", err.message);
  }
  console.log(`Server is running on port ${8000}`);
});
