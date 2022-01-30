const localStrategy = require("passport-local").Strategy;
const profile = require("../model/model").profile;
const bcrypt = require("bcrypt");

const initialize = (passport, getUserByEmail, getUserById) => {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: "No with that email found" });
        }
        try {
            console.log(password, user.password, password === user.password);
            // if (await bcrypt.compare(password, user.password)) {
            if (password === user.password) {
                console.log("AUTHENTICATED");
                return done(null, user);
            } else {
                return done(null, false, { message: "Password Incorrect" });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(
        new localStrategy({ usernameField: "email" }, authenticateUser)
    );
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.name);
    });
    passport.deserializeUser((name, done) => {
        return done(null, getUserById(name));
    });
};
module.exports = initialize;
