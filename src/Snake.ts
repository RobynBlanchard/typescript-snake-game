import { Canvas } from './Canvas';
import { CoOrdinate } from './CoOrdinate';
export class Snake {
  snake: CoOrdinate[];
  direction: string;

  constructor(public width: number, public canvas: Canvas) {
    this.snake = [
      {
        x: 0,
        y: 0,
      },
    ];
    this.direction = 'ArrowRight';
  }

  init() {
    this.canvas.drawSnake(this.snake.length, this.snake[0]);
  }

  move() {
    let nextHeadPosition = Object.assign({}, this.snake[0]);
    console.log('DURECTION', this.direction)
    switch (this.direction) {
      case 'ArrowLeft':
        nextHeadPosition.x--;
        break;
      case 'ArrowRight':
        nextHeadPosition.x++;
        break;
      case 'ArrowUp':
        nextHeadPosition.y--;
        break;
      case 'ArrowDown':
        nextHeadPosition.y++;
        break;
      default:
        console.log('not a valid direction');
    }

    this.extendHead(nextHeadPosition);
    this.removeTail();

    //   if (collisionDetection(newPosition.x, newPosition.y)) {
    //     return;
    //   }

    //   if (foodCollision(newPosition.x * 10, newPosition.y * 10)) {
    //     // add to snake tail
    //     snakeLength++;
    //     increaseScore();

    //     // set new food position
    //     curFoodPosition = getFoodCoords();
    //     drawBlob(curFoodPosition.x, curFoodPosition.y, 'rgb(0,0,255)');
    //   }

    // this.snakeHeadPosition = nextHeadPosition;
    // this.moveSnakeForward();
  }

  setDirection(e: KeyboardEvent) {
    let directionCodeStr: string = e.key;

    const arrowKeyPressed =
      ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].indexOf(
        directionCodeStr
      ) !== -1;
    const directionHasChanged = directionCodeStr !== this.direction;

    if (arrowKeyPressed && directionHasChanged) {
      console.log('directionCodeStr', directionCodeStr)
      this.direction = directionCodeStr;
    }
  }

  private extendHead(newHead: CoOrdinate) {
    // console.log('extend head', newHead)
    this.snake.unshift(Object.assign({}, newHead));
    this.canvas.drawSnake(1, newHead);
  }

  private removeTail() {
    console.log('remove tails');

    const tailCoOrd = this.snake.pop();
    if (tailCoOrd) {
      this.canvas.erase(tailCoOrd);
    }
  }
}
