const MarkerModel = require("../Models/MarkerModel");

const getAll = () => {
  return MarkerModel.find();
};

const getById = (id) => {
  return MarkerModel.findOne({ _id: id });
};

module.exports = {
  getAll: getAll,
  getById: getById,
};
