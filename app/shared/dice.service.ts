import {Injectable} from '@angular/core';


@Injectable()
export class Dice {
  protected _die1: number;
  protected _die2: number;

  roll() {
    let randoms = new Uint8Array(2);
    window.crypto.getRandomValues(randoms);
    this._die1 = 1 + randoms[0] % 6;
    this._die2 = 1 + randoms[1] % 6;
  }

  get die1() {
    return this._die1;
  }

  get die2() {
    return this._die2;
  }

  get total() {
    return this._die1 + this._die2;
  }

}
