const mongoose = require("mongoose");

const markerSchema = new mongoose.Schema(
  {
    name: String,
    position: Object,
    flyPosition: Object,
  },
  {
    collection: "markers",
  }
);

module.exports = mongoose.model("markers", markerSchema);
