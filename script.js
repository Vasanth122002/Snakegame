const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 10;
const canvasSize = 400;
let snake = [{ x: 160, y: 160 }];
let dx = gridSize;
let dy = 0;
let food = { x: 0, y: 0 };
let score = 0;
placeFood();
function gameLoop() {
  if (gameOver()) {
    alert(`Game Over! your score : ${score}`);
    document.location.reload();
    return;
  }

  setTimeout(() => {
    clearCanvas();
    drawSnake();
    moveSnake();
    drawFood();
    gameLoop();
  }, 100);
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasSize, canvasSize);
}

function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, gridSize, gridSize);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y == food.y) {
    score += 10;
    placeFood();
  } else {
    snake.pop();
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}
function placeFood() {
  food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function gameOver() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x >= canvasSize;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y >= canvasSize;
  return hitBottomWall || hitLeftWall || hitRightWall || hitTopWall;
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -gridSize;
      }
      break;

    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = gridSize;
      }
      break;

    case "ArrowLeft":
      if (dx === 0) {
        dx = -gridSize;
        dy = 0;
      }
      break;

    case "ArrowRight":
      if (dx === 0) {
        dx = gridSize;
        dy = 0;
      }
      break;
  }
});

gameLoop();
