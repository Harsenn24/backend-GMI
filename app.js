require("dotenv").config();
const express = require("express");
const app = express();
const port = 4040;
const { connect_db } = require("./config/index");
const { router } = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

connect_db().then(async (db) => {
  console.log("Success Connected to MongoDB!");
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
