import { CoOrdinate } from '../CoOrdinate';
import { red } from '../constants';
export class Food {
  _position: CoOrdinate;
  color: string;
  constructor() {
    this._position = { x: 0, y: 0 };
    this.color = red;
  }

  get position() {
    return this._position;
  }

  set position(newPosition: CoOrdinate) {
    this._position = newPosition;
  }
}
