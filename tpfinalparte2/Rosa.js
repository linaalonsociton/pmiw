class Rosa {
constructor(x, y, imagen, tam, dificultad, esTrampa) {
if (esTrampa === undefined) {
esTrampa = false;
}
this.x = x;
this.y = y;
this.imagen = imagen;
this.tam = tam;
this.dificultad = dificultad;
this.esTrampa = esTrampa;
this.encontrada = false;
this.brillo = 0;
this.direccionBrillo = 0.05;
if (dificultad === 1 || dificultad === 2) {
this.opacidadBase = 0.5;
} else if (dificultad === 3) {
this.opacidadBase = 0.65;
} else {
this.opacidadBase = 1.0 - (dificultad - 1) * 0.02;
}
if (dificultad === 1) {
this.intensidadBrillo = 0.6;
this.brilloSombra = 30;
} else {
this.intensidadBrillo = 0.2;
this.brilloSombra = 15;
this.brillo = 0.5;
}
this.rotacion = 0;
}
actualizar() {
if (this.encontrada) return;
if (!this.esTrampa && this.dificultad === 1) {
this.brillo += this.direccionBrillo;
if (this.brillo > 1 || this.brillo < 0) {
this.direccionBrillo = this.direccionBrillo * -1;
}
}
}
clickEn(mx, my) {
const distancia = dist(mx, my, this.x, this.y);
return distancia < this.tam / 2;
}
dibujar() {
if (this.encontrada) return;
push();
translate(this.x, this.y);
if (this.esTrampa) {
rotate(this.rotacion);
}
let opacidadActual;
let sombraActual;
if (!this.esTrampa) {
opacidadActual = this.opacidadBase + (this.brillo * this.intensidadBrillo);
sombraActual = this.brilloSombra + (this.brillo * this.brilloSombra * 0.6);
drawingContext.shadowBlur = sombraActual;
drawingContext.shadowColor = "(255, 0, 110, " + (0.4 + this.brillo * 0.4) + ")";
} else {
opacidadActual = this.opacidadBase;
drawingContext.shadowBlur = 0;
drawingContext.shadowColor = "transparent";
}
if (this.esTrampa) {
tint(230, 120, 200, 255 * opacidadActual);
} else {
tint(255, 255 * opacidadActual);
}
if (this.imagen) {
image(this.imagen, -this.tam / 2, -this.tam / 2, this.tam, this.tam);
} else {
if (this.esTrampa) {
fill(230, 120, 200, 255 * opacidadActual);
} else {
fill(255, 0, 110, 255 * opacidadActual);
}
circle(0, 0, this.tam);
}
pop();
}
}
