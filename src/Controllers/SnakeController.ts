import { Snake } from '../Models/Snake';
import { Direction } from '../Direction';
import { Canvas } from '../Views/Canvas';
import { CoOrdinate } from '../CoOrdinate';
import { Collision } from '../utils/Collision';

export class SnakeController {
  static init(gameView: Canvas): SnakeController {
    return new SnakeController(new Snake(gameView.cellWidth), gameView);
  }

  constructor(public snake: Snake, public gameView: Canvas) {}

  initSnake() {
    this.gameView.draw(this.snake.length, this.snake.tail, this.snake.color);
  }

  setDirection(e: KeyboardEvent) {
    let inputDirection = e.key as Direction;

    const arrowKeyPressed =
      [Direction.Left, Direction.Up, Direction.Down, Direction.Right].indexOf(
        inputDirection
      ) !== -1;
    const directionHasChanged = inputDirection !== this.snake.currentDirection;
    const inValidDirectionChange =
      (this.snake.currentDirection === Direction.Left &&
        inputDirection === Direction.Right) ||
      (this.snake.currentDirection === Direction.Right &&
        inputDirection === Direction.Left) ||
      (this.snake.currentDirection === Direction.Up &&
        inputDirection === Direction.Down) ||
      (this.snake.currentDirection === Direction.Down &&
        inputDirection === Direction.Up);

    if (arrowKeyPressed && directionHasChanged && !inValidDirectionChange) {
      this.snake.currentDirection = inputDirection;
    }
  }

  getNextPosition() {
    let nextHeadPosition = Object.assign({}, this.snake.body[0]);
    switch (this.snake.currentDirection) {
      case Direction.Left:
        nextHeadPosition.x--;
        break;
      case Direction.Right:
        nextHeadPosition.x++;
        break;
      case Direction.Up:
        nextHeadPosition.y--;
        break;
      case Direction.Down:
        nextHeadPosition.y++;
        break;
      default:
        console.log('not a valid direction');
    }

    return nextHeadPosition;
  }

  move(nextPosition: CoOrdinate) {
    this.grow(nextPosition);
    this.removeTail();
  }

  grow(nextPosition: CoOrdinate) {
    this.snake.addSegment(nextPosition);
    this.gameView.draw(1, nextPosition, this.snake.color);
  }

  willCollideWithCell(cell: CoOrdinate) {
    return (
      Collision.withSnake(this.snake.body, cell) ||
      Collision.withGrid(
        cell,
        this.gameView.width / this.gameView.cellWidth,
        this.gameView.height / this.gameView.cellWidth
      )
    );
  }

  private removeTail() {
    const tail = this.snake.removeTail();
    if (tail) {
      this.gameView.erase(tail);
    }
  }
}
