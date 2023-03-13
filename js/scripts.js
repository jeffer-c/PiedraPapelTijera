'use strict'
// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
// // //
//Variables necesarias para el conteo y la elección del usuario.
var numeroPartidasJugadas = 0;
var opcionUsuario = 0;
//variables
var nombreJugador = null;
var numeroPartidasTotales = 0;
//Elementos seleccionados del DOM para su posterior uso.
const btnElegido = [];
btnElegido[0] = document.getElementById("imgPiedra");
btnElegido[1] = document.getElementById("imgPapel");
btnElegido[2] = document.getElementById("imgTijera");
const btnYa = document.getElementById("btnYa");
const btnJugar = document.getElementById("btnJugar");
const btnReset = document.getElementById("btnReset");
const areaPartida = document.getElementById("areaPartida");
const imgMaquina = document.getElementById("imgMaquina");
const styleMaquina = document.getElementById("styleMaquina");
const historial = document.getElementById("historial");
const valorPartidasTotales = document.getElementById("total");
const valorPartidaActual = document.getElementById("actual");
//Datos que serán inluidos en la lógica del juego.
const piedra = 0;
const papel = 1;
const tijera = 2;
const empate = 0;
const ganas = 1;
const pierdes = 2;
//Expresión regular para la validación.
const regName = /^[A-z]{3,50}/;
///////////////////////////////////////////////////////////////////////////////////////////////////

// recojemos los datos
function obtenerDatos(){
    //Valores que obtengo de los inputs.
    nombreJugador = document.getElementById("nombre").value;
    numeroPartidasTotales = document.getElementById("partidas").value;
}

// validamos los datos
function validacion(){
    if(nombreJugador == null || numeroPartidasTotales == 0){
        alert("Debes introducir el nombre y cantidad de partidas para empezar a jugar.");
        return false;
    }else if (numeroPartidasTotales == numeroPartidasJugadas){
        alert("Fin de la partida\nPresiona RESET para volver a empezar.");
        return false;
    }else{
        if (!regName.test (nombreJugador)) {
            nombre.classList.add("fondoRojo");
            return false;
        } else {
            nombre.classList.remove("fondoRojo");
            return true;
        }
    }
}

// listas de eventos que se ejecutarán al hacer click
btnElegido[0].addEventListener("click", function () {
    if(validacion()){
        opcionUsuario = 0;
        seleccion(opcionUsuario);
    }
});
btnElegido[1].addEventListener("click", function () {
    if(validacion()){
        opcionUsuario = 1;
        seleccion(opcionUsuario);
    }
});
btnElegido[2].addEventListener("click", function () {
    if(validacion()){
        opcionUsuario = 2;
        seleccion(opcionUsuario);
    }
});
btnJugar.addEventListener("click", function(){
    if(validacion()){
        areaPartida.style.display = "block";
        valorPartidasTotales.textContent = numeroPartidasTotales;
    }
});
btnYa.addEventListener("click", function () {
    if(validacion()){
        jugar(opcionUsuario);
        numeroPartidasJugadas++;
        valorPartidaActual.textContent = numeroPartidasJugadas;
        btnYa.style.visibility = "hidden";
    }
});
btnReset.addEventListener("click",function(){
    // insertamos el texto en el historico y restablacemos los valores
    historial.innerHTML += "<li> Nueva partida </li>";
    areaPartida.style.display = "none";
    imgMaquina.style.visibility = "hidden";
    btnElegido[opcionUsuario].classList.remove("seleccionado");
    btnElegido[opcionUsuario].classList.add("noSeleccionado");
    numeroPartidasTotales = 0;
    numeroPartidasJugadas = 0;
    valorPartidasTotales.textContent = numeroPartidasTotales;
    valorPartidaActual.textContent = numeroPartidasJugadas;
});
// definimos el estilo según el indice del elemento imagen al que hallamos hecho click.
function seleccion(elegido){
    for(let i = 0; i <= 3; i++){
        if(i == elegido){
            btnElegido[i].classList.remove("noSeleccionado");
            btnElegido[i].classList.add("seleccionado");
            btnYa.style.visibility = "visible";
        }else{
            btnElegido[i].classList.remove("seleccionado");
            btnElegido[i].classList.add("noSeleccionado");
        }
    }
}
// realizamos la ejecución del juego, teniendo en cuenta los valores cargados y generados por la máquina.
function jugar(opcionUsuario1){
    opcionUsuario1 = opcionUsuario;
    imgMaquina.src = "img/piedraOrdenador.png";
    imgMaquina.classList.add("styleMaquina");
    imgMaquina.style.visibility = "visible";
    // establecemos un tiempo de espera para que se muestre el resultado.
    setTimeout(function(){
        imgMaquina.classList.remove("styleMaquina");
        const opcionMaquina = Math.floor(Math.random() * 3);
        mostrarManoMaquina(opcionMaquina);
        const resultado = calcResultado(opcionUsuario1, opcionMaquina);
        switch(resultado){
            case empate:
                historial.innerHTML += "<li> Empate </li>";
                break;
            case ganas:
                historial.innerHTML += "<li> Gana " + nombreJugador + " </li>";
                break;
            case pierdes:
                historial.innerHTML += "<li> Gana la máquina </li>";
                break;
        }
    }, 1210);
}
// calculamos la opcion elegida frente a la opción generada por el ordenador.
function calcResultado(opcionUsuario,opcionMaquina){
    if(opcionUsuario == opcionMaquina){
        return empate;
    }else if(opcionUsuario === piedra){
        if(opcionMaquina === papel) return pierdes;
        if(opcionMaquina === tijera) return ganas;
    }else if(opcionUsuario === papel){
        if(opcionMaquina === piedra) return ganas;
        if(opcionMaquina === tijera) return pierdes;
    }else if(opcionUsuario === tijera){
        if(opcionMaquina === papel) return ganas;
        if(opcionMaquina === piedra) return pierdes;
    }
}
// finalmente mostramos el resultado elegido por la máquina, según el valor que recibimos por parámetro.
function mostrarManoMaquina(imgActual){
    imgMaquina.src = "img/" + posibilidades[imgActual] + "Ordenador.png";
}