const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let snake_barva = "rgb(204, 255, 153)";
let background = "white";
let food = "red";
ctx.fillStyle = "blue";
let m;
let osa_y = 0;
let unit = 25;
let osa_x = unit;
let height = canvas.height;
let width = canvas.width;
let snake = [
  { x: unit * 3, y: 0 },
  { x: unit * 2, y: 0 },
  { x: unit * 1, y: 0 },
  { x: 0, y: 0 },
  { x: -unit, y: 0 },
];
let left = 37;
let right = 39;
let up = 38;
let down = 40;
let food_x;
let food_y;
let reset_bool = false;
let score = 0;
let kolize = false;

//listening to pressed keywords

window.addEventListener("keydown", pressed_key);

// declaration of function to draw snake

function draw_snake() {
  ctx.fillStyle = snake_barva;
  snake.forEach((element) => {
    ctx.fillRect(element.x, element.y, unit, unit);
  });
  move();
}

// declaration of function to move snake
function move() {
  if (!reset_bool) {
    m = {
      x: snake[0].x + osa_x,
      y: snake[0].y + osa_y,
    };
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x == m.x && snake[i].y == m.y) {
        kolize = true;
        break;
      }
    }
    if (m.x == width || m.y == height || m.x == -25 || m.y == -25 || kolize) {
      reset_bool = true;
      kolize = false;
    }
    snake.unshift(m);
    ctx.fillStyle = background;
    if (snake[0].x == food_x && snake[0].y == food_y) {
      score += 1;
      document.getElementById("score").innerHTML = score;
    } else {
      ctx.fillRect(
        snake[snake.length - 1].x,
        snake[snake.length - 1].y,
        unit,
        unit
      );
      snake.pop();
    }
  } else {
    reset(width, height);
  }
}

function pressed_key(window) {
  let goingUP = osa_y == -unit;
  let goingDown = osa_y == unit;
  let goingleft = osa_x == -unit;
  let goingRight = osa_x == unit;
  if (window.keyCode == down && !goingUP) {
    osa_y = unit;
    osa_x = 0;
    console.log("jsem tady");
    return;
  }
  if (window.keyCode == left && !goingRight) {
    osa_y = 0;
    osa_x = -unit;
    console.log("jsem tady");
    return;
  }

  if (window.keyCode == right && !goingleft) {
    osa_y = 0;
    osa_x = unit;
    console.log("jsem tady");
    return;
  }
  if (window.keyCode == up && !goingDown) {
    osa_y = -unit;
    osa_x = 0;
    console.log("jsem tady");
    return;
  }
}

function generate_food() {
  function location(max, min) {
    let i = Math.round((Math.random() * (max - min) + min) / unit) * unit;
    return i;
  }
  food_x = location(width - unit, 0);
  food_y = location(height - unit, 0);
  ctx.fillStyle = food;
  ctx.fillRect(food_x, food_y, unit, unit);
}

function reset(width, height) {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  reset_bool = false;
  snake = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit * 1, y: 0 },
    { x: 0, y: 0 },
    { x: -unit, y: 0 },
  ];
  osa_x = unit;
  osa_y = 0;
  score = 0;
  document.getElementById("score").innerHTML = score;
}

setInterval(draw_snake, 75);
setInterval(generate_food, 5000);

