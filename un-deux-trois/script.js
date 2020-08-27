let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let size = 480;
let dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);

context.lineWidth = 4;
context.lineCap = "round";

let step = 20;
let heightThird = size / 3;

for(let y = 0; y < size - step; y += step) {
  for(let x = 0; x < size - step; x += step) {
    draw(x, y, step, step, [0.5]);
  }
}

function draw(x, y, width, height, positions) {
  context.save();
  context.translate(x, y);

  for(let i = 0; i <= positions.length; i++) {
    context.beginPath();
    context.moveTo(positions[i] * width, 0);
    context.lineTo(positions[i] * width, height);
    context.stroke();
  }

  context.restore();
}