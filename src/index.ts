import { Game } from './Controllers/GameController';
import { ScoreController } from './Controllers/ScoreController';
import { FoodController } from './Controllers/FoodController';
import { SnakeController } from './Controllers/SnakeController';
import { BoardController } from './Controllers/BoardController';

window.addEventListener('load', (event) => {

  // pass cell into board and snake ??
  const boardController = BoardController.init();
  const scoreController = ScoreController.init();
  const foodController = FoodController.init(boardController);
  const snakeController = SnakeController.init(boardController);

  const game = new Game(scoreController, foodController, snakeController);
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
