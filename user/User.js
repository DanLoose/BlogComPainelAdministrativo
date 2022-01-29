const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define("users", {
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

// User.sync({
//     force: true
// });

module.exports = User;