let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let width = 400;
let height = 400;
let dpr = window.devicePixelRatio;
let step = 20;

canvas.width = width * dpr;
canvas.height = height * dpr;

context.scale(dpr, dpr);
context.lineCap = "square";
context.lineWidth = 2;

function draw(x, y, width, height) {
  let direction = Math.random() >= 0.5;
  if (direction) {
    context.moveTo(x, y);
    context.lineTo(x + width, y + height);
  } else {
    context.moveTo(x + width, y);
    context.lineTo(x, y + height);
  }
  var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, "#133e7c");
  grd.addColorStop(1, "#711c91");
  context.fillStyle = grd;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#0abdc6";
  context.stroke();
}

function callDrawing() {
  for (let x = 0; x <= width; x += step) {
    for (let y = 0; y <= height; y += step) {
      draw(x, y, step, step);
    }
  }
}

let time = 0;

function animate() {
  window.requestAnimationFrame(animate);
  if (time % 20 == 0) {
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    callDrawing();
  }

  time += 1;
}

animate();
