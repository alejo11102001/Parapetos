const formSubscribe = document.getElementById("form-subscribe");

formSubscribe.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  if (!email) return alert("Por favor escribe un correo válido.");

  const newSuscriber = { email };

  try {
    // 1. Guardar en json-server
    const res = await fetch("http://localhost:3000/suscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSuscriber)
    });

    if (!res.ok) throw new Error("Error en json-server");

    alert("¡Correo registrado correctamente!");
    formSubscribe.reset();

    // 2. Enviar mensaje a Discord
    const webhookURL = "https://discord.com/api/webhooks/1391905861340893255/103VhTuUvOqJ73qhxWPiSO8g51oUnIyBzD0uOmOjuw30p5xAEzu1Q4oKNooBmfcc90Ch";

    const discordResponse = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `¡Nuevo suscriptor! \n**Correo:** ${email}`
      })
    });

    if (!discordResponse.ok) {
      throw new Error("El webhook de Discord falló");
    }

    console.log("Mensaje enviado a Discord");

  } catch (err) {
    console.error("Error al suscribirse o enviar a Discord:", err);
    alert("Ocurrió un error al suscribirse.");
  }
});

document.getElementById("form-contact").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const newMessage = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
        date: new Date().toISOString().split("T")[0] // YYYY-MM-DD
    };

    fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage)
    })
        .then(res => res.json())
        .then(() => {
            alert("Mensaje enviado correctamente");
            this.reset();

            // 👇 AQUÍ VA EL FETCH DE TWILIO
            fetch("http://localhost:4000/send-sms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMessage)
            });
        })
        .catch(err => {
            alert("Error al enviar el mensaje");
            console.error(err);
        });
});

document.addEventListener("DOMContentLoaded", () => {
  const containerEventos = document.querySelector("#eventos .row");
  const API_URL = "http://localhost:3000/events";

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      // ✅ Filtra eventos que no estén inactivos
      const eventosVisibles = data.filter(evento => evento.status !== "Inactivo");

      if (eventosVisibles.length === 0) {
        containerEventos.innerHTML = `<p class="text-center">No hay eventos disponibles actualmente.</p>`;
        return;
      }

      containerEventos.innerHTML = "";

      eventosVisibles.forEach((evento, index) => {
        const colorClass = ["pink", "blue", "yellow"][index % 3];
        const isCancelado = evento.status === "Cancelado";

        const col = document.createElement("div");
        col.className = "col-md-4 mb-4 d-flex";

        col.innerHTML = `
          <div class="card servicio-card ${colorClass} w-100 ${isCancelado ? 'evento-cancelado' : ''}">
            <img src="${evento.image}" alt="${evento.title}" class="servicio-img-ajustada">
            <div class="card-body d-flex flex-column">
              <h4 class="card-title">${evento.title}</h4>
              <p class="card-text">${evento.description}...</p>
              ${isCancelado 
                ? `<div class="alert alert-danger text-center">⚠️ Evento Cancelado</div>` 
                : `<button class="btn btn-${colorClass === 'yellow' ? 'dark' : 'light'} btn-vermas mt-auto">Ver detalles</button>`}
              
              <div class="detalles ${isCancelado ? 'd-block' : ''}">
                <hr/>
                <p><strong>Precio:</strong> $${evento.price}</p>
                <p><strong>Fecha:</strong> ${evento.date}</p>
                <p><strong>Capacidad:</strong> ${evento.capacity} personas</p>
                <a href="../../pages/pay.html" class="btn btn-${colorClass === 'yellow' ? 'dark' : 'light'} btn-comprar" ${isCancelado ? 'disabled style="pointer-events:none;opacity:0.5;"' : ''}>
                  Comprar
                </a>
              </div>
            </div>
          </div>
        `;

        if (!isCancelado) {
          const btnDetalles = col.querySelector(".btn-vermas");
          btnDetalles.addEventListener("click", () => {
            const cardBody = btnDetalles.closest(".card-body");
            cardBody.classList.toggle("mostrar-detalles");
            btnDetalles.textContent = cardBody.classList.contains("mostrar-detalles")
              ? "Ocultar detalles"
              : "Ver detalles";
          });
        }

        containerEventos.appendChild(col);
      });
    })
    .catch(err => console.error("Error al cargar eventos:", err));
});


