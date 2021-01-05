"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MapItemsService_1 = require("../Services/MapItemsService");
var router = express_1.Router();
router.get("/", function (req, res) {
    MapItemsService_1.getAll().then(function (mapItemsList) {
        res.send(mapItemsList);
    });
});
exports.default = router;
