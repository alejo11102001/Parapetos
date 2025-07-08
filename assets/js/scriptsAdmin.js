const deskLink = document.getElementById('deskLink');
const suscriptionLink = document.getElementById('suscriptionLink');
const eventsLink = document.getElementById('eventsLink');
const contactLink = document.getElementById('contactLink');
const spaceContainer = document.getElementById('content');

deskLink.addEventListener('click', function(e) {
    e.preventDefault();
    viewDesktop();
});
suscriptionLink.addEventListener('click', function(e) {
    e.preventDefault();
    viewSuscriptions();
});
eventsLink.addEventListener('click', function(e) {
    e.preventDefault();
    viewEvents();
});
contactLink.addEventListener('click', function(e) {
    e.preventDefault();
    viewContact();
});

function viewDesktop() {
    spaceContainer.innerHTML = `
        <div class="container-fluid">
            <div class="row mb-4 mt-4">
                <div class="col-md-3">
                    <div class="card text-bg-primary text-center">
                        <div class="card-body">
                            <h5 class="card-title">Eventos activos</h5>
                            <p class="card-text display-6" id="eventos-activos">3</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-bg-danger text-center">
                        <div class="card-body">
                            <h5 class="card-title">Eventos cancelados</h5>
                            <p class="card-text display-6" id="eventos-cancelados">3</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-bg-warning text-center">
                        <div class="card-body">
                            <h5 class="card-title">Eventos inactivos</h5>
                            <p class="card-text display-6" id="eventos-inactivos">3</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-bg-success text-center">
                        <div class="card-body">
                            <h5 class="card-title">Total de eventos</h5>
                            <p class="card-text display-6" id="eventos-totales">9</p>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-6">
                        <div class="card text-bg-light">
                            <div class="card-header">Correos registrados</div>
                                <div class="card-body">
                                    <p class="card-text display-6" id="correos-registrados">20</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card text-bg-light">
                                <div class="card-header">Mensajes de contacto</div>
                                    <div class="card-body">
                                        <p class="card-text display-6" id="mensajes-contacto">20</p>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

        fetch("http://localhost:3000/events?status=Activo")
        .then(res => res.json())
        .then(data => {
            document.getElementById("eventos-activos").textContent = data.length;
    });

        fetch("http://localhost:3000/events?status=Inactivo")
        .then(res => res.json())
        .then(data => {
            document.getElementById("eventos-inactivos").textContent = data.length;
    });

    fetch("http://localhost:3000/events?status=Cancelado")
        .then(res => res.json())
        .then(data => {
            document.getElementById("eventos-cancelados").textContent = data.length;
    });

    fetch("http://localhost:3000/events")
        .then(res => res.json())
        .then(data => {
            document.getElementById("eventos-totales").textContent = data.length;
    });

    fetch("http://localhost:3000/suscribers")
        .then(res => res.json())
        .then(data => {
            document.getElementById("correos-registrados").textContent = data.length;
    });

    fetch("http://localhost:3000/contact")
    .then(res => res.json())
    .then(data => {
        document.getElementById("mensajes-contacto").textContent = data.length;
    });
}

function viewSuscriptions() {
    spaceContainer.innerHTML = `
        <div class="container">
            <h2 class="mb-4 mt-4">Suscripciones</h2>
            <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Correo electrónico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-suscripciones">
                    </tbody>
                </table>
            </div>
        </div>
    `;

    fetch("http://localhost:3000/suscribers")
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tabla-suscripciones");
            tbody.innerHTML = ""; 

            data.forEach(suscriber => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${suscriber.id}</td>
                    <td>${suscriber.email}</td>
                    <td><button class="btn btn-danger btn-sm btn-eliminar" data-id="${suscriber.id}">Eliminar</button></td>
                `;
                tbody.appendChild(row);
            });

            tbody.querySelectorAll(".btn-eliminar").forEach(button => {
                button.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    if (confirm("¿Eliminar este suscriptor?")) {
                        fetch(`http://localhost:3000/suscribers/${id}`, {
                            method: "DELETE"
                        })
                            .then(res => {
                                if (!res.ok) throw new Error("Error al eliminar");
                                actualizarContadorSuscriptores(); // Actualiza contador en Escritorio
                            })
                            .catch(err => alert(err.message));
                    }
                });
            });
        });
}

