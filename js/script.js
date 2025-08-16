/* -------------------------------
   Alerta de bienvenida
--------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar alerta apenas cargue la página
  alert("¡Bienvenido a mi Perfil! (Parcial 1)");

  // Precargar datos guardados si existen
  precargarFormulario();
  precargarColorFondo();
});

/* -------------------------------
   Cambio de color de fondo
--------------------------------- */
const botonFondo = document.createElement("button");
botonFondo.textContent = "Cambiar Fondo";
botonFondo.style.marginTop = "10px";
document.body.appendChild(botonFondo);

// Evento click: cambia fondo y guarda en localStorage
botonFondo.addEventListener("click", () => {
  const colores = ["#0f172a", "#1a202c", "#2d3748", "#4a5568"];
  const random = colores[Math.floor(Math.random() * colores.length)];
  document.body.style.background = random;
  localStorage.setItem("colorFondo", random); // guardar en localStorage
});

/* -------------------------------
   Cambiar contenido de <p>
--------------------------------- */
const botonCambioTexto = document.createElement("button");
botonCambioTexto.textContent = "Cambiar Mensaje";
botonCambioTexto.style.marginLeft = "10px";
document.body.appendChild(botonCambioTexto);

botonCambioTexto.addEventListener("click", () => {
  const parrafo = document.getElementById("mensaje-dom");
  parrafo.textContent = "Este texto fue modificado con JavaScript.";
});

/* -------------------------------
   Agregar dinámicamente elementos a lista
--------------------------------- */
// Creo un input + botón para agregar items
const inputItem = document.createElement("input");
inputItem.type = "text";
inputItem.placeholder = "Nuevo ítem de lista";

const botonAgregar = document.createElement("button");
botonAgregar.textContent = "Agregar a lista";

document.body.appendChild(document.createElement("br"));
document.body.appendChild(inputItem);
document.body.appendChild(botonAgregar);

botonAgregar.addEventListener("click", () => {
  const valor = inputItem.value.trim();
  if (valor !== "") {
    const lista = document.querySelector("ul");
    const nuevoLi = document.createElement("li");
    nuevoLi.textContent = valor;
    lista.appendChild(nuevoLi);
    inputItem.value = "";
  } else {
    alert("Por favor escribe un ítem válido.");
  }
});

/* -------------------------------
  Validación del formulario
--------------------------------- */
const form = document.getElementById("formulario");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evitar recarga

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || correo === "" || mensaje === "") {
    alert("Todos los campos son obligatorios.");
    return;
  }

  // Guardar datos en localStorage
  const datos = { nombre, correo, mensaje };
  localStorage.setItem("formularioUsuario", JSON.stringify(datos));

  alert("Formulario enviado correctamente ✅");
});

/* -------------------------------
   Imagen que crece en mouseover
   (principalmente manejado por CSS con hover,
   pero agrego un log en JS para demostrar control)
--------------------------------- */
const imgPerfil = document.getElementById("perfil");
imgPerfil.addEventListener("mouseover", () => {
  console.log("Mouse sobre la imagen de perfil.");
});
imgPerfil.addEventListener("mouseout", () => {
  console.log("Mouse fuera de la imagen de perfil.");
});

/* -------------------------------
  Funciones para precargar datos
--------------------------------- */
function precargarFormulario() {
  const guardado = localStorage.getItem("formularioUsuario");
  if (guardado) {
    const datos = JSON.parse(guardado);
    document.getElementById("nombre").value = datos.nombre;
    document.getElementById("correo").value = datos.correo;
    document.getElementById("mensaje").value = datos.mensaje;
  }
}

function precargarColorFondo() {
  const color = localStorage.getItem("colorFondo");
  if (color) {
    document.body.style.backgroundColor = color;
  }
}

/* -------------------------------
   AJAX con jQuery
   Esto se usa en demo-api-rest.html
--------------------------------- */
function consumirAPI() {
  // Llamado AJAX con jQuery
  $.ajax({
    url: "https://s1uplfovq4.execute-api.us-east-1.amazonaws.com/default/example",
    method: "GET",
    success: function (respuesta) {
      // Mostrar el valor de "mensaje" en un div Bootstrap
      $("#resultado-api").html(`
        <div class="alert alert-info mt-3" role="alert">
          <strong>Respuesta API:</strong> ${respuesta.mensaje}
        </div>
      `);
    },
    error: function () {
      $("#resultado-api").html(`
        <div class="alert alert-danger mt-3" role="alert">
          Error al consultar la API.
        </div>
      `);
    }
  });
}
