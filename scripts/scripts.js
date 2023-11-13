let cajaUltimaLetra;
let contenedorLetraUnitaria;
let peliculaAleatoria;
let divsDeLasLetras;
let puntuacion = 0;
let partesAhorcado = ["cabeza", "cuerpo", "brazoIzq", "brazoDer", "manoizq", "manoDer", "piernaIzq", "piernaDer", "pieizq", "pieDer"];// array partes del cuerpo con el mismo id para hacer la comparación y así ir mostrándolos poco a poco 
let partesMostradas= 0;
let letrasUtilizadas = [];

let peliculasNavidenas = [
    "Mi Pobre Angelito",
    "El Expreso Polar",
    "Pesadilla Antes de Navidad",
    "Milagro en la Calle",
    "El Grinch",
    "Navidad en las Montañas",
    "Navidad con los Kranks",
    "Es un Hermoso Dia en el Vecindario",
    "El Regalo Prometido",
    "El Albergue de las Travesuras"
  ];//array películas navideñas


window.onload = function() {
    var teclado = document.getElementById("teclado");
    for(let teclaActual = 65; teclaActual <= 90;teclaActual++) {
        tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        tecla.addEventListener("click", pulsar);
        teclado.appendChild(tecla);
        
        

    }

    ocultarTodo(); //ocultamos todas las partes del Papa Noel




    cajaUltimaLetra = document.getElementById('letra');
    contenedorLetraUnitaria = document.getElementById('contenedorLetraUnitaria')
   

    elegirPeliculaAleatoria();
    cargarPelicula();
    divsDeLasLetras = document.getElementsByClassName("letraPeli");
    divsDeLasLetrasUnitarias = document.getElementsByClassName("letraUnitaria");
    esconderLetras();
    partesMostradas = 0;



    let restartButton = document.getElementById("btnRestart");
    restartButton.addEventListener("click", reiniciarJuego);
}

document.addEventListener('keydown', function(event) {
  // Verifica si la tecla presionada es una letra
  if (/^[a-zA-Z]$/.test(event.key)) {
      // Llama a la función pulsar con la letra presionada
      pulsar.call({innerText: event.key}); //Si la tecla presionada es una letra, se llama a la función pulsar y se le pasa el objeto simulado {innerText: event.key}.
  }
});




function pulsar() {

    let letrapulsada = this.innerText;


      if (letrasUtilizadas.includes(letrapulsada.toLowerCase())) {
          // Si la letra ya fue utilizada, aplicar cambio de estilo temporal y no hacer nada más
          let letrasRepetidas = Array.from(divsDeLasLetras).filter(letra => letra.innerText.toLowerCase() === letrapulsada.toLowerCase());

          for (let i = 0; i < letrasRepetidas.length; i++) {
              letrasRepetidas[i].classList.add("letraUtilizada");
              setTimeout(() => {
                  letrasRepetidas[i].classList.remove("letraUtilizada");
              }, 1500); // Tiempo que dura la animación
          }

          // Buscar la letra específica en divsDeLasLetrasUnitarias
          let letraPresionada = Array.from(divsDeLasLetrasUnitarias).find(letra => letra.innerText.toLowerCase() === letrapulsada.toLowerCase());

          // Marcar solo la letra presionada
          if (letraPresionada) {
              letraPresionada.classList.add("letraUtilizada");
              setTimeout(() => {
                  letraPresionada.classList.remove("letraUtilizada");
              }, 1500); // Tiempo que dura la animación
          }

          return;
    }




    cajaUltimaLetra.innerText = "Última letra usada: " +letrapulsada;

    let valorLetraBase = 1000;
    let decremento = partesMostradas * 100;
    let valorLetra = Math.max(valorLetraBase - decremento, 0);
    //oparaciones matemáticas para la puntuación


    let divletra = document.createElement("div");
    divletra.innerText=letrapulsada;
    divletra.classList.add("letraUnitaria");
    contenedorLetraUnitaria.appendChild(divletra);// añadir divs(con las letras escritas) con la clase letraUnitaria dentro del contenedor LetraUnitaria




    letrasUtilizadas.push(letrapulsada.toLowerCase()); //añadimos la letra utilizada en el array de letras utilizadas

    let letraAdivinada = false;


    for (letra of divsDeLasLetras) {
      if (letra.innerText.toLowerCase() === letrapulsada.toLowerCase()) {
          if (letra.classList.contains("ocultarLetra")) {
              letra.classList.remove("ocultarLetra");
              puntuacion += valorLetra;
              letraAdivinada = true;
          }
      }
  }



    if (letraAdivinada) {
        let puntuacionFormateada = puntuacion.toString().padStart(5, '0');
        document.getElementById("numeroScore").innerText = puntuacionFormateada;
    }else {
      // Si no adivino la letra, mostrar la próxima parte del ahorcado
        if (partesMostradas < partesAhorcado.length) {
            document.getElementById(partesAhorcado[partesMostradas]).classList.remove("ocultar");
            partesMostradas++;
        }
    }



    let letrasAdivinadas = Array.from(divsDeLasLetras).filter(letra => !letra.classList.contains("ocultarLetra"));
    
    if (letrasAdivinadas.length === divsDeLasLetras.length) {
        // Ganaste el juego
        mostrarMensaje("¡Felicidades! Has acertado la película. Puntuación: " + puntuacion, "green");
        desactivarJuego();
        return;
    }

    if (partesMostradas === partesAhorcado.length) {
      // Perdiste el juego
      mostrarMensaje("¡Eres un LOSER! La película era: " + peliculaAleatoria, "red");
      desactivarJuego();
      return;
  }





}



  function ocultarTodo(){
    let classExtremidades = document.getElementsByClassName("extremidad");
        for(extremidad of classExtremidades){
            extremidad.classList.add("ocultar")


        }
  
  }

  function elegirPeliculaAleatoria(){
    let indiceAleatorio = Math.floor(Math.random() * peliculasNavidenas.length);
    peliculaAleatoria = peliculasNavidenas[indiceAleatorio];


  }



