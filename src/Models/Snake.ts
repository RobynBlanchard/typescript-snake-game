import { Canvas } from '../Views/Canvas';
import { CoOrdinate } from '../CoOrdinate';
import { green } from '../constants';
import { Direction } from '../Direction';

export class Snake {
  snake: CoOrdinate[];
  currentDirection: string;
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
    this.currentDirection = Direction.Right;
    this.color = green;
    this.canvas.draw(this.length, this.tail, this.color);
  }

  get tail() {
    return this.snake[this.snake.length - 1];
  }

  get length() {
    return this.snake.length;
  }

  get nextPosition() {
    let nextHeadPosition = Object.assign({}, this.snake[0]);
    switch (this.currentDirection) {
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

    return nextHeadPosition;
  }

  grow(nextPosition: CoOrdinate) {
    this.snake.unshift(Object.assign({}, nextPosition));
    this.canvas.draw(1, nextPosition, this.color);
  }

  removeTail() {
    const tail = this.snake.pop();
    if (tail) {
      this.canvas.erase(tail);
    }
  }
}
