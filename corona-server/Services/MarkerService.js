const MarkerModel = require("../Models/MarkerModel");

const getAll = () => {
  return MarkerModel.find();
};

const getById = (id) => {
  return MarkerModel.findOne({ _id: id });
};

const addList = (markersList) => {
  return MarkerModel.insertMany(markersList);
};

const clean = () => {
  return MarkerModel.deleteMany({});
};

module.exports = {
  getAll: getAll,
  getById: getById,
  clean: clean,
  addList: addList,
};
