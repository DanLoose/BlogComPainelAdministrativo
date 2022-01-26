//  === IMPORTS === 
const express = require("express");
const body_parser = require("body-parser");
const connection = require("./database/database");

//  === BASIC SETTINGS ===
const app = express();
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({
    extended: false
}));
app.use(body_parser.json());
app.use(express.static("public"));

//  === DATABASE CONNECTION === 
connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso!");
}).catch(error => {
    console.log(error);
});

//  === ROUTES ===
app.get("/", (req, res) => {
    res.render("index");
});


//  === PORT ===
app.listen(8080, () => {
    console.log("Server online");
});