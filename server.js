const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔒 Tu SID y token de Twilio (ocúltalos en producción)
const accountSid = 'AC481a534a1c0422e7e973a7957068c6cf';
const authToken = 'a5ddab22f8c985dd6585839f3b02c6aa';
const client = twilio(accountSid, authToken);

// Ruta para enviar SMS
app.post("/send-sms", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const sms = await client.messages.create({
            body: `Nuevo mensaje de contacto\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
            from: "+13513335987", // tu número de Twilio
            to: "+573205663330" // tu número personal o del admin
        });

        res.json({ success: true, sid: sms.sid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error al enviar SMS" });
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor SMS activo en puerto ${PORT}`));
