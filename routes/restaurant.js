const express = require("express");

const RestaurantController = require("../controllers/restaurant");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, RestaurantController.createRestaurant);

router.get("/all", checkAuth, RestaurantController.getAll);

router.put("/:id", checkAuth, RestaurantController.updataRestaurant);

router.get("/:id", checkAuth, RestaurantController.getRestaurant);

router.delete("/:id", checkAuth, RestaurantController.deleteRestaurant);

module.exports = router;
