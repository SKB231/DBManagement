const localStrategy = require("passport-local").Strategy;
const profile = require("../model/model").profile;
const bcrypt = require("bcrypt");

const initialize = (passport, getUserByEmail, getUserById) => {
    console.log("Hello");
    const authenticateUser = async (email, password, done) => {
        // const user = getUserByEmail(email);

        profile.findOne(
            { email: email },
            "name email password",
            function (err, user) {
                if (!user) {
                    return done(null, false, {
                        message: "No User with that email was found",
                    });
                }
                try {
                    console.log(
                        password,
                        user.password,
                        password === user.password
                    );
                    // if (await bcrypt.compare(password, user.password)) {
                    if (password === user.password) {
                        console.log("AUTHENTICATED");
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Password Incorrect",
                        });
                    }
                } catch (err) {
                    return done(err);
                }
            }
        );
    };

    passport.use(
        new localStrategy({ usernameField: "email" }, authenticateUser)
    );
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user.name);
    });
    passport.deserializeUser((name, done) => {
        profile.findOne(
            { name: name },
            "name email password",
            function (err, user) {
                if (err) {
                    return done(err);
                }
                done(null, user);
            }
        );
    });
};
module.exports = initialize;
