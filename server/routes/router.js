const express = require("express");
const controller = require("../Controller/controller");

const router = express.Router();
const services = require("../services/render");

router.get("/", services.homeRoutes);
router.get("/add-user", services.add_user);

//API
router.post("/api/users", controller.create);
router.get("/api/users", controller.find);
router.put("/api/users/:id", controller.upd);
router.delete("/api/users/:id", controller.del);

module.exports = router;
