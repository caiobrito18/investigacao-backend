const mongoose = require("mongoose");
const FileSchema = require("./model");

require("dotenv").config();

const conn = mongoose.createConnection(process.env.MONGO_ACCESS);
const FileModel = conn.model("files", FileSchema);

module.exports = {
  create: function CreateFile(req) {
    console.log(req);
    const FileDoc = new FileModel({
      filename: req.originalname,
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
};
