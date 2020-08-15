import { Score as ScoreModel } from '../Models/Score';
import { Score as ScoreView } from '../Views/Score';

export class ScoreController {
  static init(): ScoreController {
    return new ScoreController(new ScoreModel(), new ScoreView());
  }

  constructor(public scoreModel: ScoreModel, public scoreView: ScoreView) {}

  updateScore() {
    this.scoreModel.increment();
    this.scoreView.updateScore(this.scoreModel.score);
  }
}
