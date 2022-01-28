const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article.js");
const slugify = require("slugify");

//  === ROTAS GET ===
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{
            model: Category
        }]
    }).then(articles => {
        res.render("admin/articles/index", {
            articles: articles
        });
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {
            categories: categories
        });
    });
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) res.redirect("/admin/articles");
    Article.findByPk(id).then(article => {
        if (article) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit.ejs", {
                    article: article,
                    categories: categories
                });
            });
        } else {
            res.redirect("/admin/articles");
        }
    }).catch(error => {
        console.log(error);
        res.redirect("/admin/articles");
    });
});

router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;
    const limit = 4;

    if (isNaN(page)) page = 1;

    Article.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit
    }).then(articles => {
        res.json(articles);
    });
});

//  === ROTAS POST ===
router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    if (!title || !body || !category || isNaN(category)) res.redirect("/admin/articles/new");
    else {
        Article.create({
            categoryId: category,
            title: title,
            slug: slugify(title),
            body: body
        }).then(() => {
            res.redirect("/admin/articles");
        });
    }
});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    });
});


router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if (id || !isNaN(id)) {

        Article.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/articles");
        });

    } else {
        res.redirect("/admin/articles");
    }
})

module.exports = router;