window.addEventListener("load", init);
//Variables de ids.
const BOTON=document.getElementById("boton");
const TEXTO=document.getElementById("texto");

//Variables utilizadas para el juego.
let intentos = 6;
//Variable donde se guarda las palabras aleatorias.
let palabra;
//Variable donde se guarda la URL del API.
const UrlApi = "https://random-word-api.herokuapp.com/word?lang=en&&length=5";
//Una lista auxiliar con palabras aleatorias, por si la API no funciona.
let listaAuxiliarEnError=["MOUSE","HOUSE","FUNNY","HORSE","ANGEL","APPLE"
                        ,"MANGO","SWIFT","CHIME","JUMBO","BLEND","GRASP"
                        ,"FLUTE","PLUSH","TABLE","LABEL","SMILE","HAPPY"
                        ,"HELLO","BEACH"];
/*
Funcion para obtener la palabra aleatoria.
Si ocurre un error se quita de la lista auxiliar.
Para impresiones por pantalla son para controlar si se obtuvo la palabra
de la API o de la lista auxiliar.
*/
fetch(UrlApi).then(response => response.json()).then(response=>{
    palabra=response[0].toUpperCase();
    //console.log("API: ",palabra);
}).catch(err =>{
    palabra= listaAuxiliarEnError[Math.floor(Math.random()*listaAuxiliarEnError.length)]
    //console.log("Lista auxiliar: ",palabra);
});

//Funcion inicial.
function init(){
    //Accion de un evento con presionar el boton.
    BOTON.addEventListener("click", intento);

    //Accion de un evento con presionar "Enter".
    TEXTO.addEventListener("change", intento);
}

/*
Funcion donde se obtiene el valor del input.
En la variable valor se obtiene el contenido del input, se pasa todo
a mayusculas y se quita los espacios en blanco.
*/
function leerIntento(){
    let valor=TEXTO.value.toUpperCase().replace(/\s/g, '');
    return valor;    
}

/*
Funcion de los intentos.
Aqui se comprueba las longitud del valor del input,se comprueba si es 
la palabra a adivinar, se muestra en la pagina las letras con colores
y si ganaste o perdiste.
*/
function intento(){
    const INTENTO = leerIntento();//Pide el valor del input
    //Variables de los IDs.
    const GRID = document.getElementById("grid");
    const ERROR = document.getElementById("error");
    //Se crea un elemento.
    const ROW = document.createElement("div");
    ROW.className="row";
    if(INTENTO.length!==5){//Compruebo si es una palabra de 5 letras.
        //Mensaje de error y se muestra en la pagina.
        ERROR.innerHTML="* Ingrese una palabra de 5 letras";
        ERROR.style.display="block";
    }else{//Si es una palabra de 5 letras se realiza las comprubaciones.
        //Se oculta el mensaje de error.
        ERROR.style.display="none";
        for(let i in palabra){
            //Se crea un elemento.
            const SPAN=document.createElement("span");
            SPAN.className="letra";
            //Se comprueba si las letras son iguales en la misma posicion.
            if(INTENTO[i]===palabra[i]){
                //Se muestra de color verde en la pagina.
                SPAN.innerHTML=INTENTO[i];
                SPAN.style.background="#5cb85c";
            //Se comprueba si hay una letra similar en otra posicion.
            }else if(palabra.includes(INTENTO[i])){
                //Se muestra de color amarillo en la pagina.
                SPAN.innerHTML=INTENTO[i];
                SPAN.style.background="#ffe169";
            }else{
                //Se muestra de color gris en la pagina.
                SPAN.innerHTML=INTENTO[i];
                SPAN.style.background="grey";
            }
            //Se agrega el span en row.
            //Se agrega un span en un div.
            ROW.appendChild(SPAN);
        }
        //Se agrega el row en grid.
        //Se agrega un div dentro de otro.
        GRID.appendChild(ROW);
        //Decremento del contador
        intentos--;
        //Si el valor ingresado es igual a la palabra, se gana el juego.
        if(INTENTO===palabra){
            terminar("<h1>GANASTE😎👌</h1>");
            return;
        //Si el contador de intentos llega a cero, se pierde el juego.
        }else if(intentos==0){
            terminar("<h1>PERDISTE🥲👎</h1>");
            ERROR.innerHTML="La palabra es "+palabra;
            ERROR.style.display="block";
        }
    }
    TEXTO.value="";//Vacio el input.
}

//Funcion que muestra si ganas o perdiste.
function terminar(mensaje){
    BOTON.disabled = true;
    TEXTO.disabled=true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}