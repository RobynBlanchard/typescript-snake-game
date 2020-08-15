import { Snake } from '../Models/Snake';
import { Direction } from '../Direction';

export class SnakeController {
  constructor(public snake: Snake) {}

  setDirection(e: KeyboardEvent) {
    let inputDirection = e.key as Direction;

    const arrowKeyPressed =
      [Direction.Left, Direction.Up, Direction.Down, Direction.Right].indexOf(
        inputDirection
      ) !== -1;
    const directionHasChanged = inputDirection !== this.snake.currentDirection;
    const inValidDirectionChange =
      (this.snake.currentDirection === 'ArrowLeft' &&
        inputDirection === 'ArrowRight') ||
      (this.snake.currentDirection === 'ArrowRight' &&
        inputDirection === 'ArrowLeft') ||
      (this.snake.currentDirection === 'ArrowUp' &&
        inputDirection === 'ArrowDown') ||
      (this.snake.currentDirection === 'ArrowDown' &&
        inputDirection === 'ArrowUp');

    if (arrowKeyPressed && directionHasChanged && !inValidDirectionChange) {
      this.snake.currentDirection = inputDirection;
    }
  }
}
