const Sequelize = require("sequelize");

const options = {
    user: "postgres",
    password: "Nytasia1",
    host: "localhost",
    port: 5432,
    database: "massallstarz",
    dialect: "postgres"
};



module.exports = async function connectToPostgres() {
    const sequelize = new Sequelize(options);
    try {
        await sequelize.authenicate();
        console.log("Postgres Sequelize connection successful");
    } catch (error) {
        console.error("Unable to connect to Postgres Sequelize", error);
    }
};