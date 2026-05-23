let musicaActual=null;

let musicaMenu=new Audio("menu.mp3");

let musicaLaberinto=new Audio("laberinto.mp3");

let musicaCarta=new Audio("carta.mp3");

musicaMenu.loop=true;

musicaLaberinto.loop=true;

musicaCarta.loop=true;

let jugadorX=40;

let jugadorY=40;

let puntos=0;

let preguntaActual=0;

let estrellaActual=null;

let salidaAbierta=false;

let animandoPuerta=false;

let alphaPuerta=1;

let cartas=[];

let seleccionadas=[];

let parejasEncontradas=0;

let bloqueo=false;

cartas=[

"foto1.png","foto1.png",

"foto2.png","foto2.png",

"foto3.png","foto3.png",

"foto4.png","foto4.png"

];

function cambiarMusica(nueva){

if(musicaActual){

musicaActual.pause();

musicaActual.currentTime=0;

}

musicaActual=nueva;

musicaActual.play();

}

function mezclar(){

cartas.sort(()=>Math.random()-0.5);

}

function crearMemorama(){

seleccionadas=[];

parejasEncontradas=0;

bloqueo=false;

mezclar();

let tablero=document.getElementById("tableroMemorama");

tablero.innerHTML="";

for(let i=0;i<cartas.length;i++){

let img=document.createElement("img");

img.src="reverso.png";

img.dataset.valor=cartas[i];

img.onclick=function(){

voltear(img);

};

tablero.appendChild(img);

}

}

function voltear(img){

if(bloqueo) return;

if(seleccionadas.length==2) return;

if(img.classList.contains("ok")) return;

if(img.classList.contains("volteada")) return;

img.src=img.dataset.valor;

img.classList.add("volteada");

seleccionadas.push(img);

if(seleccionadas.length==2){

bloqueo=true;

setTimeout(verificar,700);

}

}

function verificar(){

let a=seleccionadas[0];

let b=seleccionadas[1];

if(a.dataset.valor==b.dataset.valor){

a.classList.add("ok");

b.classList.add("ok");

parejasEncontradas++;

}else{

a.src="reverso.png";

b.src="reverso.png";

a.classList.remove("volteada");

b.classList.remove("volteada");

}

seleccionadas=[];

bloqueo=false;

if(parejasEncontradas==4){

alert("ganaste el memorama ♡");

estrellas[3].completada=true;

volverLaberintoDesdeMemorama();

}

}

let preguntas=[

{

pregunta:"¿quién habló primero?",

opciones:["jorge","suri"],

correcta:0

},

{

pregunta:"¿cuál fue nuestra primera película?",

opciones:["la la land","project hail mary","el cadáver de la novia"],

correcta:0

},

{

pregunta:"¿cuál es nuestra comida de dates?",

opciones:["hamburguesa","pasta","pizza"],

correcta:0

},

{

pregunta:"¿qué es lo que más amo de ti?",

opciones:["tus ojos","tu bondad","todas las anteriores"],

correcta:2

}

];

function empezar(){

alert("bienvenido amor ♡");

document.getElementById("menu").style.display="none";

document.getElementById("pantalla2").style.display="flex";

cambiarMusica(musicaLaberinto);

}

const canvas=document.getElementById("laberinto");

const ctx=canvas.getContext("2d");

const jugador=new Image();

jugador.src="avatar.png";

const imgcorazon=new Image();

imgcorazon.src="corazon8bits.png";

const estrella=new Image();

estrella.src="estrella.png";

imgcorazon.onload=function(){

dibujar();

}

let paredes=[

{x:0,y:0,w:600,h:20},

{x:0,y:0,w:20,h:400},

{x:580,y:0,w:20,h:300},

{x:580,y:360,w:20,h:40},

{x:0,y:380,w:600,h:20},

{x:80,y:80,w:20,h:220},

{x:80,y:80,w:180,h:20},

{x:160,y:160,w:20,h:180},

{x:240,y:80,w:20,h:180},

{x:240,y:240,w:180,h:20},

{x:340,y:80,w:20,h:180},

{x:420,y:160,w:20,h:180},

{x:500,y:80,w:20,h:180},

{x:80,y:320,w:180,h:20},

{x:340,y:320,w:180,h:20},

{x:560,y:0,w:20,h:400}

];

let corazones=[

{x:40,y:50},

{x:280,y:50},

{x:520,y:50},

{x:200,y:340},

{x:520,y:340}

];

let estrellas=[

{x:120,y:40,tipo:1,completada:false},

{x:520,y:120,tipo:2,completada:false},

{x:120,y:340,tipo:3,completada:false},

{x:500,y:300,tipo:4,completada:false}

];

