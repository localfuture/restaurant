const express = require("express");

const RestaurantController = require("../controllers/restaurant");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, RestaurantController.createRestaurant);

router.put("/:id", checkAuth, RestaurantController.updataRestaurant);

router.get("/:id", checkAuth, RestaurantController.getRestaurant);

router.delete("/:id", checkAuth, RestaurantController.deleteRestaurant);

module.exports = router;
