"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mapItemsSchema = new mongoose_1.Schema({
    _id: String,
    actionType: Number,
    entity: Object,
    saved: Boolean,
}, {
    collection: "MapItems",
    versionKey: false,
});
mapItemsSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
var MapItemModel = mongoose_1.model("MapItems", mapItemsSchema);
exports.default = MapItemModel;
