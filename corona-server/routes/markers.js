const express = require("express");
const router = express.Router();
const { getAll, getById } = require("../Services/MarkerService");

router.get("/", (req, res) => {
  getAll().then((markers, err) => {
    if (err) {
      console.error(err);

      res.status(500).send(err.message);
    }

    res.send(markers);
  });
});

// Get marker by id
router.get("/:id", (req, res) => {
  getById(req.params.id).then((marker, err) => {
    if (err) {
      console.error(err);

      res.status(500).send(err.message);
    }

    res.send(marker);
  });
});

module.exports = router;
