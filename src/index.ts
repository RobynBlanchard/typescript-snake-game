import { Game } from './Controllers/GameController';
import { ScoreController } from './Controllers/ScoreController';
import { FoodController } from './Controllers/FoodController';
import { SnakeController } from './Controllers/SnakeController';
import { Canvas } from './Views/Canvas';

window.addEventListener('load', (event) => {
  const gridWidth = 30;
  const gridSelector = '#canvas';
  const cellWidth = 10;
  const gameView = new Canvas(
    gridWidth * cellWidth,
    gridWidth * cellWidth,
    gridSelector,
    cellWidth
  );
  const scoreController = ScoreController.init();
  const foodController = FoodController.init(gameView);
  const snakeController = SnakeController.init(gameView);

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
