const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FileSchema = new Schema({
  id: ObjectId,
  hash: String,
  oname: String,
  file64: String,
  client: String,
  tags: [],
});

module.exports = FileSchema;
