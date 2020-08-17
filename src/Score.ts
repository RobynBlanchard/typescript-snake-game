export class Score {
  score: number;
  constructor() {
    this.score = 0;
  }
  increment() {
    this.score++;
  }
}

// updateScore(newScore: number) {
//   const counter = document.querySelector('.counter');
//   if (counter) {
//     counter.innerHTML = `${newScore}`;
//   } 
// }