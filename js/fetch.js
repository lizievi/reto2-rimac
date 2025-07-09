// document.addEventListener("DOMContentLoaded", () => {
//   const apiUrl = "https://jsonplaceholder.typicode.com/users/2";
//   async function consumirAPI() {
//     try {
//       const response = await fetch(apiUrl);
//       if (response.ok) {
//         alert("¡La API respondió con éxito (código 200)!");
//         const data = await response.json();
//         console.log("Datos recibidos de la API:", data);
//       } else {
//         alert(`Error al consumir la API: Código de estado ${response.status}`);
//         console.error(
//           `Error al consumir la API: Código de estado ${response.status}`
//         );
//       }
//     } catch (error) {
//       alert("Hubo un problema de red al intentar consumir la API.");
//       console.error("Error de red al consumir la API:", error);
//     }
//   }

//   consumirAPI();
// });

//https://jsonplaceholder.typicode.com/users/2
const callAPI = async (body) => {
  const urlUser = "https://jsonplaceholder.typicode.com/users/2";

  try {
    const response = await fetch(urlUser);
    if (response.ok) {
      alert("Respuesta exitosa, codigo 200");
      console.log("Tus datos: ", response.json());
    } else {
      alert("Respuesta fallida: ", response.status);
    }
  } catch (e) {
    alert("Hubo un problema");
    console.log("Se presento un problema: ", e);
  }
};
