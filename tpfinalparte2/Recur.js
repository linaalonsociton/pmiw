//fuentes e imágenes:
class Recur {
  constructor() {
    this.fuentes = {};
    this.imagenes = {};
  }
  cargarRecursos() {
    this.fuentes.reglas = loadFont("data/Akeila.ttf");
    this.fuentes.jugar = loadFont("data/boton.ttf");
    this.fuentes.titulo = loadFont("data/prueba.ttf");
    this.fuentes.completados = loadFont("data/completados.otf");
    this.fuentes.creditos = loadFont("data/creditos.ttf");
    this.imagenes.nivel1 = loadImage("data/nivel1.png");
    this.imagenes.nivel2 = loadImage("data/nivel2.png");
    this.imagenes.nivel3 = loadImage("data/nivel3.png");
    this.imagenes.nivel4 = loadImage("data/nivel4.png");
    this.imagenes.nivel5 = loadImage("data/nivel5.png");
    this.imagenes.rosa = loadImage("data/rosa.png");
    this.imagenes.boton = loadImage("data/imgboton.png");
    this.imagenes.fondo = loadImage("data/fondo.png");
    this.imagenes.ganaste = loadImage("data/ganaste.png");
    this.imagenes.perdiste = loadImage("data/perdiste.png");
  }
}

//solo música:
class Audio {
  constructor() {
    this.musica = {};
    this.musicaIniciada = false;
  }
  cargarAudios() {
    this.musica.inicio = loadSound("data/musiquita.mp3");
    this.musica.ganaste = loadSound("data/musicaganaste.mp3");
    this.musica.perdiste = loadSound("data/musicaperdiste.mp3");
  }
  iniciarMusica() {
    if (this.musicaIniciada == false) {
      this.musica.inicio.loop();
      this.musicaIniciada = true;
    }
  }

  detenerMusicaInicio() {
    this.musica.inicio.stop();
  }

  reproducirGanaste() {
    this.musica.ganaste.play();
  }
  reproducirPerdiste() {
    this.musica.perdiste.play();
  }
}
