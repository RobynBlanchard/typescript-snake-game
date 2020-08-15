import { Food as FoodModel } from '../Models/Food';
import { Canvas } from '../Views/Canvas';
import { CoOrdinate } from '../CoOrdinate';

export class FoodController {
  static init(gameView: Canvas): FoodController {
    return new FoodController(new FoodModel(), gameView);
  }

  constructor(public food: FoodModel, public gameView: Canvas) {}

  place(newPosition: CoOrdinate) {
    this.food.position = newPosition;
    this.gameView.draw(1, newPosition, this.food.color);
  }

  generate() {
    return {
      x: this.getCoOrdinates(),
      y: this.getCoOrdinates(),
    };
  }

  getCoOrdinates() {
    const randomNum = Math.round(
      Math.floor(
        Math.random() * (this.gameView.width - this.gameView.cellWidth)
      ) / 10
    );

    return randomNum;
  }
}
