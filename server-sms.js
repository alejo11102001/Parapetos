const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔒 Tu SID y token de Twilio (ocúltalos en producción)
const accountSid = '<tu_account_sid>';
const authToken = '<tu_auth_token>';
const client = twilio(accountSid, authToken);

// Ruta para enviar SMS
app.post("/send-sms", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const sms = await client.messages.create({
            body: `Nuevo mensaje de contacto\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
            from: "<tu_numero_twilio>", // tu número de Twilio
            to: "<tu_numero_personal>" // tu número personal o del admin
        });

        res.json({ success: true, sid: sms.sid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error al enviar SMS" });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor SMS activo en puerto ${PORT}`));
