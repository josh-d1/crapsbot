import {Injectable} from '@angular/core';

import {Dice} from './dice.service';
import {LoadedDice} from './loaded-dice.service';


@Injectable()
export class MagicDice {
  constructor(private dice: Dice,
              private loaded: LoadedDice) {}

  roll(magic: boolean): Dice {
    if (magic) {
      this.loaded.roll();
      return this.loaded;
    } else {
      this.dice.roll();
      return this.dice;
    }
  }
}
