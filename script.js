const BUTTON = document.getElementById('guess-button');
const INPUT = document.getElementById('guess-input');
BUTTON.addEventListener('click', intentar);

let intentos = 3;
let palabras = ["VERDE", "CABRA", "CAMPO", "DADOS", "ERROR", "GAFAS", "IDEAS"];//comentar esta linea para utilizar la API.
let indiceAleat = Math.floor(Math.random() * palabras.length);//comentar esta linea para utilizar la API.
let palabra = palabras[indiceAleat];//comentar esta linea para utilizar la API.
console.log(palabra);//comentar esta linea para utilizar la API.

//Descomentar para utilizar la API.
//Función para remover acentos de las palabras.
/*const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const UrlApi = 'https://random-word-api.herokuapp.com/word?lang=es&&length=5';
fetch(UrlApi).then(response => response.json()).then(response =>{
    palabra = removeAccents(response[0].toUpperCase());
    console.log("API:", palabra);
})
.catch(err =>{
    console.log('Hubo un problema con API! :(');
    let palabras = ["VERDE", "CABRA", "CAMPO", "DADOS", "ERROR", "GAFAS", "IDEAS",
    "HIELO", "ISLAS", "JULIO", "NADAR", "NUBES", "NAVES"];
    let indiceAleat = Math.floor(Math.random() * palabras.length);
    let palabra = palabras[indiceAleat];
    console.log(palabra);
})*/

INPUT.addEventListener("keyup", function (e) {
    if (e.code === 'Enter') {
        BUTTON.click();
        limpiar();
    }
});


function leerIntento() {
    let valor = document.getElementById('guess-input').value;
    valor = valor.toUpperCase();
    return valor;
}

function intentar() {
    const GRID = document.getElementById('grid');
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento();

    //Validamos que la palabra tengo 5 letras.
    if(INTENTO.trim().length != 5){
        alert('Solo se aceptan palabras de 5 letras.');
        return
    }
    
    for(let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = "letter";

        if(palabra[i] === INTENTO[i]){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.background = 'green';
        }else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.background = 'yellow';
        }else{
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.background = 'gray';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE! :)</h1>");
        return
    }

    intentos--;
    if (intentos == 0) {
        terminar("<h1>PERDISTE!:(</h1>");
    }
    limpiar();
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

function limpiar(){
    INPUT.value = '';
}