document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-recover");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("recoverEmail").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (!email || !newPassword) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/admins");
      const admins = await res.json();

      const adminFound = admins.find(admin => admin.email === email);

      if (!adminFound) {
        alert("Correo no registrado.");
        return;
      }

      // Hacemos PUT solo con el campo actualizado
      await fetch(`http://localhost:3000/admins/${adminFound.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword })
      });

      alert("Contraseña actualizada correctamente.");
      window.location.href = "login.html";

    } catch (error) {
      console.error("Error al recuperar contraseña:", error);
      alert("Ocurrió un error al intentar recuperar la contraseña.");
    }
  });
});
