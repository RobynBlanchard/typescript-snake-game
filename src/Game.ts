import { Canvas } from './Canvas';
import { Snake } from './Snake';
import { Food } from './Food';

export class Game {
  gridWidth: number;
  cellWidth: number;
  gridSelector: string;
  canvas: Canvas;
  snake: Snake;
  food: Food;
  constructor() {
    this.gridWidth = 300;
    this.gridSelector = '#canvas';
    this.cellWidth = 10;
    this.canvas = new Canvas(
      this.gridWidth,
      this.gridWidth,
      this.gridSelector,
      this.cellWidth
    );
    this.snake = new Snake(this.cellWidth, this.canvas);
    this.food = new Food(this.canvas, this.snake);
  }

  init() {
    this.snake.init();
    this.food.generate();
  }

  updateGameLoop() {
    document.addEventListener('keydown', (e) => {
      this.snake.setDirection(e);
    });
    setInterval(() => {
      const nextPos = this.snake.getNextPosition()
      const foodCollision = nextPos.x === this.food.position.x && nextPos.y === this.food.position.y;
      if (foodCollision) {
        this.snake.extend();
        this.food.generate();
      } else {
        this.snake.move();
      }
    }, 200);
  }
}
