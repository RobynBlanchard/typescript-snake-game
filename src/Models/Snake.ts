import { CoOrdinate } from '../CoOrdinate';
import { green } from '../constants';
import { Direction } from '../Direction';

export class Snake {
  body: CoOrdinate[];
  currentDirection: string;
  color: string;

  constructor() {
    this.body = [
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
  }

  get tail() {
    return this.body[this.body.length - 1];
  }

  get length() {
    return this.body.length;
  }

  addSegment(nextPosition: CoOrdinate) {
    this.body.unshift(Object.assign({}, nextPosition));
  }

  removeTail() {
    return this.body.pop();
  }
}
