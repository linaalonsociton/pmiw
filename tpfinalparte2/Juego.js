class Juego {
  constructor(recursos, audio) {
    this.recursos = recursos;
    this.audio = audio;
    this.estado = "inicio";
    this.nivelActual = 0;
    this.niveles = [];
    this.nivelesCompletados = 0;
    this.botonInicio = null;
    this.botonReiniciar = null;
    this.inicializarNiveles();
  }

  inicializarNiveles() {
    let img = this.recursos.imagenes;
    this.niveles = [
      new Nivel(1, img.nivel1, img.rosa, 10, 1),
      new Nivel(2, img.nivel2, img.rosa, 8, 2),
      new Nivel(3, img.nivel3, img.rosa, 7, 3),
      new Nivel(4, img.nivel4, img.rosa, 6, 4),
      new Nivel(5, img.nivel5, img.rosa, 5, 5)
    ];
    this.botonInicio = new Boton(240, 350, 160, 50, "JUGAR", img.boton);
    this.botonReiniciar = new Boton(238, 350, 160, 50, "REINICIAR", img.boton);
  }

  empezarJuego() {
    this.estado = "jugando";
    this.nivelActual = 0;
    this.nivelesCompletados = 0;
    this.niveles[this.nivelActual].iniciar();
  }

  siguienteNivel() {
    this.nivelesCompletados = this.nivelesCompletados + 1;
    this.nivelActual = this.nivelActual + 1;
    if (this.nivelActual < this.niveles.length) {
      this.niveles[this.nivelActual].iniciar();
    } else {
      this.terminarJuego();
    }
  }

  fallarNivel() {
    this.nivelActual = this.nivelActual + 1;
    if (this.nivelActual < this.niveles.length) {
      this.niveles[this.nivelActual].iniciar();
    } else {
      this.terminarJuego();
    }
  }

  terminarJuego() {
    this.estado = "final";
    this.audio.detenerMusicaInicio();
    if (this.nivelesCompletados >= 3) {
      this.audio.reproducirGanaste();
    } else {
      this.audio.reproducirPerdiste();
    }
  }

  reiniciar() {
    this.estado = "inicio";
    this.nivelActual = 0;
    this.nivelesCompletados = 0;
    for (let i = 0; i < this.niveles.length; i++) {
      this.niveles[i].reiniciar();
    }
    this.audio.iniciarMusica();
  }

  actualizar() {
    if (this.estado == "jugando") {
      let nivel = this.niveles[this.nivelActual];
      nivel.actualizar();
      if (nivel.completado == true) {
        this.siguienteNivel();
      }
      if (nivel.fallado == true) {
        this.fallarNivel();
      }
    }
  }

  manejarClick(x, y) {
    if (this.estado == "inicio") {
      if (this.botonInicio.verificarClick(x, y) == true) {
        this.empezarJuego();
      }
    }
    if (this.estado == "jugando") {
      this.niveles[this.nivelActual].verificarClick(x, y);
    }
    if (this.estado == "final") {
      if (this.botonReiniciar.verificarClick(x, y) == true) {
        this.reiniciar();
      }
    }
  }

  dibujar() {
    let img = this.recursos.imagenes;
    if (img.fondo) {
      image(img.fondo, 0, 0, 640, 480);
    } else {
      background(26, 26, 46);
    }

    if (this.estado == "inicio") {
      this.dibujarInicio();
    }
    if (this.estado == "jugando") {
      this.niveles[this.nivelActual].dibujar();
    }
    if (this.estado == "final") {
      this.dibujarFinal();
    }
  }

  dibujarInicio() {
    let fuentes = this.recursos.fuentes;

    fill(15, 52, 96, 220);
    noStroke();
    rect(50, 50, 540, 380, 0, 70, 0, 70);

    fill(252, 253, 227);
    textAlign(CENTER, CENTER);
    textFont(fuentes.titulo);
    textSize(60);
    text("Hechizado", 320, 90);

    fill(252, 253, 227);
    textFont(fuentes.creditos);
    textSize(30);
    text("Lina Alonso Citón pmiw 2025", 320, 450);

    fill(255, 249, 229);
    textFont(fuentes.reglas);
    textSize(24);
    text("INSTRUCCIONES:", 320, 140);

    textSize(19);
    text("~ Bienvenid@ al jardín encantado ~", 320, 170);

    textSize(17);
    text("Estás atrapad@ y debes lograr encontrar todas las rosas para escapar", 320, 200);
    text("del hechizo antes de que se acabe el tiempo y olvides tu misión.", 320, 217);
    text("Hay cinco senderos que tendrás que atravesar para", 320, 234);
    text("conseguir huir. La cantidad de rosas depende del nivel,", 320, 251);
    text("pero ¡ojo! hay rosas rojas que son parte de una trampa", 320, 268);
    text("del jardín, y si las seleccionas, te restarán segundos.", 320, 285);
    text("¡Mucha suerte! Espero verte en la salida...", 320, 319);

    this.botonInicio.dibujar(fuentes);
  }

  dibujarFinal() {
    let fuentes = this.recursos.fuentes;
    let img = this.recursos.imagenes;
    let gano = false;
    if (this.nivelesCompletados >= 3) {
      gano = true;
    }

    fill(15, 52, 96);
    rect(50, 50, 540, 380);

    if (gano == true) {
      if (img.ganaste) {
        image(img.ganaste, 0, 0, 840, 480);
      }
    }
    if (gano == false) {
      if (img.perdiste) {
        image(img.perdiste, 0, 0, 840, 480);
      }
    }

    if (gano == true) {
      fill(202, 107, 92, 180);
    } else {
      fill(64, 116, 139, 180);
    }
    noStroke();
    rect(50, 50, 540, 380, 0, 70, 0, 70);

    textAlign(CENTER, CENTER);
    textFont(fuentes.titulo);
    textSize(60);
    fill(252, 253, 227);
    if (gano == true) {
      text("GANASTE", 320, 80);
    } else {
      text("PERDISTE", 320, 80);
    }

    fill(252, 241, 227);
    textFont(fuentes.reglas);
    textSize(30);
    if (gano == true) {
      text("¡Felicidades!", 320, 140);
      text("Lograste huir del jardín encantado", 320, 170);
      text("y retomar tu aventura", 320, 200);
      text("para volver a casa con tu mejor amigo", 320, 230);
    } else {
      text("¡Fuiste Hechizad@!", 320, 140);
      text("No lograste huir del jardín encantado", 320, 170);
      text("y olvidaste tu misión", 320, 200);
      text("Mucha suerte la próxima!", 320, 230);
    }

    fill(252, 241, 227);
    textFont(fuentes.completados);
    textSize(30);
    text(this.nivelesCompletados + '/5', 320, 290);
    textSize(28);
    text("Niveles Completados", 320, 320);

    this.botonReiniciar.dibujar(fuentes);
  }
}
