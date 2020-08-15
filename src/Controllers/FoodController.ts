import { Food as FoodModel } from '../Models/Food';
import { CoOrdinate } from '../CoOrdinate';
import { Collision } from '../utils/Collision';
import { BoardController } from './BoardController';

export class FoodController {
  static init(board: BoardController): FoodController {
    return new FoodController(new FoodModel(), board);
  }

  constructor(public food: FoodModel, public board: BoardController) {}

  place(newPosition: CoOrdinate) {
    this.food.position = newPosition;
    this.board.draw(1, newPosition, this.food.color);
  }

  generate() {
    return {
      x: this.board.randomCoOrdinate(),
      y: this.board.randomCoOrdinate(),
    };
  }

  willCollideWithCell(cell: CoOrdinate) {
    return Collision.withFood(cell, this.food.position);
  }
}
