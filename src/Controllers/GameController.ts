import { Canvas } from '../Views/Canvas';
import { SnakeController } from './SnakeController';
import { Snake } from '../Models/Snake';
import { Food } from '../Models/Food';
import { Score } from '../Models/Score';
import { FoodController } from './FoodController';

import { CoOrdinate } from '../CoOrdinate';
import { Collision } from '../utils/Collision';
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

    this.snakeController = new SnakeController(this.snake);
  }

  init() {
    this.foodController.place(this.snake.snake);

    // observe snake changes, food position changes
  }

  updateGameLoop() {
    document.addEventListener('keydown', (e) => {
      this.snakeController.setDirection(e);
    });

    // todo decrease time as game goes on
    this.gameLoop = setInterval(() => {
      const nextPosition = this.snake.nextPosition;

      if (Collision.withFood(nextPosition, this.food.position)) {
        this.snake.grow(nextPosition);
        this.foodController.place(this.snake.snake);
        this.score.increment();
      } else if (this.snakeWillCrash(nextPosition)) {
        this.endGame();
      } else {
        this.snake.grow(nextPosition);
        this.snake.removeTail();
      }

      // render
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
