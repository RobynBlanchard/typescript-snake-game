import { Canvas } from './Canvas';
import { Snake } from './Snake';
import { Food } from './Food';
import { CoOrdinate } from './CoOrdinate';

export class Game {
  gridWidth: number;
  cellWidth: number;
  gridSelector: string;
  canvas: Canvas;
  snake: Snake;
  food: Food;
  constructor() {
    this.gridWidth = 30;
    this.gridSelector = '#canvas';
    this.cellWidth = 10;
    this.canvas = new Canvas(
      this.gridWidth * this.cellWidth,
      this.gridWidth * this.cellWidth,
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

    // todo - collision detection for snake and grid

    setInterval(() => {
      const nextPos = this.snake.getNextPosition();

      if (this.foodCollision(nextPos)) {
        this.snake.extend();
        this.food.generate();
      } else if (this.gridCollision(nextPos)) {
        console.log('collision, do nothing');
      } else if (this.snake.willCollide(nextPos)) {
        throw new Error('game over');
        // TODO clear interval
      } else {
        this.snake.move();
      }
    }, 200);
  }

  private foodCollision(nextPos: CoOrdinate) {
    // or this.snake.nextPosition ?
    return (
      nextPos.x === this.food.position.x && nextPos.y === this.food.position.y
    );
  }

  private gridCollision(nextPos: CoOrdinate) {
    return (
      nextPos.x < 0 ||
      nextPos.y < 0 ||
      nextPos.x >= this.gridWidth ||
      nextPos.y >= this.gridWidth
    );
  }
}
