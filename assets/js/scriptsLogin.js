async function auth() {
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');

// Resetear mensaje
message.textContent = "";
message.className = "mt-3 fw-bold";

if (emailInput.value && passwordInput.value) {
    try {
    const res = await fetch("http://localhost:3000/admins");
    const admins = await res.json();

    const userFound = admins.find(user =>
        user.email === emailInput.value && user.password === passwordInput.value
    );

    if (userFound) {
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("nombreCompleto", userFound.name);
        sessionStorage.setItem("correo", userFound.email);

        message.classList.add("text-success");
        message.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";

        setTimeout(() => {
        window.location.href = "../../pages/desktop.html";
        }, 1500);
    } else {
        message.classList.add("text-danger");
        message.textContent = "Correo o contraseña incorrectos.";
        autoHideMessage();
    }

    } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    message.classList.add("text-danger");
    message.textContent = "Error al conectar con el servidor.";
    autoHideMessage();
    }
} else {
    message.classList.add("text-danger");
    message.textContent = "Por favor, complete todos los campos.";
    autoHideMessage();
}
}

function autoHideMessage() {
setTimeout(() => {
    const message = document.getElementById("message");
    if (message) {
    message.textContent = "";
    message.className = "mt-3 fw-bold";
    }
}, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
const form = document.getElementById("form-login");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    auth();
});

const togglePasswordBtn = document.getElementById("toggle-password");
const passwordInput = document.getElementById("password");

togglePasswordBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordBtn.textContent = type === "password" ? "👁️" : "🙈";
});
});
