//https://www.youtube.com/watch?v=wFC73s3CrKc
//v. globales:
let juego;
let recursos;
let audio;

//carga de recursos:
function preload() {
  recursos = new Recur();
  recursos.cargarRecursos();
  audio = new Audio();
  audio.cargarAudios();
}
function setup() {
  createCanvas(640, 480);
  juego = new Juego(recursos, audio);
}
function draw() {
  juego.actualizar();
  juego.dibujar();
}
function mousePressed() {
  audio.iniciarMusica();
  juego.manejarClick(mouseX, mouseY);
}
