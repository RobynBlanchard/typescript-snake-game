export class Score {
  updateScore(newScore: number) {
    const counter = document.querySelector('.counter');
    if (counter) {
      counter.innerHTML = `${newScore}`;
    } 
  }
}
