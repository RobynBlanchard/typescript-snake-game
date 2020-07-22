import { Canvas } from './Canvas';
import { CoOrdinate } from './CoOrdinate';
export class Snake {
  snake: CoOrdinate[];
  direction: string;
  nextPosition: CoOrdinate;

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
    this.direction = 'ArrowRight';
    this.nextPosition = {
      x: 3,
      y: 0
    }
  }

  init() {
    this.canvas.draw(this.snake.length, this.snake[this.snake.length - 1]);
  }

  extend() {
    this.extendHead(this.nextPosition);
  }

  move() {
    this.extendHead(this.nextPosition);
    this.removeTail();
  }

  getNextPosition() {
    let nextHeadPosition = Object.assign({}, this.snake[0]);
    console.log('DIRECTION', this.direction);
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

    if (arrowKeyPressed && directionHasChanged) {
      this.direction = directionCodeStr;
    }
  }

  willCollide(coOrdinate: CoOrdinate) {
    for (var i = 0; i < this.snake.length; i++) {
      if (
        this.snake[i].x === coOrdinate.x &&
        this.snake[i].y === coOrdinate.y
      ) {
        return true;
      }
    }
    return false;
  }

  // private foodCollision() {
  //   return this.snake[0].x === food.x && this.snake[0].y === food.y;
  // }

  private extendHead(newHead: CoOrdinate) {
    this.snake.unshift(Object.assign({}, newHead));
    this.canvas.draw(1, newHead);
  }

  private removeTail() {
    console.log('remove tails');

    const tailCoOrd = this.snake.pop();
    if (tailCoOrd) {
      this.canvas.erase(tailCoOrd);
    }
  }
}
