//Variables de ids
const BOTON=document.getElementById("boton");
const TEXTO=document.getElementById("texto");

//Variables utilizadas para el juego
let intentos = 6;
let listaAuxiliarEnError=["MOUSE","HOUSE","FUNNY","HORSE","ANGEL","APPLE"
                        ,"MANGO","SWIFT","CHIME","JUMBO","BLEND","GRASP"
                        ,"FLUTE","PLUSH","TABLE","LABEL","SMILE","HAPPY"
                        ,"HELLO","BEACH"];
let palabra;
const UrlApi = "https://random-word-api.herokuapp.com/word?lang=en&&length=5";
fetch(UrlApi).then(response => response.json()).then(response=>{
    palabra=response[0].toUpperCase();
    console.log("API: ",palabra);
}).catch(err =>{
    palabra= listaAuxiliarEnError[Math.floor(Math.random()*listaAuxiliarEnError.length)]
    console.log("Lista auxiliar: ",palabra);
});

//Accion de un evento con presionar el boton
BOTON.addEventListener("click", intento);

//Accion de un evento con presionar "Enter"
TEXTO.addEventListener("change", intento);

//Funcion donde se obtiene el valor del input
function leerIntento(){
    let valor=TEXTO.value.toUpperCase().replace(/\s/g, '');
    return valor;    
}

//Funcion de los intentos
function intento(){
    const INTENTO = leerIntento();
    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    const ERROR = document.getElementById("error");
    ROW.className="row";
    if(INTENTO.length!==5){
        ERROR.innerHTML="* Ingrese una palabra de 5 letras";
        ERROR.style.display="block";
    }else{
        ERROR.style.display="none";
        for(let i in palabra){
            const SPAN=document.createElement("span");
            SPAN.className="letra";
            if(INTENTO[i]===palabra[i]){
                SPAN.innerHTML=INTENTO[i];
                SPAN.style.background="#29bf12";
            }else if(palabra.includes(INTENTO[i])){
                SPAN.innerHTML=INTENTO[i];
                SPAN.style.background="#ffe169";
            }else{
                SPAN.innerHTML=INTENTO[i];
                SPAN.style.background="grey";
            }
            ROW.appendChild(SPAN);
        }
        GRID.appendChild(ROW);
        //Decremento del contador
        intentos--;
        if(INTENTO===palabra){
            terminar("<h1>GANASTE😎👌</h1>");
            return;
        }else if(intentos==0){
            terminar("<h1>PERDISTE🥲👎</h1>");
        }
    }
    TEXTO.value="";//Vacio el input
}

function terminar(mensaje){
    BOTON.disabled = true;
    TEXTO.disabled=true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}