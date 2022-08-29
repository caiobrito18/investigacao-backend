const express = require("express");
const multer = require("multer");
const multerConfig = require("../../config/multer");
const File = require("./model");
const router = express.Router();

// upload
router.post(
  "/upload",
  multer(multerConfig).single("pdf"),
  async (req, res, next) => {
    const { originalname: name, size, key, location: url = "" } = req.file;
    let { client, tags } = req.body;
    tags = tags.split(";");
    const file = await File.create({
      name,
      tags,
      client,
      size,
      key,
      url,
    });
    res.status(201).json(file);
  }
);

// listing
router.get("/list", async (req, res, next) => {
  const Files = await File.find();
  res.status(201).send(Files);
  next();
});

// Getting file
router.get("/preview", async (req, res, next) => {
  const file = req.body;
  if (file.tags != undefined && file.client == undefined) {
    const taggedpdf = await File.find({ tags: { $all: file.tags } });
    res.status(201).send(taggedpdf);
    next();
  } else if (file.client != undefined && file.tags == undefined) {
    const clientpdf = await File.find({ client: file.client });
    res.status(201).send(clientpdf);
    next();
  } else {
    const bothpdf = await File.find({
      client: file.client,
      tags: { $all: file.tags },
    });
    res.status(201).send(bothpdf);
    next();
  }
});

// Delete file
router.delete("/delete", async (req, res, next) => {
  const file = req.body;
  const type = file.type;
  const value = file.value;
  const deleted = await File.deleteOne({
    type: value,
  });
  res.status(204).send(deleted);
  next();
});

module.exports = router;
