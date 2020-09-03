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

for (let y = step; y < size - step; y += step) {
  for (let x = step; x < size - step; x += step) {
    if (y < heightThird) {
      draw(x, y, step, step, [0.5]);
    } else if (y < heightThird * 2) {
      draw(x, y, step, step, [0.2, 0.8]);
    } else {
      draw(x, y, step, step, [0.1, 0.5, 0.9]);
    }
  }
}

function draw(x, y, width, height, positions) {
  context.save();
  context.translate(x + width / 2, y + height / 2);
  context.rotate(Math.random() * 5);
  context.translate(-width / 2, -height / 2);
  for (let i = 0; i <= positions.length; i++) {
    context.beginPath();
    context.moveTo(positions[i] * width, 0);
    context.lineTo(positions[i] * width, height);
    if (positions.length == 1) {
      h = 240;
    } else if (positions.length == 2) {
      h = 0;
    } else {
      h = 120;
    }

    s = Math.floor(Math.random() * 100 + 10);
    l = Math.floor(Math.random() * 100 + 10);
    context.strokeStyle = "hsl(" + h + ", " + s + "%, " + l + "%)";
    context.stroke();
  }

  context.restore();
}
