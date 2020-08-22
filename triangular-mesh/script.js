let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let size = 400;
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
  gap = size / 8;

for (let y = gap / 2; y <= size; y += gap) {
  odd = !odd;
  line = [];
  for (let x = gap / 4; x <= size; x += gap) {
    dot = { x: x + (odd ? gap / 2 : 0), y: y };
    line.push(dot);
    context.beginPath();
    context.arc(dot.x, dot.y, 1, 0, 2 * Math.PI, true);
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
    context.closePath;
    context.stroke();
}

let dotline;
odd = true;

for(let y = 0; y < lines.length - 1; y++) {
    odd = !odd;
    dotline = [];
    for(let i = 0; i < lines[y].length; i++) {
        dotline.push(odd ? lines[y][i] : lines[y + 1][i]);
        dotline.push(odd ? lines[y + 1][i] : lines[y][i]);
    }

}