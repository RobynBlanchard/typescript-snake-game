import { Canvas } from '../Views/Canvas';
import { CoOrdinate } from '../CoOrdinate';
import { Food } from '../Models/Food';
import { Collision } from '../utils/Collision';

export class FoodController {
  constructor(public food: Food, public canvas: Canvas) {}

  place(snake: CoOrdinate[]) {
    let newPosition = this.generate();
    while (this.willCollide(snake, newPosition)) {
      newPosition = this.generate();
    }
    this.food.position = newPosition;
  }

  generate() {
    return {
      x: this.getCoOrdinates(),
      y: this.getCoOrdinates(),
    };
  }

  getCoOrdinates() {
    const randomNum = Math.round(
      Math.floor(Math.random() * (this.canvas.width - this.canvas.cellWidth)) /
        10
    );

    return randomNum;
  }

  // or move to game controller?
  willCollide(snake: CoOrdinate[], foodPosition: CoOrdinate) {
    return Collision.withSnake(snake, foodPosition); /// just passing function in , not composing and delegating ?
  }
}
