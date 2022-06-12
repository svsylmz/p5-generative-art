let noiseScale = 12;
var yoff = 0.0;

var min_radius = 10;
var max_radius = 250;

var angle_incr = 0.1;

var max_noise = 100;

function preload() {
    brokenStatue = loadImage("broken_statue.jpeg");
}

function createText() {
  _text = createGraphics(windowWidth, windowHeight);
  _text.textFont('Alfa Slab One');
  _text.textAlign(LEFT);
  _text.textSize(60);
  _text.fill("#264653");
  _text.noStroke();
  _text.text('mind.', width * 0.1, height * 0.54);
  texture(_text);
  plane(window.innerWidth - 4, window.innerHeight - 4);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  background("#f2e8d0")
  noLoop();
}

function draw() {
  drawCircle(400 * 10, "#3d5066")
  drawCircle(200 * 10, "#19869c")
  perlinNoise()
  drawWaves()
  imageProcess()
  createText()
}

function imageProcess() {
  for(let col = 0; col < brokenStatue.width; col+=10) {
    for(let row = 0; row < brokenStatue.height; row+=10) {
      let xPos = col;
      let yPos = row;
      let imageData = brokenStatue.get(xPos, yPos)
      stroke(color(imageData))
      strokeWeight(random(4))
      point(xPos - 100, yPos - 200)
    }
  }
}

function perlinNoise() {
  for (let radius = min_radius; radius < max_radius; radius += 5) {
    let alpha = map(radius, min_radius, max_radius, 255, 50);
    stroke("#014f86");
    fill('rgba(245, 235, 224, 1)');

    beginShape();
    for (let a = 0; a < TWO_PI; a += angle_incr) {
      let xoff = cos(a) + 1;
      let offset = map(noise(xoff, sin(a) + 1 + yoff), 0, 1, -max_noise, max_noise);
      
      let r = radius + (offset * map(radius, min_radius, max_radius, 0.1, 1));
      let x = r * cos(a);
      let y = r * sin(a);
      
      curveVertex(x, y);
    }
    endShape(CLOSE);
    
    yoff += 0.08;
  }
}

function drawCircle(dotCount, color) {
  stroke(color)
  for (let i = 0; i < dotCount; i++) {
    let theta = random(0, TWO_PI);
    let h = randomGaussian(6);
    let r = (exp(h) - 2) / (exp(h) + 5);
    let x = (width / 2 - 10)* r * cos(theta);
    let y = (height / 2 - 10) * r * sin(theta);
    ellipse(x,y,0.5,0.5); 
  }
}

function drawWaves() {
  angleMode(DEGREES)
  noFill()
  stroke("#354f52")
  for(var i = 0; i < 60; i++) {
    beginShape();
    for(var j=0; j < 360; j += 90) {
      var rad = i;
      var x = rad * cos(i * j) * randomGaussian(0.6);
      var y = rad * sin(j);
      
      vertex(x, y) 
    }
    endShape(CLOSE)
  }
}
