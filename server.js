const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//dotEnv.config({path to your config.env file}) allows us to load the config.env into the process.env.
dotEnv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//logs requests and sends it to middleware.next();
app.use(morgan("tiny"));

//parses the body of the req.body from express requests.
app.use(bodyParser.urlencoded({extended:true}));

//Set view engine as EJS. Thus by default, rendering will take place from the ejs files located relative to the views folder.
app.set("view engine", "ejs");

//load assets and use the corresponding virtual path prefixes for /css, /img, and /js respectively.
//Without the first argument, the url request to get a css asset will look like: localhost:3000/file.css instead of localhost:3000/css/file.css.
app.use('/css',express.static(path.resolve(__dirname, "assets","css")));
app.use('/img',express.static(path.resolve(__dirname, "assets","img")));
app.use('/js',express.static(path.resolve(__dirname, "assets","js")));

app.get("/", (req, res) => {
    res.render('index.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
