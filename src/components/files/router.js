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
    tags = tags.split(" ");
    const file = await File.create({
      name,
      tags,
      client,
      size,
      key,
      url,
    });

    return res.json(file);
    // console.log(req.body);
    // res.status(201).json(req.files);
    // next();
  }
);

// listing
router.get("/list", async (req, res, next) => {
  const Files = await controller.list().catch((err) => console.log(err));
  res.status(201).send(Files);
  next();
});

// Getting file
router.get("/preview", async (req, res, next) => {
  const pdffile = await controller
    .fileProvider(req.body)
    .catch((err) => console.log(err));
  res.status(201).send(pdffile);
  next();
});

// Delete file
router.delete("/delete", async (req, res, next) => {
  const deleted = await controller.delete(req.body);
  res.status(201).send(deleted);
  next();
});

module.exports = router;
