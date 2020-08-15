let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let mousePos;

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

let size = 400;
let dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;

canvas.addEventListener(
  "mousemove",
  function (evt) {
    mousePos = getMousePos(canvas, evt);
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(function(){
      drawLines(mousePos);
    });
  },
  false
);

let step = 10;
let lines = [];

function drawLines(mousePos = 0) {
  for (let i = step; i <= size - step; i += step) {
    let line = [];
    for (let j = step; j <= size - step; j += step) {
      let distanceToCenter = Math.abs(j - (size / 2));
      let variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
      let random = ((Math.random() * variance) / 2) * -1;
      let point = { x: j, y: i + random };
      line.push(point);
    }

    lines.push(line);
  }

  for (let i = 6; i < lines.length; i++) {
    context.beginPath();
    context.moveTo(lines[i][0].x, lines[i][0].y);
    for (let j = 0; j < lines[i].length - 2; j++) {
      let xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
      let yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
      context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }
    context.save();
    context.globalCompositeOperation = "destination-out";
    context.fill();
    context.restore();
    context.strokeStyle = "white";
    context.stroke();
  }
  lines = [];
}

drawLines();
