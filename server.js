const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API funcionando!",
    version: "2.0.0"
  });
});

app.post("/render", async (req, res) => {
  res.json({
    status: "ok",
    message: "Rota /render criada com sucesso!",
    recebido: req.body
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
