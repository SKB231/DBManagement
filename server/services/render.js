const axios = require("axios");

exports.homeRoutes = (req, res) => {
    //Make a get request to /api/users
    axios
        .get("http://localhost:3000/api/users")
        .then((response) => {
            res.render("index", { users: response.data });
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.add_user = (req, res) => {
    res.render("add_user");
};

exports.update_user = (req, res) => {
    axios
        .get("http://localhost:3000/api/users?id=" + req.query.id)
        .then((response) => {
            console.log(response.data);
            res.render("update_user", {
                user: response.data,
                id: req.query.id,
            });
        });
};


exports.loginPage = (req,res) => {
    res.render("login");
}

exports.registerPage = (req,res) => {
    res.render("register");
}