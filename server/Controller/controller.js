let userDB = require("../model/model");

//Create and save new user
const create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    //New User object
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    // save the new user object in the database
    user.save(user)
        .then((data) => {
            console.log(data);
            res.redirect("/");
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured in the CREATE operation",
            });
        });
};

//Retrieve and return all users/retrive and return a single user
const find = (req, res) => {
    (req.query.id ? userDB.findById(req.query.id) : userDB.find())
        .then((user) => {
            res.send(user);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error occured while READ operation",
            });
        });
};

//Update a new user identified by the user id.
const upd = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty." });
    }
    const id = req.params.id;
    userDB
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Unable" });
            } else {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured in the CREATE operation",
            });
        });
};

//Delete a user with a specified user id in the request.
const del = (req, res) => {
    const id = req.params.id;
    userDB
        .findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Unable" });
            } else {
                res.send({ message: "User was deleted successful" });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured in the CREATE operation",
            });
        });
};

module.exports = {
    create: create,
    find: find,
    del: del,
    upd: upd,
};
