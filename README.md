# Parapetos

**Parapetos** es una aplicación web interactiva desarrollada con tecnologías web modernas. Su estructura modular y escalable permite una navegación fluida y una experiencia de usuario enfocada en la simplicidad y el diseño responsive. Aunque actualmente es una maqueta funcional, sienta las bases para una plataforma más robusta con autenticación, gestión de usuarios y sistema de pagos.

---

## Objetivo del Proyecto

El objetivo principal de Robin Project es ofrecer una interfaz visualmente atractiva y funcional para simular flujos comunes en aplicaciones web como:

* Inicio de sesión de usuarios.
* Visualización de información en diferentes vistas.
* Simulación de un sistema de pago.

Esto lo convierte en un excelente punto de partida para desarrolladores que deseen aprender sobre estructuración de proyectos web reales.

---

## Estructura del Proyecto

```
Parapetos
/
├── index.html                  # Página principal de la aplicación
├── package.json                # Definición de dependencias y scripts del proyecto
├── package-lock.json           # Registro de versiones exactas instaladas
├── db.json                     # Base de datos mock para pruebas locales
├── .vscode/
│   └── settings.json           # Configuración específica del editor VSCode
├── assets/
│   ├── css/                    # Archivos de estilos organizados por vistas
│   │   ├── desktop.css
│   │   ├── general_styles.css
│   │   ├── login.css
│   │   └── pay.css
│   └── images/                 # Recursos gráficos y logos
│       └── logo.png
└── ...                         # Posibles archivos JS o adicionales
```

---

## Tecnologías Utilizadas

* **HTML5**: Estructura del contenido.
* **CSS3**: Estilos visuales y diseño responsivo.
* **JavaScript** (si aplica en versiones futuras): Comportamiento e interactividad.
* **Node.js**: Utilizado para gestionar dependencias y ejecutar servidores de desarrollo.
* **Live Server** (sugerido): Para pruebas locales en tiempo real.

---

## Instalación y Uso Local

Sigue los siguientes pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/usuario/Parapetos.git
cd Parapetos
```

### 2. Instalar Dependencias

Asegúrate de tener [Node.js](https://nodejs.org) instalado. Luego ejecuta:

```bash
npm install
```

### 3. Ejecutar Proyecto

Puedes usar `live-server` para ejecutar el proyecto:

```bash
npx live-server
```

O simplemente abrir `index.html` en tu navegador manualmente.

---

## Capturas de Pantalla
## Pantalla inicio:
![alt text](image.png)

## Login admin:
![alt text](image-1.png)

## Admin dashboard:
![alt text](image-2.png)

## 🛠 Funcionalidades Implementadas

* [x] Diseño modular y responsivo.
* [x] Página de inicio con estructura clara.
* [x] Sistema básico de estilos organizados por contexto.
* [x] Mock de base de datos para pruebas.

---

*Parapetos** © 2025
