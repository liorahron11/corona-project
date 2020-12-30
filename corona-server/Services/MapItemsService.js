const MapItemModel = require("../Models/MapItemModel");

const getAll = () => {
  return MapItemModel.find();
};

const getById = (id) => {
  return MapItemModel.findOne({ _id: id });
};

const addList = (mapItemsList) => {
  return MapItemModel.insertMany(mapItemsList);
};

const clean = () => {
  return MapItemModel.deleteMany({});
};

module.exports = {
  getAll: getAll,
  getById: getById,
  clean: clean,
  addList: addList,
};
