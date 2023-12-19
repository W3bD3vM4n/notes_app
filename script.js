// referencia al contenedor de la aplicación principal
const contenedorDeNotas = document.getElementById("app");
// referencia al botón para agregar nuevas notas
const agregarBotonDeNota = contenedorDeNotas.querySelector(".agregar-nota");

// obtengo y muestro todas las notas
obtenerNotas().forEach(nota => {
    // proviene del JSON que esta en el almacenamiento local
    const elementoNota = crearElementoDeNotas(nota.id, nota.contenido);
    // lugar en donde se van a insertar las notas
    contenedorDeNotas.insertBefore(elementoNota, agregarBotonDeNota);
});

// Habilita la funcionalidad del boton para agregar notas
agregarBotonDeNota.addEventListener("click", () => agregarNota());

function obtenerNotas() {
    // obtiene las notas existentes del almacenamiento local
    // convierte el JSON string en array
    return JSON.parse(localStorage.getItem("notasAdhesivas") || "[]");
}

function guardarNotas(notas) {
    // toma un array de notas y las salva en el almacenamiento local
    localStorage.setItem("notasAdhesivas", JSON.stringify(notas));
}

function crearElementoDeNotas(id, contenido) {
    // crea un nuevo elemento HTML (area de texto) para representar una nota
    const elemento = document.createElement("textarea");

    // agrega una clase al elemento para aprovechar sus propiedades CSS
    elemento.classList.add("nota");

    // agrega contenido al elemento
    elemento.value = contenido;
    elemento.placeholder = "Nota adhesiva vacia";

    // agrega EventListener para activar funciones
    elemento.addEventListener("change", () => {
        actualizarNota(id, elemento.value);
    });

    elemento.addEventListener("dblclick", () => {
        // verificamos si el usuario en verdad queria borrar la nota
        const borrado = confirm("En verdad desea borrar esta nota?");

        if (borrado) {
            borrarNota(id, elemento);
        }
    });

    return elemento;
}

function agregarNota() {
    // agrega una nueva nota al array y re-salvar en el almacenamiento local
    const notasExistentes = obtenerNotas();
    const objetoNota = {
        id: Math.floor(Math.random() * 100000),
        contenido: ""
    };

    const elementoNota = crearElementoDeNotas(objetoNota.id, objetoNota.contenido);
    contenedorDeNotas.insertBefore(elementoNota, agregarBotonDeNota);

    notasExistentes.push(objetoNota);
    guardarNotas(notasExistentes);
}

function actualizarNota(id, nuevoContenido) {
    // actualiza una nota existente y la salva en el almacenamiento local
    const notas = obtenerNotas();
    const notaElegida = notas.filter(nota => nota.id == id)[0];

    notaElegida.contenido = nuevoContenido;
    guardarNotas(notas);
}

function borrarNota(id, elemento) {
    // borra una nota existente y la salva en el almacenamiento local
    const notas = obtenerNotas().filter(nota => nota.id != id);

    guardarNotas(notas);
    contenedorDeNotas.removeChild(elemento);
}