const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define("categories", {
    title: {
        allowNull: false,
        type: Sequelize.STRING
    },
    slug: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

module.exports = Category;