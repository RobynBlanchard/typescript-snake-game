var counter = {
  x: 0,
  y: 0
};

var score = 0;

var lastDirection = 39;

var snake = [];
var snakeLength = 4;

var curFoodPosition;

var snakeWidth = 10;

var interval;

function getFoodCoords() {
  function getRandomCoord(axis) {
    var randomNum = Math.round(Math.floor(Math.random() * (300 - 1)) / 10) * 10;
    for (var i = 0; i < snake.length; i++) {
      // hit snake
      if (randomNum === snake[i][axis] * snakeWidth) {
        return getRandomCoord(axis);
      }
    }
    return randomNum;
  }

  return {
    x: getRandomCoord('x'),
    y: getRandomCoord('y')
  };
}

function drawBlob(x, y, color = 'rgb(200, 0, 0)') {
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(x, y, snakeWidth, snakeWidth);
  }
}

function removeSnakeTail() {
  if (snake.length >= snakeLength) {
    var whiteSquare = snake.pop();
    drawBlob(
      snakeWidth * whiteSquare.x,
      snakeWidth * whiteSquare.y,
      'rgb(255, 255, 255)'
    );
  }
}

function increaseScore() {
  score++;
  document.getElementById('score').innerHTML = score;
}

// move snake
function moveSnake() {
  drawBlob(snakeWidth * counter.x, snakeWidth * counter.y);
  snake.unshift(Object.assign({}, counter));
  removeSnakeTail();
}

function collisionDetection(x, y) {
  return x < 0 || y < 0 || x > 29 || y > 29;
}

function foodCollision(x, y) {
  return x === curFoodPosition.x && y === curFoodPosition.y;
}

function updateGameLoop() {
  var newPosition = Object.assign({}, counter);

  switch (lastDirection) {
    case 37:
      newPosition.x--;
      break;
    case 39:
      newPosition.x++;
      break;
    case 38:
      newPosition.y--;
      break;
    case 40:
      newPosition.y++;
      break;
    default:
      console.log('not an arrow key');
  }

  if (collisionDetection(newPosition.x, newPosition.y)) {
    return;
  }

  if (foodCollision(newPosition.x * 10, newPosition.y * 10)) {
    // add to snake tail
    snakeLength++;
    increaseScore();

    // set new food position
    curFoodPosition = getFoodCoords();
    drawBlob(curFoodPosition.x, curFoodPosition.y, 'rgb(0,0,255)');
  }

  counter = newPosition;

  moveSnake();
}

function setDirection(e) {
  if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
    if (e.keyCode === 37 && lastDirection === 39) {
      return;
    }
    if (e.keyCode === 39 && lastDirection === 37) {
      return;
    }
    if (e.keyCode === 38 && lastDirection === 40) {
      return;
    }
    if (e.keyCode === 40 && lastDirection === 38) {
      return;
    }

    lastDirection = e.keyCode;
  }
}

document.addEventListener('keydown', setDirection);

function init() {

document.getElementById('playback').addEventListener('click', function() {
  clearInterval(interval);
});
  var foodPosition = getFoodCoords();
  drawBlob(foodPosition.x, foodPosition.y, 'rgb(0,0,255)');
  curFoodPosition = Object.assign({}, foodPosition);
  interval = setInterval(updateGameLoop, 50);
}

window.addEventListener('load', event => {
  moveSnake();
  init();
});


// class Snake {
//   constructor() {
//     this.snakeLength = 4;
//     this.snake = [];
//     this.snakeWidth = 10;
//   }

//   move() {

//   }


//   init() {

//   }
// }
