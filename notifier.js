// notifier.js
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "<tu_correo@gmail.com>",
    pass: "<tu_contraseña>"
  }
});

async function enviarCorreoSuscriptores(evento) {
  try {
    const res = await fetch("http://localhost:3000/suscribers");
    const suscriptores = await res.json();

    if (suscriptores.length === 0) {
      console.log("⚠️ No hay suscriptores registrados.");
      return;
    }

    for (const sub of suscriptores) {
      const mailOptions = {
        from: '"Eventos Parapetos 👶" <diegozulu987@gmail.com>',
        to: sub.email,
        subject: `🎉 Nuevo evento: ${evento.title}`,
        html: `
          <h2>${evento.title}</h2>
          <p><strong>Descripción:</strong> ${evento.description}</p>
          <p><strong>Fecha:</strong> ${evento.date}</p>
          <p><strong>Precio:</strong> $${evento.price}</p>
          <p><strong>Capacidad:</strong> ${evento.capacity} personas</p>
          <a href="http://localhost:5500/#eventos">Ver en la web</a>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`✉️ Correo enviado a ${sub.email}`);
    }
  } catch (err) {
    console.error("❌ Error al enviar correos:", err.message);
  }
}

module.exports = { enviarCorreoSuscriptores };
