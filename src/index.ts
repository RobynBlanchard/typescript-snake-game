import { Game } from './GameController';

window.addEventListener('load', (event) => {
  const game = new Game();
  game.init()
  // game.updateGameLoop();
});
