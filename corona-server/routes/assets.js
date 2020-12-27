const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/map-marker", (req, res) => {
  res.sendFile(path.join(__dirname, "../assets/map-marker.png"));
});

module.exports = router;
