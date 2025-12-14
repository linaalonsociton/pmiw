class Rosa {
  constructor(x, y, imagen, tam, Rofalsa) {
    this.x = x;
    this.y = y;
    this.imagen = imagen;
    this.tam = tam;
    this.Rofalsa = Rofalsa;
    this.encontrada = false;
    this.opacidad = 255;
  }
  clickEn(mx, my) {
    let distancia = dist(mx, my, this.x, this.y);
    if (distancia < this.tam / 2) {
      return true;
    } else {
      return false;
    }
  }
  dibujar() {
    if (this.encontrada == true) {
      return;
    }
    push();
    translate(this.x, this.y);
    if (this.Rofalsa == true) {
      tint(230, 120, 200, this.opacidad);
    } else {
      tint(255, this.opacidad);
    }
    if (this.imagen) {
      image(this.imagen, -this.tam / 2, -this.tam / 2, this.tam, this.tam);
    } else {
      if (this.Rofalsa == true) {
        fill(230, 120, 200, this.opacidad);
      } else {
        fill(255, 0, 110, this.opacidad);
      }
      circle(0, 0, this.tam);
    }
    pop();
  }
}
