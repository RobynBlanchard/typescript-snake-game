import { Snake } from './Snake';
import { Canvas } from './Canvas';

export class SnakeController {
  constructor(public snake: Snake, public canvas: Canvas) {}

  init() {
    // draw snake current state
    this.canvas.draw(this.snake.length, this.snake.tail, this.snake.color);
  }

  move() {
    this.canvas.draw(1, this.snake.nextPosition, this.snake.color);
    this.canvas.erase(this.snake.tail);
    this.snake.move();
  }

  eat() {
    this.snake.grow();
    this.canvas.draw(1, this.snake.nextPosition, this.snake.color);
  }
}
