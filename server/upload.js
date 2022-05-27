const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const express = require("express");
const app = express();

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
