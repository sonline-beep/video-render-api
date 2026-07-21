const express = require("express");
const { exec } = require("child_process");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    api: "Video Render API",
    version: "2.0"
  });
});

app.get("/ffmpeg", (req, res) => {
  exec("ffmpeg -version", (err, stdout, stderr) => {

    if (err) {
      return res.status(500).json({
        instalado: false,
        erro: stderr
      });
    }

    res.json({
      instalado: true,
      versao: stdout.split("\n")[0]
    });

  });
});

app.listen(process.env.PORT || 8080);
