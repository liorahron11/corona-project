"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MapItemsService_1 = require("../Services/MapItemsService");
var router = express_1.default.Router();
router.get("/", function (req, res) {
    MapItemsService_1.getAll().then(function (mapItemsList) {
        res.send(mapItemsList);
    });
});
module.exports = router;
