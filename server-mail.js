// server-mail.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const { enviarCorreoSuscriptores } = require("./notifier.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/nuevo-evento", async (req, res) => {
  const nuevoEvento = req.body;

  try {
    // Guardar evento en db.json
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoEvento)
    });
    const data = await response.json();

    // Enviar correos a suscriptores
    await enviarCorreoSuscriptores(data);

    res.status(200).json({ success: true, mensaje: "✅ Evento creado y correos enviados", evento: data });
  } catch (error) {
    console.error("❌ Error al crear evento o enviar correos:", error.message);
    res.status(500).json({ success: false, mensaje: "Error al crear evento o enviar correos" });
  }
});

const PORT = 4001; // ⚠️ PUERTO DIFERENTE
app.listen(PORT, () => console.log(`📧 Servidor MAIL activo en puerto ${PORT}`));
