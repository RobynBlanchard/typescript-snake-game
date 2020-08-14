import { CoOrdinate } from './CoOrdinate';
import { Snake } from './Snake';

// initialise with grid boundary ??
export class CollisionDetector {
  // two cords
  static foodCollision(nextHeadPosition: CoOrdinate, foodPosition: CoOrdinate) {
    return (
      nextHeadPosition.x === foodPosition.x &&
      nextHeadPosition.y === foodPosition.y
    );
  }

  // TODO - split out
  static snakeCollision(
    snake: CoOrdinate[],
    nextPosition: CoOrdinate,
    boundaryX: number,
    boundaryY: number
  ) {
    return (
      this.collideWithSelf(snake, nextPosition) ||
      this.collideWithGrid(nextPosition, boundaryX, boundaryY)
    );
  }

  static collideWithSelf(snake: CoOrdinate[], nextPosition: CoOrdinate) {
    for (var i = 0; i < snake.length; i++) {
      if (snake[i].x === nextPosition.x && snake[i].y === nextPosition.y) {
        return true;
      }
    }
    return false;
  }

  static collideWithGrid(
    nextPos: CoOrdinate,
    boundaryX: number,
    boundaryY: number
  ) {
    console.log(boundaryX)
    console.log(boundaryY)
    console.log(nextPos)

    return (
      nextPos.x < 0 ||
      nextPos.y < 0 ||
      nextPos.x >= boundaryX ||
      nextPos.y >= boundaryY
    );
  }
}
