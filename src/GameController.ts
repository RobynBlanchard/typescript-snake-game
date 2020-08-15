import { Canvas } from './Canvas';
import { SnakeController } from './SnakeController';
import { Snake } from './Snake';
import { Food } from './Food';
import { Score } from './Score';
import { FoodController } from './FoodController';

import { CoOrdinate } from './CoOrdinate';
import { Collision } from './Collision';
// or interface Snake - method for move, collisin etc

export class Game {
  gridWidth: number;
  cellWidth: number;
  gridSelector: string;
  canvas: Canvas;
  snake: Snake;
  food: Food;
  foodController: FoodController;
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
    this.foodController = new FoodController(this.food, this.canvas);

    this.score = new Score();

    this.snakeController = new SnakeController(this.snake, this.canvas);
  }

  init() {
    this.foodController.place(this.snake.snake);
  }

  updateGameLoop() {
    document.addEventListener('keydown', (e) => {
      this.snakeController.setDirection(e);
    });

    // todo decrease time as game goes on
    this.gameLoop = setInterval(() => {
      const nextPosition = this.snake.nextPosition;

      if (Collision.withFood(nextPosition, this.food.position)) {
        this.snakeController.eat(nextPosition); // or should game controller update snake model? and snake controleller reponds to user input?
        this.foodController.place(this.snake.snake);
        this.score.increment();
      } else if (this.snakeWillCrash(nextPosition)) {
        this.endGame();
      } else {
        this.snakeController.move(nextPosition);
      }
    }, 50);
  }

  snakeWillCrash(nextPosition: CoOrdinate) {
    return (
      Collision.withSnake(this.snake.snake, nextPosition) ||
      Collision.withGrid(
        nextPosition,
        this.canvas.width / this.canvas.cellWidth,
        this.canvas.height / this.canvas.cellWidth
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
