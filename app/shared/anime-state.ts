import {EventEmitter} from '@angular/core';

export class AnimeState {
  protected states: any = [];
  protected _state: string;
  val: number;
  done = new EventEmitter<string>();

  start(event: any) {}

  reset(event: any) {
    let state = this.states.shift();
    this.done.emit(this._state);
    this._state = (state === undefined) ?
                  '' :
                  state;
  }

  set state(val: string) {
    if (0 === this.states.length &&
        '' === this._state) {
      this._state = val;
    } else {
      this.states.push(val);
    }
  }

  get state() {
    return this._state;
  }
}
