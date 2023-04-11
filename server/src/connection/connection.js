require('dotenv').config()
const mongoose = require("mongoose");
const DB = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@aushadhi-aikyam.olipfgx.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
mongoose
    .connect(DB)
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err);
    });

