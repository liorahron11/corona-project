import { Model, model, Schema, Document } from "mongoose";

export interface IMapItem extends Document {
  _id: String;
  actionType: Number;
  entity: Object;
  saved: Boolean;
}

const mapItemsSchema: Schema = new Schema(
  {
    _id: String,
    actionType: Number,
    entity: Object,
    saved: Boolean,
  },
  {
    collection: "MapItems",
    versionKey: false,
  }
);

mapItemsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});

const MapItemModel: Model<IMapItem> = model("MapItems", mapItemsSchema);

export default MapItemModel;