function dibujar(){

ctx.clearRect(0,0,600,400);

for(let pared of paredes){

if(pared.x==560 && pared.w==20){

if(animandoPuerta){

alphaPuerta-=0.02;

if(alphaPuerta<0) alphaPuerta=0;

ctx.fillStyle=`rgba(255,105,180,${alphaPuerta})`;

ctx.fillRect(pared.x,pared.y,pared.w,pared.h);

}else{

ctx.fillStyle="pink";

ctx.fillRect(pared.x,pared.y,pared.w,pared.h);

}

}else{

ctx.fillStyle="pink";

ctx.fillRect(pared.x,pared.y,pared.w,pared.h);

}

}

if(animandoPuerta){

ctx.fillStyle="rgba(255,255,255,0.3)";

ctx.beginPath();

ctx.arc(570,200,40,0,Math.PI*2);

ctx.fill();

}

for(let corazon of corazones){

ctx.drawImage(imgcorazon,corazon.x,corazon.y,30,30);

}

for(let estrellaObj of estrellas){

if(!estrellaObj.completada){

ctx.drawImage(estrella,estrellaObj.x,estrellaObj.y,35,35);

}

}

ctx.drawImage(jugador,jugadorX,jugadorY,40,40);

ctx.fillStyle="white";

ctx.font="20px Arial";

ctx.fillText("♡ "+puntos,20,30);

}

function colision(x,y){

for(let pared of paredes){

if(pared.x==560){

if(!salidaAbierta){

if(

x < pared.x + pared.w &&

x + 40 > pared.x &&

y < pared.y + pared.h &&

y + 40 > pared.y

){

return true;

}

}

continue;

}

if(

x < pared.x + pared.w &&

x + 40 > pared.x &&

y < pared.y + pared.h &&

y + 40 > pared.y

){

return true;

}

}

return false;

}

function recogerCorazones(){

for(let i=0;i<corazones.length;i++){

let corazon=corazones[i];

if(

jugadorX < corazon.x + 30 &&

jugadorX + 40 > corazon.x &&

jugadorY < corazon.y + 30 &&

jugadorY + 40 > corazon.y

){

corazones.splice(i,1);

puntos++;

}

}

}

function tocarEstrella(){

for(let estrellaObj of estrellas){

if(estrellaObj.completada) continue;

if(

jugadorX < estrellaObj.x + 35 &&

jugadorX + 40 > estrellaObj.x &&

jugadorY < estrellaObj.y + 35 &&

jugadorY + 40 > estrellaObj.y

){

abrirPrueba(estrellaObj.tipo);

}

}

}

function abrirPrueba(tipo){

document.getElementById("pantalla2").style.display="none";

estrellaActual=tipo;

if(tipo==1){

document.getElementById("trivia").style.display="flex";

cargarPregunta();

}

if(tipo==2){

document.getElementById("momentos").style.display="flex";

}

if(tipo==3){

document.getElementById("cosas").style.display="flex";

}

if(tipo==4){

document.getElementById("memorama").style.display="flex";

crearMemorama();

}

}

function cargarPregunta(){

let actual=preguntas[preguntaActual];

document.getElementById("preguntaTrivia").innerText=actual.pregunta;

let botones=document.querySelectorAll("#opcionesTrivia button");

for(let i=0;i<botones.length;i++){

if(actual.opciones[i]){

botones[i].style.display="block";

botones[i].innerText=actual.opciones[i];

}else{

botones[i].style.display="none";

}

}

}

function respuesta(opcion){

let actual=preguntas[preguntaActual];

if(opcion==actual.correcta){

alert("correcto ♡");

preguntaActual++;

if(preguntaActual<preguntas.length){

cargarPregunta();

}else{

alert("terminaste la trivia ♡");

estrellas[0].completada=true;

volverLaberinto();

}

}else{

alert("Incorrecto :( aunque honestamente yo tampoco recordaba bien JAJA");

}

}

function volverLaberinto(){

document.getElementById("trivia").style.display="none";

document.getElementById("pantalla2").style.display="flex";

}

function cerrarMomentos(){

estrellas[1].completada=true;

document.getElementById("momentos").style.display="none";

document.getElementById("pantalla2").style.display="flex";

}

function cerrarCosas(){

estrellas[2].completada=true;

document.getElementById("cosas").style.display="none";

document.getElementById("pantalla2").style.display="flex";

}

function volverLaberintoDesdeMemorama(){

document.getElementById("memorama").style.display="none";

document.getElementById("pantalla2").style.display="flex";

}

document.addEventListener("keydown",mover);

function mover(evento){

let tecla=evento.key.toLowerCase();

let nuevaX=jugadorX;

let nuevaY=jugadorY;

if(tecla=="w"||tecla=="arrowup") nuevaY-=5;

if(tecla=="s"||tecla=="arrowdown") nuevaY+=5;

if(tecla=="a"||tecla=="arrowleft") nuevaX-=5;

if(tecla=="d"||tecla=="arrowright") nuevaX+=5;

if(!colision(nuevaX,nuevaY)){

jugadorX=nuevaX;

jugadorY=nuevaY;

}

recogerCorazones();

tocarEstrella();

dibujar();

ganar();

}

function ganar(){

if(puntos==5 && !salidaAbierta){

salidaAbierta=true;

animandoPuerta=true;

}

if(jugadorX>560 && salidaAbierta){

document.getElementById("pantalla2").style.display="none";

document.getElementById("pantallaFinal").style.display="flex";

cambiarMusica(musicaCarta);

}

}

jugador.onload=function(){

dibujar();

}

window.onload=function(){

cambiarMusica(musicaMenu);

dibujar();

}