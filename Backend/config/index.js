require("dotenv").config();

module.exports = {
    DB: process.env.APP_DB,
    PORT: process.env.APP_PORT || 5000 ,
    SECRET: process.env.APP_SECRET
};