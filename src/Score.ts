export class Score {
  score: number;
  constructor() {
    this.score = 0;
  }
  increment() {
    this.score++;
    this.renderNewScore();
  }
  private renderNewScore() {
    const counter = document.querySelector('.counter');
    if (counter) {
      counter.innerHTML = `${this.score}`;
    }
  }
}
