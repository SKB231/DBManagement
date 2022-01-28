const express = require("express");

const router = express.Router();
const services = require("../services/render");

router.get("/", services.homeRoutes);
router.get("/add-user", services.add_user);

module.exports = router;
