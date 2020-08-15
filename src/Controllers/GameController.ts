import { SnakeController } from './SnakeController';
import { FoodController } from './FoodController';
import { ScoreController } from './ScoreController';

export class Game {
  gameLoop: NodeJS.Timeout | undefined;

  constructor(
    public scoreController: ScoreController,
    public foodController: FoodController,
    public snakeController: SnakeController
  ) {}

  init() {
    this.placeFood();
    this.snakeController.initSnake();
  }

  updateGameLoop() {
    document.addEventListener('keydown', (e) => {
      this.snakeController.setDirection(e);
    });

    // todo decrease time as game goes on
    this.gameLoop = setInterval(() => {
      const nextPosition = this.snakeController.getNextPosition();

      if (this.foodController.willCollideWithCell(nextPosition)) {
        this.snakeController.grow(nextPosition);
        this.placeFood();
        this.scoreController.updateScore();
      } else if (this.snakeController.willCollideWithCell(nextPosition)) {
        this.endGame();
      } else {
        this.snakeController.move(nextPosition);
      }
    }, 50);
  }

  placeFood() {
    let newPosition = this.foodController.generate();
    while (this.snakeController.willCollideWithCell(newPosition)) {
      newPosition = this.foodController.generate();
    }
    this.foodController.place(newPosition);
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
