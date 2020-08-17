import { Game } from './GameController';
import { Board } from './Board';
import { GameObject } from './GameObject';
import { red } from './constants';

window.addEventListener('load', (event) => {
  const snake = new GameObject([
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);
  const food = new GameObject([{ x: 2, y: 10 }], red);

  const gameView = new Board();

  const game = new Game(snake, food, gameView);
  game.init();
  let isPlaying = false;
  const gameControlButton = document.querySelector('.game-control');

  gameControlButton?.addEventListener('click', () => {
    if (!isPlaying) {
      gameControlButton.innerHTML = 'pause';
      game.updateGameLoop();
      isPlaying = true;
    } else {
      gameControlButton.innerHTML = 'play';
      game.pause();
      isPlaying = false;
    }
  });
});
