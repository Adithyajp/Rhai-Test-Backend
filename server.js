const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Countries = require("./models/countries");
const Classes = require("./models/classes");
const Students = require("./models/students");
app = express();

//Database connection
const url =
  "mongodb+srv://adithyajpp:cZAn4pLOHfVrzN7N@cluster0.lpuyqvw.mongodb.net/rihal";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database Connected");
});

require("dotenv").config();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

///Countries APIs
app.get("/countries", async (req, res) => {
  const data = await Countries.find({});
  return res.json(data);
});

app.post("/countries", async (req, res) => {
  console.log(req.body);
  const data = await Countries.create({ name: req.body.name });
  return res.json(data);
});

app.delete("/countries/:id", async (req, res) => {
  console.log(req.body);
  const check = await Students.findOne({ country_id: req.params.id });
  if (check === undefined || check === null) {
    const data = await Countries.deleteOne({  _id: req.params.id });
    return res.json(data);
  } else {
    console.log(check);
    return res
      .status(404)
      .send({ error: "Cannot delete country as students are assigned" });
  }
});

///Classes APIs
app.get("/classes", async (req, res) => {
  const data = await Classes.find({});
  return res.json(data);
});

app.post("/classes", async (req, res) => {
  console.log(req.body);
  const data = await Classes.create({ class_name: req.body.class_name });
  return res.json(data);
});

app.delete("/classes/:id", async (req, res) => {
  console.log(req.params.id);
  const check = await Students.findOne({ class_id: req.params.id });
  if (check === undefined || check === null) {
    const data = await Classes.deleteOne({ _id: req.params.id });
    return res.json(data);
  } else {
    console.log(check);
    return res
      .status(404)
      .send({ error: "Cannot delete class as students are assigned" });
  }
});

///Student APIs
app.get("/students", async (req, res) => {
  const data = await Students.find({});
  return res.json(data);
});

app.post("/students", async (req, res) => {
  console.log(req.body);
  const data = await Students.create({
    class_id: req.body.class_id,
    country_id: req.body.country_id,
    name: req.body.name,
    date_of_birth: req.body.date_of_birth,
  });
  return res.json(data);
});

app.delete("/students/:id", async (req, res) => {
  console.log(req.params.id);
  const data = await Students.deleteOne({ _id: req.params.id });
  return res.json(data);
});

const PORT = 8000;

const server = app.listen(PORT, () => {
  // const url = `http://localhost:${PORT}/`
  console.log(`Listening on ${PORT}`);
});
