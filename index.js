//  === IMPORTS === 
const express = require("express");
const body_parser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController.js");
const articlesController = require("./articles/ArticlesController.js");

const Article = require("./articles/Article.js");
const Category = require("./categories/Category.js");

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
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", {
                articles: articles,
                categories: categories
            });
        });

    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article) {
            Category.findAll().then(categories => {
                res.render("article", {
                    article: article,
                    categories: categories
                });
            });
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: {
            model: Article
        }
    }).then(category => {
        if (category) {
            Category.findAll().then(categories => {
                res.render("index", {
                    articles: category.articles,
                    categories: categories
                });
            });
        } else {
            res.redirect("/");
        }
    }).catch(error => {
        console.log(error);
        res.redirect("/");
    });
});


//  === PORT ===
app.listen(8080, () => {
    console.log("Server online");
});