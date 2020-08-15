export class Board {
  draw(
    ctx: CanvasRenderingContext2D,
    xCoOrdinate: number,
    yCoOrdinate: number,
    width: number,
    height: number,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx.fillRect(xCoOrdinate, yCoOrdinate, width, height);
  }
}
