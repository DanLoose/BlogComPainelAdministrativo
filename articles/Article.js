const Sequelize = require("sequelize");
const Category = require("../categories/Category");
const connection = require("../database/database");

const Article = connection.define("articles", {
    title: {
        allowNull: false,
        type: Sequelize.STRING
    },
    body: {
        allowNull: false,
        type: Sequelize.TEXT
    },
    slug: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

Category.hasMany(Article);
Article.belongsTo(Category);

// Article.sync({
//     force: true
// });

module.exports = Article;