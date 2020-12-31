const MapItemModel = require("../Models/MapItemModel");

const getAll = () => {
  return MapItemModel.find();
};

const addList = (mapItemsList) => {
  return MapItemModel.insertMany(mapItemsList);
};

const clean = () => {
  return MapItemModel.deleteMany({});
};

module.exports = {
  getAll,
  clean,
  addList,
};
