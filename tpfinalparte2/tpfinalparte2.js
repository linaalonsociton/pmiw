//https://youtu.be/wFC73s3CrKc?si=bDO2L5Zw2WgWtVDw
let juego;
let imagenes = {};
let fuentejugar;
let fuentetitulo;
let fuentereglas;
let musica;
let musicaGanaste;
let musicaPerdiste;
let musicaPrendida = false;
function preload() {
fuentereglas = loadFont ("data/Akeila.ttf");
fuentejugar = loadFont("data/boton.ttf");
fuentetitulo = loadFont("data/prueba.ttf");
fuentecompletados = loadFont ("data/completados.otf");
fuentecreditos = loadFont ("data/creditos.ttf");
imagenes.nivel1 = loadImage("data/nivel1.png");
imagenes.nivel2 = loadImage("data/nivel2.png");
imagenes.nivel3 = loadImage("data/nivel3.png");
imagenes.nivel4 = loadImage("data/nivel4.png");
imagenes.nivel5 = loadImage("data/nivel5.png");
imagenes.rosa = loadImage("data/rosa.png");
imagenes.boton = loadImage("data/imgboton.png"); 
imagenes.fondo = loadImage ("data/fondo.png");
imagenes.ganaste = loadImage("data/ganaste.png");
imagenes.perdiste = loadImage("data/perdiste.png");
musica = loadSound("data/musiquita.mp3"); 
musicaGanaste = loadSound("data/musicaganaste.mp3");
musicaPerdiste = loadSound("data/musicaperdiste.mp3");
}
function setup() {
createCanvas(640, 480);
juego = new Juego();
juego.musica = musica;
juego.musicaGanaste = musicaGanaste;
juego.musicaPerdiste = musicaPerdiste;
}
function draw() {
juego.actualizar();
juego.dibujar();
}
function mousePressed() {
if (!musicaPrendida) {
musica.loop();
musica.setVolume(0.3);
musicaPrendida = true;
}
juego.manejarClick(mouseX, mouseY);
}
