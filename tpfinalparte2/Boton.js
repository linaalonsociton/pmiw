class Boton {
  constructor(x, y, ancho, alto, texto, imagen) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
    this.imagen = imagen;
  }
  verificarClick(mx, my) {
    if (mx > this.x && mx < this.x + this.ancho && my > this.y && my < this.y + this.alto) {
      return true;
    } else {
      return false;
    }
  }
  dibujar(fuentes) {
    if (this.imagen) {
      image(this.imagen, 170, 280, 300, 200);
    }
    textAlign(CENTER, CENTER);
    textFont(fuentes.jugar);
    textSize(28);
    fill(144, 98, 46);
    text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
  }
}
