const mongoose = require("mongoose");

const mapItemsSchema = new mongoose.Schema(
  {
    _id: String,
    actionType: Number,
    entity: Object,
  },
  {
    collection: "MapItems",
    versionKey: false,
  }
);

mapItemsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("MapItems", mapItemsSchema);
