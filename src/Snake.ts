import { Canvas } from './Canvas';
import { CoOrdinate } from './CoOrdinate';
import { green } from './constants';

export class Snake {
  snake: CoOrdinate[];
  direction: string;
  nextPosition: CoOrdinate;
  color: string;

  constructor(public width: number, public canvas: Canvas) {
    this.snake = [
      {
        x: 2,
        y: 0,
      },
      {
        x: 1,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
    ];
    this.direction = 'ArrowRight'; // ENUM - TODO
    this.nextPosition = {
      x: 3,
      y: 0,
    };
    this.color = green;
  }

  grow() {
    this.snake.unshift(Object.assign({}, this.nextPosition));
  }

  get tail() {
    return this.snake[this.snake.length - 1];
  }

  get length() {
    return this.snake.length;
  }

  // better name ? shift?
  move() {
    this.grow();
    this.removeTail();
  }

  getNextPosition() {
    let nextHeadPosition = Object.assign({}, this.snake[0]);
    switch (this.direction) {
      case 'ArrowLeft':
        nextHeadPosition.x--;
        break;
      case 'ArrowRight':
        nextHeadPosition.x++;
        break;
      case 'ArrowUp':
        nextHeadPosition.y--;
        break;
      case 'ArrowDown':
        nextHeadPosition.y++;
        break;
      default:
        console.log('not a valid direction');
    }
    this.nextPosition = nextHeadPosition;

    return nextHeadPosition;
  }

  setDirection(e: KeyboardEvent) {
    let directionCodeStr: string = e.key;

    const arrowKeyPressed =
      ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].indexOf(
        directionCodeStr
      ) !== -1;
    const directionHasChanged = directionCodeStr !== this.direction;
    const inValidDirectionChange =
      (this.direction === 'ArrowLeft' && directionCodeStr === 'ArrowRight') ||
      (this.direction === 'ArrowRight' && directionCodeStr === 'ArrowLeft') ||
      (this.direction === 'ArrowUp' && directionCodeStr === 'ArrowDown') ||
      (this.direction === 'ArrowDown' && directionCodeStr === 'ArrowUp');

    if (arrowKeyPressed && directionHasChanged && !inValidDirectionChange) {
      this.direction = directionCodeStr;
    }
  }

  private removeTail() {
    this.snake.pop();
  }
}
