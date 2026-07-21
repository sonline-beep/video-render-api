const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Video Render API Online"
  });
});

app.post("/render", (req, res) => {
  res.json({
    success: true,
    received: req.body
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
