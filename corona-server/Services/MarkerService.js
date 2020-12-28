const MarkerModel = require("../Models/MarkerModel");
const mongoose = require("mongoose");

const getAll = () => {
  return MarkerModel.find();
};

const getById = (id) => {
  return MarkerModel.findOne({ _id: id });
};

const addList = (markersList) => {
  markersList.map((marker) => {
    marker._id = mongoose.Types.ObjectId();
  });

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
