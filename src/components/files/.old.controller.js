const mongoose = require("mongoose");
const FileSchema = require("./model");
const crypto = require("crypto");

require("dotenv").config();

const conn = mongoose.createConnection(process.env.MONGO_ACCESS);
const FileModel = conn.model("files", FileSchema);

module.exports = {
  create: function CreateFile(req) {
    const buf = crypto.randomBytes(8);
    const hashName = `${buf.toString("hex")}-${req.originalName}`;
    console.log(hashName);
    const FileDoc = new FileModel({
      hash: hashName,
      oname: req.originalName,
      file64: req.file64,
      client: req.client,
      tags: req.tags,
    });
    FileDoc.save();
    const created = FileDoc;
    return created;
  },
  list: async function ListFiles() {
    const fileList = await FileModel.find();
    return fileList;
  },
  fileProvider: async function provide(req) {
    if (req.tags != undefined && req.client == undefined) {
      const taggedpdf = await FileModel.find({ tags: { $all: req.tags } });
      return taggedpdf;
    } else if (req.client != undefined && req.tags == undefined) {
      const clientpdf = await FileModel.find({ client: req.client });
      return clientpdf;
    } else {
      const bothpdf = await FileModel.find({
        client: req.client,
        tags: { $all: req.tags },
      });
      return bothpdf;
    }
  },
  delete: async function deleteFiles(req) {
    const fileList = await FileModel.deleteOne({
      hash: req.hash,
    });
    return fileList;
  },
};
