const express = require("express");
const controller = require("../Controller/controller");
const bcrypt = require("bcrypt");

const router = express.Router();
const services = require("../services/render");

router.get("/", services.homeRoutes);
router.get("/add-user", services.add_user);
router.get("/update-user", services.update_user);

router.get("/login", services.loginPage);
router.get("/register", services.registerPage);

const users = [];
let profModel = require("../model/model").profile;

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let newUser = new profModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        // res.redirect("/login");
        console.log("REACHED HERE", newUser);
        newUser
            .save(newUser)
            .then((data) => {
                console.log(data);
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occured in the CREATE operation",
                });
            });
        // res.send();
    } catch (err) {
        res.sendStatus(400).json({
            message: err,
        });
        // res.redirect("/register");
    }
});

//API
router.post("/api/users", controller.create);
router.get("/api/users/", controller.find);
router.put("/api/users/:id", controller.upd);
router.delete("/api/users/:id", controller.del);

module.exports = router;
