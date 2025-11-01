import express from "express";
import path from "node:path";
import morgan from "morgan";
import { addTip, dislike, getTips, like, remove } from "./data";
import { TTip } from "./types";
import { RandomUUIDOptions } from "node:crypto";

const app = express();
const PORT = 3000;

// Use EJS Instead of HTML
app.set("view engine", "ejs");

// Use Morgan for Logging
app.use(morgan("dev"));

// Get Access to Incoming Form Data using req.body
app.use(express.urlencoded({ extended: true }));

// Serve static content like css or site logo from public
app.use(express.static("public"));

app.get("/", (req, res) => {
  const tips = getTips();
  res.render("index", { tips });
});

// Create
  // DONE: 🚀 Get incoming tip text from form
  app.post("/tips", (req, res) => {
    let tipTitle = req.body.text;
    // DONE: 🚀 Check if it's empty.
    if (tipTitle === "") {
      console.log("Tip title cannot be empty");
      res.send("Tip title cannot be empty");
    } else {
      addTip(tipTitle);
      res.redirect("/");
    }
  }

  // DONE: 🚀 If it's not empty, send it to addTip() function.
  // DONE: 🚀 redirect to homepage

);

// Like/Dislike/Delete
app.post("/tips/:id/like", (req, res) => {
  // DONE: 🚀 get id from url params and feed to like function
  let tipId: string = req.params.id;
  like(tipId);
  res.redirect("/");
});

app.post("/tips/:id/dislike", (req, res) => {
  // DONE: 🚀 get id from url params and feed to dislike function
  // DONE: 🚀 redirect to homepage
  let tipId: string = req.params.id;
  dislike(tipId);
  res.redirect("/")
});

app.post("/tips/:id/delete", (req, res) => {
  // DONE: 🚀 get id from url params and feed to delete function
  let tipdId: string = req.params.id;
  remove(tipdId);
  // DONE: 🚀 redirect to homepage
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`
🚀 http://localhost:${PORT}`);
});
