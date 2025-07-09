// respuestasServer.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura tu correo (usa contraseña de aplicación si es Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "<tu_correo@gmail.com>",
    pass: "<tu_contraseña>"
  }
});

app.post("/enviar-respuesta", async (req, res) => {
  const { email, mensaje } = req.body;

  try {
    await transporter.sendMail({
      from: '"Soporte Parapetos 👶" <diegozulu987@gmail.com>',
      to: email,
      subject: "Respuesta a tu mensaje en Parapetos",
      html: `
        <p>Hola, gracias por contactarte con nosotros. Esta es nuestra respuesta:</p>
        <blockquote>${mensaje}</blockquote>
        <p>Si tienes más dudas, no dudes en escribirnos.</p>
        <br>
        <strong>Equipo Parapetos</strong>
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ success: false, error: "Error al enviar correo" });
  }
});

const PORT = 4003;
app.listen(PORT, () => console.log(`📩 Servidor de respuesta corriendo en puerto ${PORT}`));
