import { CoOrdinate } from '../CoOrdinate';

// initialise with grid boundary ??
export class Collision {
  static withFood(nextPosition: CoOrdinate, foodPosition: CoOrdinate) {
    return this.isSameCell(foodPosition, nextPosition);
  }

  static withSnake(snake: CoOrdinate[], nextPosition: CoOrdinate) {
    for (var i = 0; i < snake.length; i++) {
      if (this.isSameCell(snake[i], nextPosition)) {
        return true;
      }
    }
    return false;
  }

  static withGrid(
    nextPosition: CoOrdinate,
    boundaryX: number,
    boundaryY: number
  ) {
    return (
      nextPosition.x < 0 ||
      nextPosition.y < 0 ||
      nextPosition.x >= boundaryX ||
      nextPosition.y >= boundaryY
    );
  }

  private static isSameCell(
    occupiedCell: CoOrdinate,
    nextPosition: CoOrdinate
  ) {
    return (
      nextPosition.x === occupiedCell.x && nextPosition.y === occupiedCell.y
    );
  }
}
