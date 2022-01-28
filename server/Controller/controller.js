let userDB = require("../model/model");

//Create and save new user
const create = (req, res) => {
    console.log(req.body);
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
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occured in the CREATE operation",
            });
        });
};

//Retrieve and return all users/retrive and return a single user
const find = (req, res) => {};

//Update a new user identified by the user id.
const upd = (req, res) => {};

//Delete a user with a specified user id in the request.
const del = (req, res) => {};

module.exports = {
    create: create,
    find: find,
    del: del,
    upd: upd,
};
