let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let size = 390;
let dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height * size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;

let squareSize = 30;
let randomDisplacement = 10;
let rotateMultiplier = 20;
let offset = 10;

function draw(width, height) {
  context.fillStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
  context.beginPath();
  context.rect(-width / 2, -height / 2, width, height);
  context.fillRect(-width / 2, -height / 2, width, height);
  context.stroke();
}

for (let i = squareSize; i <= size - squareSize; i += squareSize) {
  for (let j = squareSize; j <= size - squareSize; j += squareSize) {
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let rotateAmt =
      (((j / size) * Math.PI) / 180) *
      plusOrMinus *
      Math.random() *
      rotateMultiplier;
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let translateAmt =
      (j / size) * plusOrMinus * Math.random() * randomDisplacement;
    context.save();
    context.translate(i + translateAmt + offset, j + offset);
    context.rotate(rotateAmt);
    draw(squareSize, squareSize);
    context.restore();
  }
}
