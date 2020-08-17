import { Coordinate } from './Coordinate';
import { green } from './constants';
import { Direction } from './Direction';

export class GameObject {
  constructor(
    public body: Coordinate[] = [],
    public color: string = green,
    public currentDirection: Direction = Direction.Right
  ) {
    this.body = body;
    this.currentDirection = currentDirection;
    this.color = color;
  }

  setDirection(inputDirection: Direction) {
    const arrowKeyPressed = [
      Direction.Left,
      Direction.Up,
      Direction.Down,
      Direction.Right,
    ].includes(inputDirection);
    const directionHasChanged = inputDirection !== this.currentDirection;
    const inValidDirectionChange =
      (this.currentDirection === Direction.Left &&
        inputDirection === Direction.Right) ||
      (this.currentDirection === Direction.Right &&
        inputDirection === Direction.Left) ||
      (this.currentDirection === Direction.Up &&
        inputDirection === Direction.Down) ||
      (this.currentDirection === Direction.Down &&
        inputDirection === Direction.Up);

    if (arrowKeyPressed && directionHasChanged && !inValidDirectionChange) {
      this.currentDirection = inputDirection;
    }
  }

  getNextPosition() {
    let nextHeadPosition = Object.assign({}, this.body[0]);
    switch (this.currentDirection) {
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

  move(nextPosition: Coordinate) {
    this.grow(nextPosition);
    this.removeTail();
  }

  grow(nextPosition: Coordinate) {
    this.body.unshift(Object.assign({}, nextPosition));
  }

  private removeTail() {
    this.body.pop();
  }
}
