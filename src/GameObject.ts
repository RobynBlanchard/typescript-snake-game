import { Coordinate } from './Coordinate';

export class GameObject {
  constructor(public body: Coordinate[] = [], public color: string) {
    this.body = body;
    this.color = color;
  }
}
