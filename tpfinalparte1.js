//https://www.youtube.com/watch?v=F1QnyOXCnO0
//https://www.figma.com/design/hqy9Lbm7ysoZOrnFgcqNyU/userflow?node-id=0-1&t=3zkECtnrnDmQfsQI-1
let debug = true;
let pantalla;
let imgFondo = [];
let textoFinal = [];
let fuente;
let botones = []; 
let imgBoton; 
let fuenteBoton;
let musica;
let musicaIniciada = false;

function preload() {
  for (let i = 0; i < 21; i++) {
    imgFondo[i] = loadImage("data/pantalla00" + nf(i, 2) + ".png");
  }
  textoFinal = loadStrings("data/textoFinal.txt");
  fuente = loadFont("data/boton2.ttf");
  fuenteBoton = loadFont("data/Enchanted.otf"); 
  imgBoton = loadImage("data/imgboton.png");
  musica = loadSound("data/musica.mp3", musicaCargada, musicaError);
}

function musicaCargada() {
  console.log("Música cargada OK");
}

function musicaError() {
  console.log("ERROR al cargar música");
}

function setup() {
  createCanvas(640, 480);
  pantalla = 0;
  textFont(fuente);
  crearBotones(); 
}

function crearBotones() {
  botones[6] = [
    { texto: "Si. Y olvida su misión", x: 10, y: 300, ancho: 250, alto: 200, destino: 7 },
    { texto: "No; y logra escapar", x: 380, y: 300, ancho: 250, alto: 200, destino: 10 }
  ];
  botones[12] = [
    { texto: "Si", x: 10, y: 300, ancho: 250, alto: 200, destino: 13 },
    { texto: "No. confía en ella", x: 380, y: 300, ancho: 250, alto: 200, destino: 17 }
  ];
}

function draw() {
  background(0, 0, 255);
  
  if (pantalla >= 0 && pantalla < imgFondo.length) {
    image(imgFondo[pantalla], 0, 0, width, height);
  }
  
  if (pantalla === 0) {
    push();
    fill(57, 40, 8);
    textFont(fuente);
    textAlign(CENTER);
    textSize(20);
    text("Lina Alonso Citón pmiw 2025", width / 2, 30);
    text("Relato original por: Hans Christian Andersen", width / 2, 465);
    pop();
  }
  
  if (pantalla >= 1 && pantalla < textoFinal.length) {
    push();
    textSize(20);
    
    let altoRectangulo;
    
    if (pantalla === 1) {
      altoRectangulo = 60; 
    } else if (pantalla === 2) {
      altoRectangulo = 60;
    } else if (pantalla === 3) {
      altoRectangulo = 80;
    } else if (pantalla === 4) {
      altoRectangulo = 110;
    } else if (pantalla === 5) {
      altoRectangulo = 60;
    } else if (pantalla === 6) {
      altoRectangulo = 80;
    } else if (pantalla === 7) {
      altoRectangulo = 60;
    } else if (pantalla === 8) {
      altoRectangulo = 60;
    } else if (pantalla === 9) {
      altoRectangulo = 60;
    } else if (pantalla === 10) {
      altoRectangulo = 60;
    } else if (pantalla === 11) {
      altoRectangulo = 60;
    } else if (pantalla === 12) {
      altoRectangulo = 60;
    } else if (pantalla === 13) {
      altoRectangulo = 60;
    } else if (pantalla === 14) {
      altoRectangulo = 60;
    } else if (pantalla === 15) {
      altoRectangulo = 60;
    } else if (pantalla === 16) {
      altoRectangulo = 60;
    } else if (pantalla === 17) {
      altoRectangulo = 60;
    } else if (pantalla === 18) {
      altoRectangulo = 60;
    } else if (pantalla === 19) {
      altoRectangulo = 80;
    } else {
      altoRectangulo = 60;
    }
    
    if (pantalla === 3) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 10);
    } else if (pantalla === 4) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 6) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 13) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 14) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 15) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 16) {
      fill(162, 204, 240, 100);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 17) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 18) {
      fill(162, 204, 240, 100);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else if (pantalla === 19) {
      fill(162, 204, 240, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    } else {
      fill(240, 213, 162, 150);
      noStroke();
      rect(10, height - 470, width - 20, altoRectangulo, 5);
    }
    
    fill(57, 40, 8);
    textAlign(CENTER, TOP);
    textSize(20);
    text(textoFinal[pantalla], 10, height - 470, width - 40);
    pop();
  }
  
  dibujarBotones(pantalla);
}

function dibujarBotones(pantalla) {
  if (!botones[pantalla]) return;
  
  for (let i = 0; i < botones[pantalla].length; i++) {
    let btn = botones[pantalla][i];
    push();
    image(imgBoton, btn.x, btn.y, btn.ancho, btn.alto);
    textFont(fuenteBoton); 
    fill(57, 40, 8);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(25);
    text(btn.texto, btn.x + btn.ancho / 2, btn.y + btn.alto / 2);
    pop();
  }
}

function clicEnBoton(x, y, btn) {
  return x > btn.x && x < btn.x + btn.ancho && 
         y > btn.y && y < btn.y + btn.alto;
}

function mousePressed() {
  if (!musicaIniciada) {
    musica.loop();
    musicaIniciada = true;
    console.log("Música iniciada");
  }
  
  if (botones[pantalla]) {
    for (let i = 0; i < botones[pantalla].length; i++) {
      let btn = botones[pantalla][i];
      if (clicEnBoton(mouseX, mouseY, btn)) {
        pantalla = btn.destino; 
        return; 
      }
    }
  } else {
    if (pantalla === 8 || pantalla === 16) {
      pantalla = 0;
      return;
    }
    pantalla++;
    if (pantalla > 20) {
      pantalla = 0;
    }
  }
}
