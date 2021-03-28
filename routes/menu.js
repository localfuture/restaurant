const express = require("express");

const menuController = require("../controllers/menu");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, menuController.createMenu);

router.put("/:id", checkAuth, menuController.updataMenu);

router.get("/:id", checkAuth, menuController.getMenu);

router.delete("/:id", checkAuth, menuController.deleteMenu);

module.exports = router;
