import { CoOrdinate } from '../CoOrdinate';
import { green, white } from '../constants';

// board

// .. MVC

export class Canvas {
  canvas: HTMLCanvasElement;
  fill: string;

  constructor(
    public width: number,
    public height: number,
    public canvasSelector: string,
    public cellWidth: number
  ) {
    this.canvas = document.documentElement.querySelector(
      this.canvasSelector
    ) as HTMLCanvasElement;
    this.fill = white;
  }

  draw(length: number, headPosition: CoOrdinate, color: string = green) {
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = color;
        ctx.fillRect(
          headPosition.x * this.cellWidth,
          headPosition.y * this.cellWidth,
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
        ctx.fillStyle = this.fill;
        ctx.fillRect(
          tailCoOrd.x * this.cellWidth,
          tailCoOrd.y * this.cellWidth,
          this.cellWidth,
          this.cellWidth
        );
      }
    }
  }
}
