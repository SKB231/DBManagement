const axios = require("axios");
const records = require("../Model/model").user;

exports.homeRoutes = (req, res) => {
    //Make a get request to /api/users

    (async (req, res) => {
        try {
            const allUsers = await records.find({ ownerName: req.user.name });
            console.log(allUsers);
            res.render("index", {
                users: allUsers,
                userName: req.user.name,
            });
        } catch (err) {
            res.send(err);
        }
    })(req, res);
};

exports.add_user = (req, res) => {
    res.render("add_user", {
        userName: req.user.name,
    });
};

exports.update_user = (req, res) => {
    (async (req, res) => {
        try {
            const targetRecord = await records.findById(req.query.id);
            console.log(targetRecord);
            res.render("update_user", {
                user: targetRecord,
                id: req.query.id,
                userName: req.user.name,
            });
        } catch (err) {
            res.send(err);
        }
    })(req, res);

    // axios
    //     .get("http://localhost:3000/api/users?id=" + req.query.id)
    //     .then((response) => {
    //         console.log(response.data);
    //         res.render("update_user", {
    //             user: response.data,
    //             id: req.query.id,
    //             userName: req.user.name,
    //         });
    //     });
};

exports.loginPage = (req, res) => {
    res.render("login");
};

exports.registerPage = (req, res) => {
    res.render("register");
};
