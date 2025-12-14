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
  }
  iniciar() {
    this.activo = true;
    this.tiempoRestante = this.tiempoTotal;
    this.rosasEncontradas = 0;
    this.completado = false;
    this.fallado = false;
    this.generarRosas();
  }
  reiniciar() {
    this.activo = false;
    this.tiempoRestante = this.tiempoTotal;
    this.rosasEncontradas = 0;
    this.completado = false;
    this.fallado = false;
    this.rosas = [];
  }
  generarRosas() {
    this.rosas = [];
    let margen = 60;
    let tamRosa = 45;
    for (let i = 0; i < this.numero; i++) {
      let x = random(margen, 640 - margen - tamRosa);
      let y = random(margen + 60, 480 - margen - tamRosa);
      this.rosas.push(new Rosa(x, y, this.imagenRosa, tamRosa, false));
    }
    if (this.dificultad >= 3) {
      let cantidadTrampas = this.dificultad - 1;
      for (let i = 0; i < cantidadTrampas; i++) {
        let x = random(margen, 640 - margen - tamRosa);
        let y = random(margen + 60, 480 - margen - tamRosa);
        this.rosas.push(new Rosa(x, y, this.imagenRosa, tamRosa, true));
      }
    }
  }
  actualizar() {
    if (this.activo == false) {
      return;
    }
    if (this.completado == true) {
      return;
    }
    if (this.fallado == true) {
      return;
    }
    this.tiempoRestante = this.tiempoRestante - 0.05;

    if (this.tiempoRestante <= 0) {
      this.fallado = true;
      this.activo = false;
    }
    if (this.rosasEncontradas == this.numero) {
      this.completado = true;
      this.activo = false;
    }
  }
  verificarClick(x, y) {
    if (this.activo == false) {
      return;
    }
    for (let i = 0; i < this.rosas.length; i++) {
      let rosa = this.rosas[i];
      if (rosa.encontrada == true) {
        continue;
      }
      if (rosa.clickEn(x, y) == true) {
        rosa.encontrada = true;
        if (rosa.Rofalsa == true) {
          this.tiempoRestante = this.tiempoRestante - 3;
        } else {
          this.rosasEncontradas = this.rosasEncontradas + 1;
        }
      }
    }
  }
  dibujar() {
    if (this.imagenFondo) {
      image(this.imagenFondo, 0, 0, 640, 480);
    }
    for (let i = 0; i < this.rosas.length; i++) {
      if (this.rosas[i].encontrada == false) {
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
    text("Nivel " + this.numero, 20, 30);
    textAlign(CENTER);
    text("Rosas: " + this.rosasEncontradas + "/" + this.numero, 320, 30);
    textAlign(RIGHT);
    text("Tiempo: " + int(this.tiempoRestante) + "s", 620, 30);
  }
}
