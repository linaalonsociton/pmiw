class Nivel {
constructor(numero, imagenFondo, imagenRosa, tiempo, dificultad) {
this.numero = numero;
this.imagenFondo = imagenFondo;
this.imagenRosa = imagenRosa;
this.tiempoTotal = tiempo;
this.tiempoRestante = tiempo;
this.dificultad = dificultad;
this.rosas = [];
this.rosasEncontradas = 0;
this.completado = false;
this.fallado = false;
this.activo = false;
this.transicionIniciada = false;
}
iniciar() {
this.activo = true;
this.tiempoRestante = this.tiempoTotal;
this.rosasEncontradas = 0;
this.completado = false;
this.fallado = false;
this.transicionIniciada = false;
this.generarRosas();
}
reiniciar() {
this.activo = false;
this.tiempoRestante = this.tiempoTotal;
this.rosasEncontradas = 0;
this.completado = false;
this.fallado = false;
this.transicionIniciada = false;
this.rosas = [];
}
generarRosas() {
this.rosas = [];
const cantidad = this.numero;
const margen = 60;
let tamRosa;
if (this.numero === 5) {
tamRosa = 45;
} else if (this.numero === 4) {
tamRosa = 45;
} else if (this.numero === 3) {
tamRosa = 45;
} else {
tamRosa = 46 - (this.dificultad - 1) * 6;
}
for (let i = 0; i < cantidad; i++) {
let x, y, intentos = 0;
let posicionValida = false;
while (!posicionValida && intentos < 100) {
x = random(margen, 640 - margen - tamRosa);
y = random(margen + 60, 480 - margen - tamRosa);
posicionValida = true;
for (let j = 0; j < this.rosas.length; j++) {
const distancia = dist(x, y, this.rosas[j].x, this.rosas[j].y);
if (distancia < tamRosa * 3) {
posicionValida = false;
break;
}
}
intentos++;
}
this.rosas.push(new Rosa(x, y, this.imagenRosa, tamRosa, this.dificultad, false));
}
if (this.dificultad >= 3) {
const cantidadTrampas = this.dificultad - 1;
for (let i = 0; i < cantidadTrampas; i++) {
let x, y, intentos = 0;
let posicionValida = false;
while (!posicionValida && intentos < 100) {
x = random(margen, 640 - margen - tamRosa);
y = random(margen + 60, 480 - margen - tamRosa);
posicionValida = true;
for (let j = 0; j < this.rosas.length; j++) {
const distancia = dist(x, y, this.rosas[j].x, this.rosas[j].y);
if (distancia < tamRosa * 3.5) {
posicionValida = false;
break;
}
}
intentos++;
}
this.rosas.push(new Rosa(x, y, this.imagenRosa, tamRosa, this.dificultad, true));
}
}
}
actualizar() {
if (!this.activo || this.completado || this.fallado) return;
this.tiempoRestante -= 3/60;
if (this.tiempoRestante <= 0) {
this.fallado = true;
this.activo = false;
}
if (this.rosasEncontradas === this.numero) {
this.completado = true;
this.activo = false;
}
for (let i = 0; i < this.rosas.length; i++) {
this.rosas[i].actualizar();
}
}
verificarClick(x, y) {
if (!this.activo) return;
for (let i = 0; i < this.rosas.length; i++) {
if (!this.rosas[i].encontrada && this.rosas[i].clickEn(x, y)) {
if (this.rosas[i].esTrampa) {
this.tiempoRestante -= 3;
this.rosas[i].encontrada = true;
} else {
this.rosas[i].encontrada = true;
this.rosasEncontradas++;
}
}
}
}
dibujar() {
if (this.imagenFondo) {
image(this.imagenFondo, 0, 0, 640, 480);
}
for (let i = 0; i < this.rosas.length; i++) {
if (!this.rosas[i].encontrada) {
this.rosas[i].dibujar();
}
}
this.dibujarInterfaz();
}
dibujarInterfaz() {
fill(0, 0, 0, 150);
rect(0, 0, 640, 50);
fill(252, 253, 227);
textSize(20);
textAlign(LEFT);
text('Nivel ' + this.numero, 20, 30);
textAlign(CENTER);
text('Rosas: ' + this.rosasEncontradas + '/' + this.numero, 320, 30);
textAlign(RIGHT);
text('Tiempo: ' + int(this.tiempoRestante) + 's', 620, 30);
}
}
