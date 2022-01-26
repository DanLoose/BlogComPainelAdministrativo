const Sequelize = require("sequelize");
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

module.exports = Article;