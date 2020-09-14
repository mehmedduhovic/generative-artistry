let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let size = 400;
let dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;

let circles = [];
let minRadius = 2;
let maxRadius = 100;
let totalCircles = 400;
let createCircleAttempt = 400;

function createAndDrawCircle() {
  let newCircle;
  let circleSafeToDraw = false;

  for (let tries = 0; tries < createCircleAttempt; tries++) {
    newCircle = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
      radius: minRadius,
    };

    if (doesCircleHaveACollision(newCircle)) {
      continue;
    } else {
      circleSafeToDraw = true;
      break;
    }
  }

  if (!circleSafeToDraw) {
    return;
  }

  for (let radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
    newCircle.radius = radiusSize;
    if (doesCircleHaveACollision(newCircle)) {
      newCircle.radius--;
      break;
    }
  }

  circles.push(newCircle);
  context.beginPath();
  context.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2 * Math.PI);
  context.stroke();

  function doesCircleHaveACollision(circle) {
    for (let i = 0; i < circles.length; i++) {
      let otherCircle = circles[i];
      let combinedRadius = circle.radius + otherCircle.radius;
      let xCoord = circle.x - otherCircle.x;
      let yCoord = circle.y - otherCircle.y;

      if (combinedRadius >= Math.sqrt(xCoord * xCoord + yCoord * yCoord)) {
        return true;
      }
    }

    if (circle.x + circle.radius >= size || circle.x - circle.radius <= 0) {
      return true;
    }

    if (circle.y + circle.radius >= size || circle.y - circle.radius <= 0) {
      return true;
    }

    if (circle.x + circle.radius >= size || circle.x - circle.radius <= 0) {
      return true;
    }

    if (circle.y + circle.radius >= size || circle.y - circle.radius <= 0) {
      return true;
    }

    return false;
  }
}

for (let i = 0; i < totalCircles; i++) {
  createAndDrawCircle();
}