function cargarPelicula(){
  let cajaPelicula = document.getElementById("pelicula");
  let cantidadDeLetras = peliculaAleatoria.length;


 while (cajaPelicula.firstChild) {
  cajaPelicula.removeChild(cajaPelicula.firstChild);
} //para cada vez que reiniciamos no se sobrepongan unas películas a continuación de las otras


 for(let i = 0; i< cantidadDeLetras; i++ ){

    let div = document.createElement('div');
    div.classList.add("letraPeli");
    cajaPelicula.appendChild(div);
    div.innerText = peliculaAleatoria[i];

    if( peliculaAleatoria[i] === " "){
      div.classList.remove("letraPeli");
      div.classList.add("letraPeliEspacio");

    }


 }
}

function esconderLetras(){
  for(letra of divsDeLasLetras){
  letra.classList.add("ocultarLetra");


  }
}


//funcion para crear mensaje si ganas o pierdes
function mostrarMensaje(mensaje, color) {
  let mensajeModal = document.getElementById("mensajeModal");
  mensajeModal.innerText = mensaje;
  mensajeModal.style.color = color;

  // Mostrar el modal
  let modal = document.getElementById("modal");
  modal.style.display = "block";



  // Capturar el botón de reinicio
  let btnRestart = document.getElementById("btnRestart");
  btnRestart.onclick = function() {
    modal.style.display = "none";
    reiniciarJuego();
  };
}



function desactivarJuego() {
  // Desactivar interacción con el teclado y botones
  document.removeEventListener('keydown', pulsar);
  document.getElementById("teclado").style.pointerEvents = "none";
}


function reiniciarJuego() {
  // Restablecer variables y elementos del juego al estado inicial
  puntuacion = 0;
  partesMostradas = 0;
  letrasUtilizadas = [];

  // Ocultar partes del ahorcado
  ocultarTodo();

  // Elegir una nueva película aleatoria
  elegirPeliculaAleatoria();

  // Reiniciar la carga de la película
  cargarPelicula();

  // Ocultar letras
  esconderLetras();

  // Reiniciar el número de la puntuación
  document.getElementById("numeroScore").innerText = "00000";

  // Eliminar el mensaje anterior, si hay alguno
  let mensajeAnterior = document.querySelector("body > div");
  if (mensajeAnterior) {
      mensajeAnterior.remove();
  }

  // Activar interacción con el teclado y botones
  document.addEventListener('keydown', pulsar);
  document.getElementById("teclado").style.pointerEvents = "auto";

  let contenedorLetraUnitaria = document.getElementById("contenedorLetraUnitaria");
  while (contenedorLetraUnitaria.firstChild) {
      contenedorLetraUnitaria.removeChild(contenedorLetraUnitaria.firstChild);
  }//para que se reinicie el contenedor de las letras utilizadas también
}
