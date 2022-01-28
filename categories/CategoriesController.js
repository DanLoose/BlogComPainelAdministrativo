const express = require("express");
const router = express.Router();
const Category = require("./Category.js");
const slugify = require("slugify");

//  === ROTAS GET ===
router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index.ejs", {
            categories: categories
        });
    });
});

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) res.redirect("/admin/categories");
    Category.findByPk(id).then(category => {
        if (category) {
            res.render("admin/categories/edit.ejs", {
                category: category
            });
        } else {
            res.redirect("/admin/categories");
        }
    }).catch(error => {
        console.log(error);
        res.redirect("/admin/categories");
    });
});

//  === ROTAS POST ===
router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        });
    } else {
        res.redirect("/admin/categories/new");
    }
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if (id || !isNaN(id)) {

        Category.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/categories");
        });

    } else {
        res.redirect("/admin/categories");
    }
})


router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    });
});

module.exports = router;