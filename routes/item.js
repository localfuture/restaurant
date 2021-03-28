const express = require("express");

const itemController = require("../controllers/item");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, itemController.createItem);

router.put("/:id", checkAuth, extractFile, itemController.updateItem);

router.get("/:id", checkAuth, itemController.getItem);

router.delete("/:id", checkAuth, itemController.deleteItem);

module.exports = router;
