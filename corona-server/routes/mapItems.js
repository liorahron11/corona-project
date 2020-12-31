const express = require("express");
const router = express.Router();
const { getAll, getById } = require("../Services/MapItemsService");

router.get("/", (req, res) => {
  getAll().then((markers, err) => {
    if (err) {
      console.error(err);
      res.status(500).send(err.message);
    }

    res.send(markers);
  });
});

module.exports = router;
