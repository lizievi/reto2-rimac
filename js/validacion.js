const formPrice = document.getElementById("form-price");
const typeDocument = document.getElementById("type-document");
const numberDocument = document.getElementById("document-number");
const phone = document.getElementById("phone");
const plate = document.getElementById("plate");
const policyContainer = document.getElementById("policy-container");
const policyContent = document.getElementById("policy-content");

formPrice.addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});

function validateForm() {
  cleanErrors();

  let isValid = true;
  const typeDocumentValue = typeDocument.value;
  const numberDocumentValue = numberDocument.value;

  if (typeDocumentValue === "dni" && numberDocumentValue.length !== 8) {
    showError(numberDocument, "El DNI debe tener 8 dígitos");
    isValid = false;
  } 
  if (typeDocumentValue === "pasaporte" && numberDocumentValue.trim() === "") {
    showError(
      numberDocument,
      "Por favor, ingresa el número de pasaporte."
    );

    isValid = false;
  }

  const phonePattern = /^[9]{1}[0-9]{8}$/;
  if (!phonePattern.test(phone.value)) {
    showError(phone, "El celular debe empezar con 9 y tener 9 dígitos.");

    isValid = false;
  }

  const platePattern = /^[A-Z]{3}-[0-9]{3}$/;
  if (!platePattern.test(plate.value.toUpperCase())) {
    showError(plate, "La placa debe tener el formato AAA-123.");

    isValid = false;
  }

  if (!policyContent.checked) {
    showError(
      policyContainer,
      "Debes aceptar la Política de Protección de Datos Personales y los Términos y Condiciones."
    );

    isValid = false;
  }

  if (isValid) {
    const formData = {
      typeDocument: typeDocument.value,
      numberDocument: numberDocument.value,
      phone: phone.value,
      plate: plate.value.toUpperCase(),
      acceptTerms: policyContent.checked,
    };
    console.log("Datos del formulario:", formData);
    alert("¡Formulario enviado exitosamente!");
    formPrice.reset();
  }
}

function showError(element, message) {
  let errorDiv = element.nextElementSibling;
  if (errorDiv && !errorDiv.classList.contains("error-message")) {
    errorDiv = null;
  }

  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    element.insertAdjacentElement("afterend", errorDiv);
  }

  errorDiv.textContent = message;
  element.classList.add("error-input");
}

function cleanErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((divError) => {
    divError.remove();
  });

  const errorInputs = document.querySelectorAll(".input-error");
  errorInputs.forEach((input) => {
    input.classList.remove("error-input");
  });
}
