const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
let osa_x = 0;
let osa_y = 0;
ctx.fillRect(osa_x, 0, 80, 40);
let height = canvas.height;
let width = canvas.width;
let d = setInterval(run_right, 100);
let pohyb_vlevo_vpravo = 0;
let pohyb_nahoru_dolu = 0;

//listening to pressed keywords

document.addEventListener("keydown", checkKey);
function checkKey() {
  e = window.event;
  ctx.fillStyle = "blue";
  if (e.keyCode == "38" && pohyb_nahoru_dolu == 0) {
    ctx.clearRect(osa_x, osa_y, 80, 40);
    console.log("up");
    clearInterval(d);
    d = setInterval(run_up, 100);
    pohyb_nahoru_dolu = 1;
    pohyb_vlevo_vpravo = 0;
  } else if (e.keyCode == "40" && pohyb_nahoru_dolu == 0) {
    ctx.clearRect(osa_x, osa_y, 80, 40);
    console.log("down");
    clearInterval(d);
    d = setInterval(run_down, 100);
    pohyb_nahoru_dolu = 1;
    pohyb_vlevo_vpravo = 0;
  } else if (e.keyCode == "37" && pohyb_vlevo_vpravo == 0) {
    ctx.clearRect(osa_x, osa_y, 40, 80);
    console.log("left");
    clearInterval(d);
    d = setInterval(run_left, 100);
    pohyb_nahoru_dolu = 0;
    pohyb_vlevo_vpravo = 1;
  } else if (e.keyCode == "39" && pohyb_vlevo_vpravo == 0) {
    ctx.clearRect(osa_x, osa_y, 40, 80);
    console.log("right");
    clearInterval(d);
    d = setInterval(run_right, 100);
    pohyb_nahoru_dolu = 0;
    pohyb_vlevo_vpravo = 1;
  }
}

// declaration of function to move snake

function run_right() {
  ctx.clearRect(osa_x, osa_y, 80, 40);
  osa_x += 20;
  if (osa_x != width - 60) {
    ctx.fillRect(osa_x, osa_y, 80, 40);
  } else {
    osa_x = 0;
    ctx.fillRect(osa_x, osa_y, 80, 40);
  }
}

function run_left() {
  ctx.clearRect(osa_x, osa_y, 80, 40);
  osa_x -= 20;
  if (osa_x != -40) {
    ctx.fillRect(osa_x, osa_y, 80, 40);
  } else {
    osa_x = 340;
    ctx.fillRect(osa_x, osa_y, 80, 40);
  }
}

function run_down() {
  ctx.clearRect(osa_x, osa_y, 40, 80);
  osa_y += 20;
  if (osa_y != height - 60) {
    ctx.fillRect(osa_x, osa_y, 40, 80);
  } else {
    osa_y = 0;
    ctx.fillRect(osa_x, osa_y, 40, 80);
  }
}

function run_up() {
  ctx.clearRect(osa_x, osa_y, 40, 80);
  osa_y -= 20;
  if (osa_y != -20) {
    ctx.fillRect(osa_x, osa_y, 40, 80);
  } else {
    osa_y = 400;
    ctx.fillRect(osa_x, osa_y, 40, 80);
  }
}

// array to spawn food for snake in right position
let food_y;
let food_x;
let numbers = [];
let temp = 0;
for (let i = 0; i < 10; i++) {
  numbers[i] = temp;
  temp += 40;
}

function food() {
  ctx.fillStyle = "red";
  food_x = numbers[Math.floor(Math.random() * (10 - 0) + 0)];
  food_y = numbers[Math.floor(Math.random() * (10 - 0) + 0)];
  ctx.fillRect(food_x, food_y, 40, 40);
  ctx.fillStyle = "blue";
}

setInterval(food, 500);
