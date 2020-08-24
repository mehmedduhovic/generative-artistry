let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let size = 500;
let dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;
context.lineJoin = "bevel";

let line,
  dot,
  odd = false,
  lines = [],
  gap = size / 10;

for (let y = gap / 2 + 50; y <= size - 50; y += gap) {
  odd = !odd;
  line = [];
  for (let x = gap / 4 + 50; x <= size - 50; x += gap) {
    line.push({
      x: x + (Math.random() * 0.8 - 0.2) * gap + (odd ? gap / 2 : 0),
      y: y + (Math.random() * 0.8 - 0.2) * gap,
    });
    context.fill();
  }

  lines.push(line);
}

function drawTriangle(pointA, pointB, pointC) {
  context.beginPath();
  context.moveTo(pointA.x, pointA.y);
  context.lineTo(pointB.x, pointB.y);
  context.lineTo(pointC.x, pointC.y);
  context.lineTo(pointA.x, pointA.y);
  context.closePath();
  h = 240;
  s = Math.floor(Math.random() * 100);
  l = Math.floor(Math.random() * 100);
  context.fillStyle = "hsl(" + h + ", " + s + "%, " + l + "%)";
  context.fill();
  context.stroke();
}

let dotline;
odd = true;

for (let y = 0; y < lines.length - 1; y++) {
  odd = !odd;
  dotline = [];
  for (let i = 0; i < lines[y].length; i++) {
    dotline.push(odd ? lines[y][i] : lines[y + 1][i]);
    dotline.push(odd ? lines[y + 1][i] : lines[y][i]);
  }

  for (let i = 0; i < dotline.length - 2; i++) {
    drawTriangle(dotline[i], dotline[i + 1], dotline[i + 2]);
  }
}
