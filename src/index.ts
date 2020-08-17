import { Game } from './GameController';
import { Board } from './Board';
import { Snake } from './Snake';
import { GameObject } from './GameObject';
import { red, green } from './constants';

window.addEventListener('load', (event) => {
  const snake = new Snake(
    [
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ],
    green
  );
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
