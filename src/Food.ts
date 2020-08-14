import { Canvas } from './Canvas';
import { CoOrdinate } from './CoOrdinate';
import { Snake } from './Snake';
import { CollisionDetector } from './CollisionDetector';
export class Food {
  position: CoOrdinate;
  color: string;
  constructor(public canvas: Canvas, public snake: Snake) {
    this.position = { x: 0, y: 0 };
    this.color = '#ff0000';
  }

  generate() {
    this.position.x = this.getCoOrdinates();
    this.position.y = this.getCoOrdinates();
    this.checkCollision();
    this.place();
  }

  getCoOrdinates() {
    const randomNum = Math.round(
      Math.floor(Math.random() * (this.canvas.width - this.canvas.cellWidth)) /
        10
    );

    return randomNum;
  }

  checkCollision() {
    if (CollisionDetector.collideWithSelf(this.snake.snake, this.position)) {
      return this.generate();
    }
  }

  place() {
    this.canvas.draw(1, this.position, this.color);
  }
}
