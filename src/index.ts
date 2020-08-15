import { Game } from './Controllers/GameController';

window.addEventListener('load', (event) => {
  const game = new Game();
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
