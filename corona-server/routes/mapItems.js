const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  clean,
  addList,
} = require("../Services/MapItemsService");

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

router.post("/", (req, res) => {
  clean()
    .then(() => {
      addList(req.body.list)
        .then(() => {
          res.status(200).send();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send(err.message);
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

module.exports = router;
