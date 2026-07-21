const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuid } = require("uuid");

const renderVideo = require("./utils/render");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

const storage = multer.diskStorage({

    destination: async (req, file, cb) => {

        const jobId = req.jobId;

        const pasta = path.join(__dirname, "temp", jobId);

        await fs.ensureDir(pasta);

        cb(null, pasta);

    },

    filename: (req, file, cb) => {

        let nome = file.originalname;

        if (file.fieldname === "audio") {

            nome = "audio.mp3";

        }

        if (file.fieldname === "music") {

            nome = "music.mp3";

        }

        if (file.fieldname === "videos") {

            nome = Date.now() + "-" + file.originalname;

        }

        cb(null, nome);

    }

});

app.use((req, res, next) => {

    req.jobId = uuid();

    next();

});

const upload = multer({
    storage
});

app.get("/", (req, res) => {

    res.json({

        status: "ok",

        api: "Video Render API",

        version: "1.0"

    });

});
