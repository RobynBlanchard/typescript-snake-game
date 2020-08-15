import { SnakeController } from './SnakeController';
import { FoodController } from './FoodController';
import { ScoreController } from './ScoreController';
import { CoOrdinate } from '../CoOrdinate';
import { Collision } from '../utils/Collision';
import { Canvas } from '../Views/Canvas';

export class Game {
  gameLoop: NodeJS.Timeout | undefined;

  constructor(
    public gameView: Canvas,
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

      if (Collision.withFood(nextPosition, this.foodController.food.position)) {
        this.snakeController.grow(nextPosition);
        this.placeFood();
        this.scoreController.updateScore();
      } else if (this.snakeWillCrash(nextPosition)) {
        this.endGame();
      } else {
        this.snakeController.move(nextPosition);
      }
    }, 50);
  }

  // move to food controller and pass in snake?
  placeFood() {
    let newPosition = this.foodController.generate();
    while (Collision.withSnake(this.snakeController.snake.body, newPosition)) {
      newPosition = this.foodController.generate();
    }
    this.foodController.place(newPosition);
  }

  snakeWillCrash(nextPosition: CoOrdinate) {
    return (
      Collision.withSnake(this.snakeController.snake.body, nextPosition) ||
      Collision.withGrid(
        nextPosition,
        this.gameView.width / this.gameView.cellWidth,
        this.gameView.height / this.gameView.cellWidth
      )
    );
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
