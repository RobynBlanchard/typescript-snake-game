import { white } from '../constants';

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
}
