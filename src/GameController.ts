import { GameObject } from './GameObject';
import { Board } from './Board';
import { Coordinate } from './Coordinate';
import { Direction } from './Direction';
import { Snake } from './Snake';

export class Game {
  gameLoop: NodeJS.Timeout | undefined;

  constructor(
    public snake: Snake,
    public food: GameObject,
    public board: Board
  ) {}

  init() {
    this.placeFood();
    this.renderCurrentState();
  }

  renderCurrentState() {
    this.board.clearView();
    this.board.renderGameObject(this.snake);
    this.board.renderGameObject(this.food);
    // render current score
  }

  updateGameLoop() {
    document.addEventListener('keydown', (e) => {
      this.snake.setDirection(e.key as Direction);
    });

    // // todo decrease time as game goes on
    this.gameLoop = setInterval(() => {
      const nextPosition = this.snake.getNextPosition();

      if (this.objectWillCollide(this.food.body, nextPosition)) {
        this.snake.grow(nextPosition);
        this.placeFood();
        // this.score.increment();
      } else if (
        this.objectWillCollide(this.snake.body, nextPosition) ||
        this.collisionWithGrid(nextPosition)
      ) {
        this.endGame();
      } else {
        this.snake.move(nextPosition);
      }
      this.renderCurrentState();
    }, 50);
  }

  objectWillCollide(gameObjectBody: Coordinate[], nextPosition: Coordinate) {
    for (var i = 0; i < gameObjectBody.length; i++) {
      if (this.isSameCell(gameObjectBody[i], nextPosition)) {
        return true;
      }
    }
    return false;
  }

  collisionWithGrid(nextPosition: Coordinate) {
    return (
      nextPosition.x < 0 ||
      nextPosition.y < 0 ||
      nextPosition.x >= this.board.width ||
      nextPosition.y >= this.board.height
    );
  }

  isSameCell(occupiedCell: Coordinate, nextPosition: Coordinate) {
    return (
      nextPosition.x === occupiedCell.x && nextPosition.y === occupiedCell.y
    );
  }

  placeFood() {
    let newPosition = this.board.randomCoordinate();
    while (this.objectWillCollide(this.snake.body, newPosition)) {
      newPosition = this.board.randomCoordinate();
    }
    this.food.body = [newPosition];
  }

  pause() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
  }

  endGame() {
    if (this.gameLoop) {
      clearInterval(this.gameLoop);
    }
    const gameOver = document.querySelector('.game-over') as HTMLElement;
    if (gameOver) {
      gameOver.style.display = 'block';
    }
  }
}
