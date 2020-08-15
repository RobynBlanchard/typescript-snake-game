import { Canvas } from '../Views/Canvas';
import { CoOrdinate } from '../CoOrdinate';
import { Snake } from './Snake';

export class Food {
  _position: CoOrdinate;
  color: string;
  constructor(public canvas: Canvas, public snake: Snake) {
    this._position = { x: 0, y: 0 };
    this.color = '#ff0000';
  }

  get position() {
    return this._position;
  }

  set position(newPosition: CoOrdinate) {
    this._position = newPosition;
    this.canvas.draw(1, this._position, this.color);
  }
}
