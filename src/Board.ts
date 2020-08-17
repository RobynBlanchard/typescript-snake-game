import { white } from './constants';
import { GameObject } from './GameObject';

export class Board {
  canvasSelector: string;
  canvas: HTMLCanvasElement;
  fill: string;
  width: number;
  height: number;
  cellWidth: number;

  constructor() {
    this.canvasSelector = '#canvas';
    this.canvas = document.documentElement.querySelector(
      this.canvasSelector
    ) as HTMLCanvasElement;
    this.fill = white;
    this.width = 30;
    this.height = 30;
    this.cellWidth = 10;
  }

  randomCoordinate() {
    return {
      x: this.randomNumber(),
      y: this.randomNumber(),
    };
  }

  renderGameObject(gameObject: GameObject) {
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      if (ctx) {
        gameObject.body.forEach((obj) => {
          const x = obj.x * this.cellWidth;
          const y = obj.y * this.cellWidth;
          const width = this.cellWidth;
          const height = this.cellWidth;
          if (ctx) {
            this.draw(ctx, x, y, width, height, gameObject.color);
          }
        });
      }
    }
  }

  clearView() {
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          this.width * this.cellWidth,
          this.cellWidth * this.height
        );
      }
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    xCoordinate: number,
    yCoordinate: number,
    width: number,
    height: number,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(xCoordinate, yCoordinate, width, height);
  }

  private randomNumber() {
    return Math.round(Math.floor(Math.random() * (this.width - 1)));
  }
}
