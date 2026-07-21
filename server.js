const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json({ limit: "100mb" }));

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        api: "Video Render API",
        version: "3.0"
    });
});

app.post("/render", async (req, res) => {

    const jobId = uuid();

    const pasta = path.join(__dirname, "temp", jobId);

    await fs.ensureDir(pasta);

    await fs.writeJson(
        path.join(pasta, "dados.json"),
        req.body,
        { spaces: 2 }
    );

    res.json({
        status: "ok",
        jobId,
        pastaCriada: pasta,
        mensagem: "Dados recebidos com sucesso."
    });

});

app.listen(process.env.PORT || 8080);
