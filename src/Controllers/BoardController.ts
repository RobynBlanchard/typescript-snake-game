import { CoOrdinate } from '../CoOrdinate';
import { Board as BoardModel } from '../Models/Board';
import { Board as BoardView } from '../Views/Board';
import { green } from '../constants';
import { Collision } from '../utils/Collision';

export class BoardController {
  static init() {
    return new BoardController(new BoardModel(), new BoardView());
  }

  constructor(public boardModel: BoardModel, public boardView: BoardView) {}

  randomCoOrdinate() {
    return Math.round(
      Math.floor(
        Math.random() * (this.boardModel.width - this.boardModel.cellWidth)
      ) / 10
    );
  }

  draw(length: number, headPosition: CoOrdinate, color: string = green) {
    if (this.boardModel.canvas.getContext) {
      let ctx = this.boardModel.canvas.getContext('2d');
      if (ctx) {
        const x = headPosition.x * this.boardModel.cellWidth;
        const y = headPosition.y * this.boardModel.cellWidth;
        const width = length * this.boardModel.cellWidth;
        const height = this.boardModel.cellWidth;

        this.boardView.draw(ctx, x, y, width, height, color);
      }
    }
  }

  erase(cell: CoOrdinate) {
    if (this.boardModel.canvas.getContext) {
      let ctx = this.boardModel.canvas.getContext('2d');
      if (ctx) {
        const x = cell.x * this.boardModel.cellWidth;
        const y = cell.y * this.boardModel.cellWidth;
        const width = this.boardModel.cellWidth;
        const height = this.boardModel.cellWidth;

        this.boardView.draw(ctx, x, y, width, height, this.boardModel.fill);
      }
    }
  }

  willCollide(cell: CoOrdinate) {
    return Collision.withGrid(
      cell,
      this.boardModel.width / this.boardModel.cellWidth,
      this.boardModel.height / this.boardModel.cellWidth
    );
  }
}
