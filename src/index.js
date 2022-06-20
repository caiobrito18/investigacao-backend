require("dotenv").config;
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fileRouter = require("./components/files/router");

const app = express();
mongoose.connect(process.env.MONGO_ACCESS, {
  useNewUrlParser: true,
});
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.Router());

app.use("/files", fileRouter);

app.listen(3333, () => {
  console.log("Working...");
});
