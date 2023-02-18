const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const route = require("./src/routes");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/project3", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = 3009;

route(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
