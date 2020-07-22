import { Canvas } from './Canvas';
import { Snake } from './Snake';
import { Food } from './Food';

const init = () => {
  const canvasWidth = 300;
  const canvasHeight = 300;
  const canvasSelector = '#canvas';
  const snakeWidth = 10;
  const cellWidth = 10;

  const canvas = new Canvas(
    canvasWidth,
    canvasHeight,
    canvasSelector,
    cellWidth
  );
  const snake = new Snake(snakeWidth, canvas);

  document.addEventListener('keydown', function (e) {
    snake.setDirection(e);
  });
  snake.init();
  const food = new Food(canvas, snake);
  food.generate();

  // setInterval(function() {
  //   snake.move()
  // }, 50);
  // snake.move();
};

window.addEventListener('load', (event) => {
  init();
});
