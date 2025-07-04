const formularioCotizacion = document.getElementById("formulario-cotizacion");
//numdoc-form
const documentoContainer = document.getElementById("numdoc-form");
const tipoDocumento = document.getElementById("tipo-documento");
const numeroDocumento = document.getElementById("numero-documento");
const celular = document.getElementById("celular");
const placa = document.getElementById("placa");
const checkContainer = document.getElementById("check-politica-container");
const politicaYTerminos = document.getElementById("politicaYTerminos");

formularioCotizacion.addEventListener("submit", function (event) {
  event.preventDefault();
  validarFormulario();
});

function validarFormulario() {
  limpiarErrores();

  let esValido = true;
  const tipoDocument = tipoDocumento.value;
  const numeroDocumento = numeroDocumento.value;

  //switch

  if (tipoDocument === "dni" && numeroDocumento.length !== 8) {
    mostrarError(documentoContainer, "El DNI debe tener 8 dígitos");
    esValido = false;
  } 
  if (tipoDocument === "pasaporte" && numeroDocumento.trim() === "") {
    mostrarError(
      documentoContainer,
      "Por favor, ingresa el número de pasaporte."
    );

    esValido = false;
  }

  const patronCelular = /^[9]{1}[0-9]{8}$/;
  if (!patronCelular.test(celular.value)) {
    mostrarError(celular, "El celular debe empezar con 9 y tener 9 dígitos.");

    esValido = false;
  }

  const patronPlaca = /^[A-Z]{3}-[0-9]{3}$/;
  if (!patronPlaca.test(placa.value.toUpperCase())) {
    mostrarError(placa, "La placa debe tener el formato AAA-123.");

    esValido = false;
  }

  if (!politicaYTerminos.checked) {
    mostrarError(
      checkContainer,
      "Debes aceptar la Política de Protección de Datos Personales y los Términos y Condiciones."
    );

    esValido = false;
  }

  if (esValido) {
    const datosFormulario = {
      tipoDocumento: tipoDocumento.value,
      numeroDocumento: numeroDocumento.value,
      celular: celular.value,
      placa: placa.value.toUpperCase(),
      aceptaTerminos: politicaYTerminos.checked,
    };
    console.log("Datos del formulario:", datosFormulario);
    alert("¡Formulario enviado exitosamente!");
    formularioCotizacion.reset();
  }
}

function mostrarError(elemento, mensaje) {
  let errorDiv = elemento.nextElementSibling;
  if (errorDiv && !errorDiv.classList.contains("mensaje-error")) {
    errorDiv = null;
  }

  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.classList.add("mensaje-error");
    elemento.insertAdjacentElement("afterend", errorDiv);
  }

  errorDiv.textContent = mensaje;
  elemento.classList.add("input-error");
}

function limpiarErrores() {
  const mensajesError = document.querySelectorAll(".mensaje-error");
  mensajesError.forEach((divError) => {
    divError.remove();
  });

  const inputsConError = document.querySelectorAll(".input-error");
  inputsConError.forEach((input) => {
    input.classList.remove("input-error");
  });
}
