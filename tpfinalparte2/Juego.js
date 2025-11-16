class Juego {
constructor() {
this.estado = "inicio";
this.nivelActual = 0;
this.niveles = [];
this.nivelesCompletados = 0;
this.musicaGanaste = null;
this.musicaPerdiste = null;
this.musica = null;
this.inicializarNiveles();
}
inicializarNiveles() {
this.niveles = [
new Nivel(1, imagenes.nivel1, imagenes.rosa, 10, 1),
new Nivel(2, imagenes.nivel2, imagenes.rosa, 8, 2),
new Nivel(3, imagenes.nivel3, imagenes.rosa, 7, 3),
new Nivel(4, imagenes.nivel4, imagenes.rosa, 6, 4),
new Nivel(5, imagenes.nivel5, imagenes.rosa, 5, 5)
];
this.botonInicio = new Boton(240, 350, 160, 50, "JUGAR", this.empezarJuegoCallback(), imagenes.boton);
this.botonReiniciar = new Boton(238, 350, 160, 50, "REINICIAR", this.reiniciarCallback(), imagenes.boton);
}
empezarJuegoCallback() {
let self = this;
return function() {
self.empezarJuego();
};
}
reiniciarCallback() {
let self = this;
return function() {
self.reiniciar();
};
}
empezarJuego() {
this.estado = "jugando";
this.nivelActual = 0;
this.nivelesCompletados = 0;
this.niveles[this.nivelActual].iniciar();
}
siguienteNivel() {
this.nivelesCompletados++;
this.nivelActual++;
if (this.nivelActual < this.niveles.length) {
this.niveles[this.nivelActual].iniciar();
} else {
this.estado = "final";
this.musica.stop();
if (this.nivelesCompletados >= 3) {
this.musicaGanaste.setVolume(0.5);
this.musicaGanaste.play();
} else {
this.musicaPerdiste.setVolume(0.5);
this.musicaPerdiste.play();
}
}
}
fallarNivel() {
this.nivelActual++;
if (this.nivelActual < this.niveles.length) {
this.niveles[this.nivelActual].iniciar();
} else {
this.estado = "final";
this.musica.stop();
if (this.nivelesCompletados >= 3) {
this.musicaGanaste.setVolume(0.5);
this.musicaGanaste.play();
} else {
this.musicaPerdiste.setVolume(0.5);
this.musicaPerdiste.play();
}
}
}
reiniciar() {
this.estado = "inicio";
this.nivelActual = 0;
this.nivelesCompletados = 0;
for (let i = 0; i < this.niveles.length; i++) {
this.niveles[i].reiniciar();
}
this.musica.loop();
}
actualizar() {
if (this.estado === "jugando") {
const nivelActual = this.niveles[this.nivelActual];
nivelActual.actualizar();
if (nivelActual.completado && !nivelActual.transicionIniciada) {
nivelActual.transicionIniciada = true;
let self = this;
setTimeout(function() {
self.siguienteNivel();
}, 500);
}
if (nivelActual.fallado && !nivelActual.transicionIniciada) {
nivelActual.transicionIniciada = true;
let self = this;
setTimeout(function() {
self.fallarNivel();
}, 500);
}
}
}
manejarClick(x, y) {
if (this.estado === "inicio") {
this.botonInicio.verificarClick(x, y);
} else if (this.estado === "jugando") {
this.niveles[this.nivelActual].verificarClick(x, y);
} else if (this.estado === "final") {
this.botonReiniciar.verificarClick(x, y);
}
}
dibujar() {
if (imagenes.fondo) {
image(imagenes.fondo, 0, 0, 640, 480);
} else {
background(26, 26, 46);
}
if (this.estado === "inicio") {
this.dibujarInicio();
} else if (this.estado === "jugando") {
this.niveles[this.nivelActual].dibujar();
} else if (this.estado === "final") {
this.dibujarFinal();
}
}
dibujarInicio() {
fill(15, 52, 96, 220);
noStroke();
rect(50, 50, 540, 380, 0, 70, 0, 70);
fill(252, 253, 227);
textAlign(CENTER, CENTER);
textFont(fuentetitulo);
textSize(60);
text("Hechizado", 320, 90);
fill(252, 253, 227);
textFont(fuentecreditos);
textSize(30);
textStyle(BOLD);
text("Lina Alonso Citón pmiw 2025", width/2, 450);
fill(255, 249, 229);
textFont(fuentereglas);
textSize(24);
textStyle(NORMAL);
textAlign(CENTER, CENTER);
text("INSTRUCCIONES:", 320, 140);
fill(255, 249, 229);
textFont(fuentereglas);
textSize(19);
textStyle(NORMAL);
textAlign(CENTER, CENTER);
text("~ Bienvenid@ al jardín encantado ~", 320, 170);
fill(255, 249, 229);
textFont(fuentereglas);
textSize(17);
textAlign(CENTER, CENTER);
const instrucciones = [
"Estás atrapad@ y debes lograr encontrar todas las rosas para escapar",
" del hechizo antes de que se acabe el tiempo y olvides tu misión.",
"Hay cinco senderos que tendrás que atravesar para",
"conseguir huir. La cantidad de rosas depende del nivel,",
"pero ¡ojo! hay rosas rojas que son parte de una trampa",
"del jardín, y si las seleccionas, te restarán segundos.",
"",
"¡Mucha suerte! Espero verte en la salida..."
];
for (let i = 0; i < instrucciones.length; i++) {
text(instrucciones[i], width/2, 200 + i * 17);
}
this.botonInicio.dibujar();
}
dibujarFinal() {
fill(15, 52, 96);
rect(50, 50, 540, 380);
const gano = this.nivelesCompletados >= 3;
if (gano && imagenes.ganaste) {
image(imagenes.ganaste, 0, 0, 840, 480);
} else if (!gano && imagenes.perdiste) {
image(imagenes.perdiste, 0, 0, 840, 480);
}
if (gano) {
fill(202, 107, 92, 180);
noStroke();
rect(50, 50, 540, 380, 0, 70, 0, 70);
} else {
fill(64, 116, 139, 180);
noStroke();
rect(50, 50, 540, 380, 0, 70, 0, 70);
}
textAlign(CENTER, CENTER);
textFont(fuentetitulo);
textSize(60);
if (gano) {
fill(252, 253, 227);
text("GANASTE", 320, 80);
} else {
fill(252, 253, 227);
text("PERDISTE", 320, 80);
}
if (gano) {
fill(252, 241, 227);
textFont(fuentereglas);
textSize(30);
textAlign(CENTER, CENTER);
text("¡Felicidades!", 320, 140);
text("Lograste huir del jardín encantado", 320, 170);
text("y retomar tu aventura", 320, 200);
text("para volver a casa con tu mejor amigo", 320, 230);
} else {
fill(252, 241, 227);
textFont(fuentereglas);
textSize(30);
textAlign(CENTER, CENTER);
text("¡Fuiste Hechizad@!", 320, 140);
text("No lograste huir del jardín encantado", 320, 170);
text("y olvidaste tu misión", 320, 200);
text("Mucha suerte la próxima!", 320, 230);
}
fill(252, 241, 227);
textFont(fuentecompletados);
textSize(30);
text(this.nivelesCompletados + '/5', 320, 290);
textSize(28);
text("Niveles Completados", 320, 320);
this.botonReiniciar.dibujar();
}
}
