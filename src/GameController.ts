import { Canvas } from './Canvas';
import { Snake } from './Snake';
import { Food } from './Food';
import { Score } from './Score';
import { CoOrdinate } from './CoOrdinate';
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

    // todo - collision detection for snake and grid

    // todo decrease time as game goes on
    this.gameLoop = setInterval(() => {
      const nextPos = this.snake.getNextPosition();

      if (this.foodCollision(nextPos)) {
        this.snake.extend();
        this.food.generate();
        this.score.increment();
      } else if (this.gridCollision(nextPos)) {
        console.log('collision, do nothing');
        // pause interval ???
      } else if (this.snake.willCollide(nextPos)) {
        if (this.gameLoop) {
          clearInterval(this.gameLoop)
        }
        this.endGame();
      } else {
        this.snake.move();
      }
    }, 50);
  }

  endGame() {
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

  private gridCollision(nextPos: CoOrdinate) {
    return (
      nextPos.x < 0 ||
      nextPos.y < 0 ||
      nextPos.x >= this.gridWidth ||
      nextPos.y >= this.gridWidth
    );
  }
}
