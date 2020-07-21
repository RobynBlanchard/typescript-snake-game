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
    this.direction = 'right';
  }

  init() {
    this.canvas.drawSnake(this.snake.length, this.snake[0]);
  }

  move() {
    let nextHeadPosition = Object.assign({}, this.snake[0]);

    switch (this.direction) {
      case 'left':
        nextHeadPosition.x--;
        break;
      case 'right':
        nextHeadPosition.x++;
        break;
      case 'up':
        nextHeadPosition.y--;
        break;
      case 'down':
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

  private extendHead(newHead: CoOrdinate) {
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