function actualizarContadorSuscriptores() {
    fetch("http://localhost:3000/suscribers")
        .then(res => res.json())
        .then(data => {
            const contador = document.getElementById("correos-registrados");
            if (contador) contador.textContent = data.length;
        });
}

function viewContact() {
    spaceContainer.innerHTML = `
        <div class="container">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="mb-4 mt-4">Mensajes de Contacto</h2>
                <input type="text" class="form-control w-50" id="buscador-contacto" placeholder="Buscar por correo...">
            </div>
            <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-contacto"></tbody>
                </table>
            </div>
        </div>

        <!-- MODAL RESPONDER -->
        <div class="modal fade" id="modalResponder" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form id="form-responder">
                        <div class="modal-header">
                            <h5 class="modal-title">Responder mensaje</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Para:</label>
                                <input type="email" class="form-control" id="correo-destino" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Mensaje:</label>
                                <textarea class="form-control" id="mensaje-respuesta" rows="5" required></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Enviar</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    const tbody = document.getElementById("tabla-contacto");

    fetch("http://localhost:3000/contact")
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5">No hay mensajes</td></tr>`;
                return;
            }

            data.forEach(msg => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${msg.name}</td>
                    <td>${msg.message}</td>
                    <td>${msg.date}</td>
                    <td>${msg.email}</td>
                    <td>
                        <button class="btn btn-sm btn-success btn-responder" data-email="${msg.email}" data-bs-toggle="modal" data-bs-target="#modalResponder">Responder</button>
                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${msg.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            // Eliminar contacto
            const btnsEliminar = document.querySelectorAll(".btn-eliminar");
            btnsEliminar.forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.id;
                    if (confirm("¿Estás seguro de eliminar este mensaje?")) {
                        await fetch(`http://localhost:3000/contact/${id}`, { method: "DELETE" });
                        viewContact();
                    }
                });
            });

            // Preparar modal de respuesta
            const btnsResponder = document.querySelectorAll(".btn-responder");
            btnsResponder.forEach(btn => {
                btn.addEventListener("click", () => {
                    document.getElementById("correo-destino").value = btn.dataset.email;
                    document.getElementById("mensaje-respuesta").value = "";
                });
            });

            // Enviar respuesta (simulado)
            const formRespuesta = document.getElementById("form-responder");
            formRespuesta.addEventListener("submit", function (e) {
                e.preventDefault();

                const email = document.getElementById("correo-destino").value;
                const mensaje = document.getElementById("mensaje-respuesta").value;

                // Aquí podrías usar un endpoint real de envío de correo desde tu backend o servicio externo.
                alert(`Correo enviado a ${email} con el mensaje:\n\n${mensaje}`);
                const modal = bootstrap.Modal.getInstance(document.getElementById("modalResponder"));
                modal.hide();
            });

            // Filtro por correo
            const input = document.getElementById("buscador-contacto");
            input.addEventListener("input", function () {
                const filtro = this.value.toLowerCase();
                const filas = tbody.querySelectorAll("tr");

                filas.forEach(fila => {
                    const correo = fila.children[3]?.textContent.toLowerCase();
                    fila.style.display = correo.includes(filtro) ? "" : "none";
                });
            });
        })
        .catch(err => {
            tbody.innerHTML = `<tr><td colspan="5">Error al cargar los mensajes</td></tr>`;
            console.error(err);
        });
}



