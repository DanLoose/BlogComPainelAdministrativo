//  === IMPORTS === 
const express = require("express");
const body_parser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController.js");
const articlesController = require("./articles/ArticlesController.js");

//  === BASIC SETTINGS ===
const app = express();
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({
    extended: false
}));
app.use(body_parser.json());
app.use(express.static("public"));

//  === DATABASE CONNECTION === 
connection
    .authenticate().then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch(error => {
        console.log(error);
    });

//  === SETTING ROUTER ===
app.use("/", categoriesController);
app.use("/", articlesController);

//  === ROUTES ===
app.get("/", (req, res) => {
    res.render("index");
});


//  === PORT ===
app.listen(8080, () => {
    console.log("Server online");
});