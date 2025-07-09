const formPrice = document.getElementById("form-price");
const typeDocument = document.getElementById("type-document");
const numberDocument = document.getElementById("document-number");
const phone = document.getElementById("phone");
const plate = document.getElementById("plate");
const policyContainer = document.getElementById("policy-container");
const policyContent = document.getElementById("policy-content");

numberDocument.addEventListener("blur", validateNumberDocument);
phone.addEventListener("blur", validatePhone);
plate.addEventListener("blur", validatePlate);
policyContent.addEventListener("change", validatepolicyContent);

const deleteError = function (element) {
  let containerError = element.nextElementSibling;
  if (
    containerError &&
    containerError.classList.contains("error-message-container")
  ) {
    containerError.remove();
    element.classList.remove("error-input");
  }
};

const showError = function (element, message) {
  let containerError = document.createElement("div");
  containerError.classList.add("error-message-container");
  containerError.textContent = message;
  element.insertAdjacentElement("afterend", containerError);
  element.classList.add("error-input");
};

function validateNumberDocument() {
  deleteError(numberDocument);
  let numberDocumentValue = numberDocument.value.trim();
  let typeDocumentValue = typeDocument.value;
  let isValidNumDoc = true;
  let message;
  let patternDNI = /^\d{8}$/;
  if (!numberDocumentValue) {
    message = "Ingresar el número de documento";
    showError(numberDocument, message);
    isValidNumDoc = false;
    return isValidNumDoc;
  }
  if (typeDocumentValue === "dni" && !patternDNI.test(numberDocumentValue)) {
    message = "El DNI debe tener 8 dígitos numéricos";
    showError(numberDocument, message);
    isValidNumDoc = false;
    return isValidNumDoc;
  }
  return isValidNumDoc;
}

function validatePhone() {
  deleteError(phone);
  let patternPhone = /^[9]{1}[0-9]{8}$/;
  let isValidPhone = true;
  let phoneValue = phone.value.trim();
  let message;
  if (!patternPhone.test(phoneValue)) {
    message = "El número de celular debe empezar con 9 y tener 9 digitos";
    showError(phone, message);
    isValidPhone = false;
    return isValidPhone;
  }
  return isValidPhone;
}

function validatePlate() {
  deleteError(plate);
  let plateValue = plate.value.toUpperCase().trim();
  let isValidPlate = true;
  let message;
  let patternPlate = /^[A-Z]{3}-[0-9]{3}$/;
  if (!patternPlate.test(plateValue)) {
    isValidPlate = false;
    message = "La placa debe tener el formato AAA-123";
    showError(plate, message);
    return isValidPlate;
  }
  return isValidPlate;
}

function validatepolicyContent() {
  deleteError(policyContainer);
  let policyContentValue = policyContent.checked;
  let message;
  let isValidPolicy = true;
  if (!policyContentValue) {
    message =
      "Debe aceptar la Política de Protección de Datos y los Términos y Condiciones";
    showError(policyContainer, message);
    isValidPolicy = false;
    return isValidPolicy;
  }
  return isValidPolicy;
}


function sendForm() {
  const isValidNumDoc = validateNumberDocument();
  const isValidPhone = validatePhone();
  const isValidPlate = validatePlate();
  const isValidPolicy = validatepolicyContent();
  const isValidForm =
    isValidNumDoc && isValidPhone && isValidPlate && isValidPolicy;
  if (isValidForm) {
    const formData = {
      typeDocument: typeDocument.value,
      numberDocument: numberDocument.value.trim(),
      phone: phone.value.trim(),
      plate: plate.value.toUpperCase().trim(),
      acceptTerms: policyContent.checked,
    };

    console.log(
      `Los datos ingresados del formulario de cotización son: `,
      formData
    );
    alert("El formulario fue enviado para la cotización");
    callAPI();
    formPrice.reset();
  }
}
formPrice.addEventListener("submit", function (e) {
  e.preventDefault();
  sendForm();
});