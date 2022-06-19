const express = require("express");
const controller = require("./controller");
const router = express.Router();

// upload
router.post("/upload", async (req, res, next) => {
  await controller.create(req.body);
  res.status(201).send(req.body);
  next();
});

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