function viewEvents() {
    content.innerHTML = `
        <div class="container">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="mt-4 mb-4">Gestor de eventos</h2>
                <input type="text" class="form-control w-50" id="search-events" placeholder="Buscar por nombre de evento">
            </div>

            <div class="mb-4">
                <button class="btn btn-success mb-3" id="btn-show-add">+ Añadir evento</button>
                <div id="form-add-event" class="p-3 border rounded bg-light" style="display:none;">
                    <h5>Nuevo evento</h5>
                    <form id="form-new-event">
                        <div class="mb-2">
                            <label>Imagen:</label>
                            <input type="file" class="form-control" name="image" accept="image/*" required>
                        </div>
                        <div class="mb-2">
                            <label>Titulo</label>
                            <input type="text" class="form-control" name="title" required>
                        </div>
                        <div class="mb-2">
                            <label>Descripcion:</label>
                            <textarea class="form-control" name="description" required></textarea>
                        </div>
                        <div class="mb-2">
                            <label>Estado</label>
                            <select class="form-control" name="status">
                                <option class="active" value="Activo">Activo</option>
                                <option class="inactive" value="Inactivo">Inactivo</option>
                                <option class="cancelled" value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label>Fecha evento</label>
                            <input type="date" class="form-control" name="date" required>
                        </div>
                        <div class="mb-2">
                            <label>Precio</label>
                            <input type="number" class="form-control" name="price" required min="0" step="0.01">
                        </div>
                        <div class="mb-2">
                            <label>Cantidad de personas</label>
                            <input type="number" class="form-control" name="capacity" required min="1">
                        </div>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </form>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>Imagen</th>
                            <th>ID</th>
                            <th>Evento</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Precio</th>
                            <th>Capacidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="table-events"></tbody>
                </table>
            </div>
        </div>
    `;

    const API_URL = 'http://localhost:3000/events';

    document.getElementById("btn-show-add").addEventListener("click", () => {
        const form = document.getElementById("form-add-event");
        form.style.display = form.style.display === "none" ? "block" : "none";
    });

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(event => renderEvent(event));
        });

    document.getElementById("search-events").addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        const rows = document.querySelectorAll("#table-events tr");

        for (let i = 0; i < rows.length; i += 2) {
            const eventRow = rows[i];
            const editRow = rows[i + 1]; // la fila de edición siguiente

            const eventName = eventRow.children[2]?.textContent.toLowerCase() || "";
            const match = eventName.includes(filter);

            eventRow.style.display = match ? "" : "none";
            if (editRow) editRow.style.display = "none"; // Siempre ocultar editRow al filtrar
        }
    });

    document.getElementById("form-new-event").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const file = formData.get("image");

        // 1. Subir la imagen a Cloudinary
        const cloudName = 'dip8u9o6u'; // tu cloud name
        const uploadPreset = 'parapetos_eventos'; // asegúrate de tener este preset en tu Cloudinary

        const cloudForm = new FormData();
        cloudForm.append("file", file);
        cloudForm.append("upload_preset", uploadPreset);

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: cloudForm
        })
        .then(res => res.json())
        .then(data => {
            const imageUrl = data.secure_url;

            // 2. Guardar evento en json-server
            const newEvent = {
                image: imageUrl,
                title: formData.get("title"),
                description: formData.get("description"),
                status: formData.get("status"),
                date: formData.get("date"),
                price: parseFloat(formData.get("price")),
                capacity: parseInt(formData.get("capacity"))
            };

            return fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEvent)
            });
        })
        .then(res => res.json())
        .then(data => {
            renderEvent(data);
            this.reset();
            document.getElementById("form-add-event").style.display = "none";
        })
        .catch(err => {
            console.error("Error al subir imagen o evento:", err);
            alert("Error al crear evento o subir imagen.");
        });
    });


    function renderEvent(event) {
        const table = document.getElementById("table-events");
        const id = event.id;

        const row = document.createElement("tr");
        row.id = `event-${id}`;

        const statusBadgeClass = {
            "Activo": "success",
            "Inactivo": "secondary",
            "Cancelado": "danger"
        }[event.status] || "dark";

        row.innerHTML = `
            <td><img src="${event.image}" class="event-img"></td>
            <td>${id}</td>
            <td>${event.title}</td>
            <td class="description">${event.description}</td>
            <td><span class="badge bg-${statusBadgeClass}">${event.status}</span></td>
            <td>${event.date || 'No date'}</td>
            <td>$${event.price?.toFixed(2) || '0.00'}</td>
            <td>${event.capacity || 0}</td>
            <td>
                <button type="button" class="btn btn-sm btn-warning edit-btn">Editar</button>
                <button type="button" class="btn btn-sm btn-danger delete-btn">Eliminar</button>
            </td>
        `;
        table.appendChild(row);

        const editRow = document.createElement("tr");
        editRow.style.display = "none";
        editRow.innerHTML = `
            <td colspan="7">
                <div class="p-3 border rounded bg-light">
                    <h5>Editar Evento</h5>
                    <form class="edit-form">
                        <div class="mb-2">
                            <label>Imagen:</label>
                            <input type="file" class="form-control" name="image" accept="image/*">
                        </div>
                        <div class="mb-2">
                            <label>Título:</label>
                            <input type="text" class="form-control" name="title" value="${event.title}">
                        </div>
                        <div class="mb-2">
                            <label>Descripción:</label>
                            <textarea class="form-control" name="description">${event.description}</textarea>
                        </div>
                        <div class="mb-2">
                            <label>Estado:</label>
                            <select class="form-control" name="status">
                                <option value="Activo" ${event.status === "Activo" ? "selected" : ""}>Activo</option>
                                <option value="Inactivo" ${event.status === "Inactivo" ? "selected" : ""}>Inactivo</option>
                                <option value="Cancelado" ${event.status === "Cancelado" ? "selected" : ""}>Cancelado</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label>Fecha del Evento:</label>
                            <input type="date" class="form-control" name="date" value="${event.date || ''}">
                        </div>
                        <div class="mb-2">
                            <label>Precio:</label>
                            <input type="number" class="form-control" name="price" value="${event.price}" step="0.01" min="0">
                        </div>
                        <div class="mb-2">
                            <label>Capacidad:</label>
                            <input type="number" class="form-control" name="capacity" value="${event.capacity}" min="1">
                        </div>
                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </td>
        `;
        table.appendChild(editRow);

        row.querySelector(".edit-btn").onclick = () => {
            editRow.style.display = editRow.style.display === "none" ? "table-row" : "none";
        };

        row.querySelector(".delete-btn").onclick = (e) => {
            e.preventDefault();
            if (confirm("¿Eliminar este evento?")) {
                fetch(`http://localhost:3000/events/${id}`, { method: "DELETE" })
                    .then(() => {
                        row.remove();
                        editRow.remove();
                    });
            }
        };

        editRow.querySelector(".edit-form").addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            const title = formData.get("title");
            const description = formData.get("description");
            const status = formData.get("status");
            const date = formData.get("date");
            const price = parseFloat(formData.get("price"));
            const capacity = parseInt(formData.get("capacity"));
            const fileInput = this.querySelector('input[name="image"]');
            const file = fileInput.files[0];

            const updateEvent = (newImage) => {
                const updated = {
                    image: newImage || event.image,
                    title,
                    description,
                    status,
                    date,
                    price,
                    capacity
                };

                fetch(`http://localhost:3000/events/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updated)
                })
                    .then(res => res.json())
                    .then(data => {
                        const badgeColor = {
                            "Activo": "success",
                            "Inactivo": "secondary",
                            "Cancelado": "danger"
                        }[data.status] || "dark";

                        row.querySelector("img").src = data.image;
                        row.children[2].textContent = data.title;
                        row.querySelector(".description").textContent = data.description;
                        row.children[4].innerHTML = `<span class="badge bg-${badgeColor}">${data.status}</span>`;
                        row.children[5].textContent = data.date || 'No date';
                        row.children[6].textContent = `$${data.price.toFixed(2)}`;
                        row.children[7].textContent = data.capacity;
                        editRow.style.display = "none";
                    });
            };

            if (file) {
                const reader = new FileReader();
                reader.onload = () => updateEvent(reader.result);
                reader.readAsDataURL(file);
            } else {
                updateEvent();
            }
        });
    }

}

document.getElementById("logoutBtn").addEventListener("click", function() {
    window.location.href = "../../index.html";
});

const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const spans = sidebar.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('d-none'));
});


window.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    content.innerHTML = `
    <div class="d-flex justify-content-center align-items-center div-img">
        <img src="../assets/images/logo.png" alt="Logo" class="img-fluid">
    </div>
    `;
});

function updateDate() {
    const fecha = new Date();
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const hora = fecha.toLocaleTimeString('es-ES');

    document.getElementById('fechaActual').textContent = fecha.toLocaleDateString('es-ES', opcionesFecha);
    document.getElementById('horaActual').textContent = hora;
}

setInterval(updateDate, 1000);
updateDate();