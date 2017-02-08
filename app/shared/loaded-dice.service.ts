import {Injectable} from '@angular/core';
import {Dice} from './dice.service';


@Injectable()
export class LoadedDice extends Dice {
  protected script: any = [
    [2, 2],
    [1, 1],

  ];
  protected index: number = 0;

  // constructor() {
  //   super();
  //   this._die1 = 4;
  //   this._die2 = 5;
  // }

  roll() {
    this._die1 = this.script[this.index][0];
    this._die2 = this.script[this.index][1];
    this.index = (this.index + 1) % this.script.length;
  }
}
