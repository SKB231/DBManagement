const express = require("express");
const controller = require("../Controller/controller");
const initializePassport = require("../Controller/passportConfig");
const router = express.Router();
const services = require("../services/render");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const profileModel = require("../Model/model").profile;

function checkAuthenticatd(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

const users = [
    {
        name: "SKB",
        email: "w@w",
        password: "abc",
    },
    {
        name: "SKB",
        email: "c@c",
        password:
            "$2b$10$A1DNz91fb8uA/9yM5Vywr.AkPghC6GXemgS3wjduRplToVmD4T2jy",
    },
];

router.use(flash());
router.use(
    session({
        secret: "f48bcf9a1aef081f1eab7933461f4ce0b8ec99b1735692b19c9d54971ff769b6d3a6178eb55b43816ff941cf3f01e484c0f4b8b5c401f132b3316a9a9986e53d",
        resave: false,
        saveUninitialized: false,
    })
);

initializePassport(
    passport,
    (email) => {
        return users.find((user) => user.email === email);
    },
    (name) => {
        return users.find((user) => user.name === name);
    }
);
router.use(passport.initialize());
router.use(passport.session());

router.get("/", checkAuthenticatd, services.homeRoutes);
router.get("/add-user", checkAuthenticatd, services.add_user);
router.get("/update-user", checkAuthenticatd, services.update_user);

router.get("/login", checkNotAuthenticated, services.loginPage);
router.get("/register", checkNotAuthenticated, services.registerPage);

//API
router.post("/api/users", checkAuthenticatd, controller.create);
router.get("/api/users/", checkAuthenticatd, controller.find);
router.put("/api/users/:id", checkAuthenticatd, controller.upd);
router.delete("/api/users/:id", checkAuthenticatd, controller.del);

//PASSPORT AUTHENTICATION
router.post("/api/register", checkNotAuthenticated, controller.register);
router.post(
    "/api/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })
);
router.post("/api/logout", checkAuthenticatd, (req, res) => {
    req.logout();
    res.redirect("/login");
});

module.exports = router;
