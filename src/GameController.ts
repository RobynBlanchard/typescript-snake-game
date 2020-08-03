import { Canvas } from './Canvas';
import { Snake } from './Snake';
import { Food } from './Food';
import { Score } from './Score';
import { CoOrdinate } from './CoOrdinate';

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
  }

  init() {
    this.snake.init();
    this.food.generate();
  }

  updateGameLoop() {
    document.addEventListener('keydown', (e) => {
      this.snake.setDirection(e);
    });

    // todo decrease time as game goes on
    this.gameLoop = setInterval(() => {
      const nextPos = this.snake.getNextPosition();

      if (this.foodCollision(nextPos)) {
        this.snake.extend();
        this.food.generate();
        this.score.increment();
      } else if (this.snake.willCollide(nextPos)) {
        this.endGame();
      } else {
        this.snake.move();
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

  private foodCollision(nextPos: CoOrdinate) {
    // or this.snake.nextPosition ?
    return (
      nextPos.x === this.food.position.x && nextPos.y === this.food.position.y
    );
  }
}
