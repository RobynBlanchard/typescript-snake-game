import { Canvas } from './Canvas';
import { SnakeController } from './SnakeController';
import { Snake } from './Snake';
import { Food } from './Food';
import { Score } from './Score';
import { CoOrdinate } from './CoOrdinate';
import { CollisionDetector } from './CollisionDetector';
// or interface Snake - method for move, collisin etc

export class Game {
  gridWidth: number;
  cellWidth: number;
  gridSelector: string;
  canvas: Canvas;
  snake: Snake;
  food: Food;
  score: Score;
  gameLoop: NodeJS.Timeout | undefined;
  snakeController: SnakeController;
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
    this.score = new Score();

    this.snakeController = new SnakeController(this.snake, this.canvas);
  }

  init() {
    this.snakeController.init();
    this.food.generate();
  }

  updateGameLoop() {
    document.addEventListener('keydown', (e) => {
      this.snake.setDirection(e);
    });

    // todo decrease time as game goes on
    this.gameLoop = setInterval(() => {
      this.snake.getNextPosition();

      if (
        CollisionDetector.foodCollision(
          this.snake.nextPosition,
          this.food.position
        )
      ) {
        this.snakeController.eat();
        this.food.generate();
        this.score.increment();
      } else if (
        CollisionDetector.snakeCollision(
          this.snake.snake,
          this.snake.nextPosition,
          this.canvas.width / this.canvas.cellWidth,
          this.canvas.height / this.canvas.cellWidth
        )
      ) {
        this.endGame();
      } else {
        this.snakeController.move();
      }
    }, 50);
  }

  pause() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }

  endGame() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    const gameOver = document.querySelector('.game-over') as HTMLElement;
    if (gameOver) {
      gameOver.style.display = 'block';
    }
  }
}
