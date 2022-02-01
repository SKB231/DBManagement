const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");
const router = require("./server/routes/router");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3000;

//dotEnv.config({path to your config.env file}) allows us to load the config.env contents into the process.env.
dotEnv.config({ path: "config.env" });

//logs requests and sends it to middleware.next();
app.use(morgan("tiny"));

//mongoDBConnection
connectDB();

//parses the body of the req.body from express requests.
app.use(bodyParser.urlencoded({ extended: true }));

//Set view engine as EJS. Thus by default, rendering will take place from the ejs files located relative to the views folder.
app.set("view engine", "ejs");

//load assets and use the corresponding virtual path prefixes for /css, /img, and /js respectively.
//Without the first argument, the url request to get a css asset will look like: localhost:3000/file.css instead of localhost:3000/css/file.css.
app.use("/css", express.static(path.resolve(__dirname, "assets", "css")));
app.use("/img", express.static(path.resolve(__dirname, "assets", "img")));
app.use("/js", express.static(path.resolve(__dirname, "assets", "js")));

app.use(router);

// const users = [];

// app.get("/users", (req, res) => {
//     res.json(users);
// });

// app.post("/users", async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const newUser = {
//             name: req.body.name,
//             password: hashedPassword,
//         };
//         users.push(newUser);
//         res.status(201).send();
//     } catch {
//         res.status(500).send();
//     }
// });

// app.post("/users/login", async (req, res) => {
//     const user = users.find((user) => user.name === req.body.name);
//     if (!user) {
//         res.status(400).send("Cannot find user");
//         return;
//     }
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             const userAccessToken = jwt.sign(
//                 user,
//                 process.env.ACCESS_TOKEN_SECRET
//             );
//             res.json({ userToken: userAccessToken });
//         }
//     } catch {
//         console.log("Incorrect Password");
//         res.status(500).send();
//     }
// });

// function authenticateToken(req, res, next) {
//     //The next line retrieves the header information for "authorization" header
//     const auth = req.headers["authorization"];
//     console.log(auth);

//     //This header will be of the form "BEARER <token>" and we want to just retrive the "<token>" part.
//     const token = auth && auth.split(" ")[1];

//     if (!token) {
//         return res.sendStatus(401);
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403);
//             req.user = user;
//         }
//         next();
//     });
// }

app.listen(PORT);
