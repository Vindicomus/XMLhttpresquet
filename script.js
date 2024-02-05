// script.js

const header = document.querySelector("header");
const section = document.querySelector("section");

//Referencia a los elementos <header> y <section> y los almacena en variables.

// 1 Para empezar, se debe almacenar la URL del JSON que se quiere recuperar en una variable.
// Agrega lo siguiente al final del código JavaScript 

const requestURL = "estudiantes.json";

// 2 Para crear una solicitud, se necesitas crear una nueva instancia de objeto
// de solicitud desde el constructor XMLHttpRequest, utilizando la palabra clave new.
// Agrega lo siguiente a continuación de la última línea:

const request = new XMLHttpRequest();

// 3 Ahora es necesario abrir una nueva solicitud utilizando el método open() (en-US).
// Agrega la siguiente línea:

request.open("GET", requestURL);

// Esto requiere al menos dos parámetros
// Existen otros parámetros opcionales disponibles.
// Sólo se requieren los dos obligatorios para este ejemplo:
//      El método HTTP a usar cuando se hace una solicitud en red.
//      En este caso GET es adecuado, dado que sólo se estan recuperando
//      algunos datos simples.
//      La URL a la que se realiza la solicitud
//      esta es la URL del archivo que se almacenó antes.


// 4 Luego, agrega las siguientes dos lineas
// establecemos el responseType (en-US) a JSON,
// de esta forma ese XHR sabe que el servidor estará
// retornando JSON y que esto debería ser convertido en segundo plano en un objeto JavaScript.
// Entonces se envía la solicitud con el método send() (en-US):

request.responseType = "json";
request.send();

// 5 La última parte de esta sección comprende la espera por la
// respuesta a retornar desde el servidor y luego, manejarla.
// Agrega el siguiente código bajo el código previo:


function populateHeader(jsonObj) {
    const myH1 = document.createElement("h1");
    myH1.textContent = "Listado de Alumnos";
    header.appendChild(myH1);      
  }

    function showEstudiantes(jsonObj) {
        const section = document.querySelector("section");
    
        // Recorre cada estudiante en el objeto JSON
        for (const alumnoKey in jsonObj) {
            if (jsonObj.hasOwnProperty(alumnoKey)) {
                const alumno = jsonObj[alumnoKey];
    
                const divEstudiante = document.createElement("div");
                // Crea un nuevo elemento HTML <div>
                divEstudiante.classList.add("estudiante-card", "color-morado");
                // agrega las clases CSS al elemento <div>    
                
                const h2Nombre = document.createElement("h2");
                // crea un nuevo elemento HTML <h2>
                h2Nombre.textContent = alumno["nombre"];
                //Establece el contenido de texto del elemento
                //con el valor del nombre del alumno obtenido del objeto json
                
                const pEdad = document.createElement("p");
                //crea un nuevo elemento HTML <p>
                pEdad.textContent = "Edad: " + alumno["edad"];
                //Establece el contenido de texto del elemento (Edad + valor de la edad)
                
                const pCiudad = document.createElement("p");
                //crea un nuevo elemento HTML <p>
                pCiudad.textContent = "Ciudad: " + alumno["ciudad"];
                //Establece el contenido de texto del elemento
                
                const ulMaterias = document.createElement("ul");
                // crea un nuevo elemento HTML (lista desordenada ul)
                const materias = alumno["materias"];
                //obtiene la lista de materias del alumno desde el objeto JSON
                
                for (const materia of materias) {
                    //itera cada materia en la lista
                    const liMateria = document.createElement("li");
                    //crea un nuevo elemento HTML li (elemento de lista)
                    liMateria.textContent = materia;
                    //Establece el contenido de texto del elemento li
                    ulMaterias.appendChild(liMateria);
                    //agrega el elemento li a la lista desordenada
                }
    
                // Agrega los elementos al div del estudiante
                divEstudiante.appendChild(h2Nombre);
                divEstudiante.appendChild(pEdad);
                divEstudiante.appendChild(pCiudad);
                divEstudiante.appendChild(ulMaterias);
    
                // Agrega el div del estudiante a la sección
                section.appendChild(divEstudiante);
            }
        }
    }

request.onload = function () {
    const estudiantes = request.response;
    populateHeader (estudiantes);
    showEstudiantes (estudiantes);
};
// En este punto se está almacenando la respuesta a la solicitud
// (disponible en la propiedad response (en-US)) en una variable
// llamada estudiantes; esta variable ahora contendrá el objeto
// JavaScript basado en el JSON. Luego se pasa el objeto como
// argumento a dos funciones
// la primera llenará el <header> con los datos correctos, mientras
// la segunda creará una tarjeta de información para cada estudiante en
// el equipo y la insertará en <section>.
// Se ha contenido el código en un manejador de eventos que
// se activa cuando se dispara el evento de carga
// (ver onload (en-US)) — esto es porque el evento de carga se
// dispara cuando la respuesta ha sido retornada de forma exitosa;
// de esta manera se garantiza que request.response estará
// disponible cuando se intente hacer algo con ella.
