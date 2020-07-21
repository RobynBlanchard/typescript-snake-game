import { Canvas } from './Canvas';
import { Snake } from './Snake';

const init = () => {
  const canvasWidth = 300;
  const canvasHeight = 300;
  const canvasSelector = '#canvas';
  const snakeWidth = 10;
  const cellWidth = 10;

  const canvas = new Canvas(canvasWidth, canvasHeight, canvasSelector, cellWidth);
  const snake = new Snake(snakeWidth, canvas);

  document.addEventListener('keydown', function(e) {
    snake.setDirection(e);
  });
  snake.init();


  // setInterval(function() {
  //   snake.move()
  // }, 1000);
  // snake.move();
};

window.addEventListener('load', (event) => {
  init();
});
