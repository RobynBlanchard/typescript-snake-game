import { CoOrdinate } from './CoOrdinate';
import { green } from './constants';

export class Canvas {
  canvas: HTMLCanvasElement;

  constructor(
    public width: number,
    public height: number,
    public canvasSelector: string,
    public cellWidth: number
  ) {
    this.canvas = document.documentElement.querySelector(
      this.canvasSelector
    ) as HTMLCanvasElement;
  }

  // draw
  drawSnake(length: number, startingPosition: CoOrdinate) {
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = green;
        ctx.fillRect(
          startingPosition.x * this.cellWidth,
          startingPosition.y * this.cellWidth,
          length * this.cellWidth,
          this.cellWidth,
        );
      }
    }
  }

  erase(tailCoOrd: CoOrdinate) {
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(
          tailCoOrd.x * this.cellWidth,
          tailCoOrd.y * this.cellWidth,
          this.cellWidth,
          this.cellWidth
        );
      }
    }
  }

  // removeTail() {
  //   if (snake.length >= snakeLength) {
  //         var whiteSquare = snake.pop();
  //         drawBlob(
  //           snakeWidth * whiteSquare.x,
  //           snakeWidth * whiteSquare.y,
  //           'rgb(255, 255, 255)'
  //         );
  //       }
  // }
}
