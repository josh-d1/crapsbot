import {
  EventEmitter,
  Injectable
} from '@angular/core';
import {Dice} from './dice.service';
import './rxjs-operators';
import {
  craps,
  field,
  natural,
  place
} from './craps-rolls';
import {MagicDice} from './magic-dice';



@Injectable()
export class Stickman {
  checks: any;
  point: number;
  events: any;
  public magic = false;

  constructor(private magicDice: MagicDice) {
    this.point = 0;
    this.events = {
      come: new EventEmitter<number>(),
      comecraps: new EventEmitter<number>(),
      craps: new EventEmitter<number>(),
      crapspush: new EventEmitter<number>(),
      dice: new EventEmitter<Dice>(),
      field: new EventEmitter<Dice>(),
      natural: new EventEmitter<number>(),
      place: new EventEmitter<number>(),
      point: new EventEmitter<number>(),
      pointhit: new EventEmitter<number>(),
      rake: new EventEmitter<void>(),
      rolling: new EventEmitter<void>(),
      sevenout: new EventEmitter<void>(),
    };

    this.checks = {
      craps,
      natural,
      field,
      place,
    };
  }

  roll() {
    this.events.rolling.emit(true);
    let roll = this.magicDice.roll(this.magic);
    this.events
        .dice
        .emit(roll);
    let total = roll.total;

    try {
      let field = this.checks.field.indexOf(total);
      this.events.field.emit((field !== -1) ? total : 0);

      if (this.point === 0) {
        // roll out
        if (this.checks.natural.indexOf(total) !== -1) {
          this.events.natural.emit(total);
          return;
        }

        if (this.checks.craps.indexOf(total) !== -1) {
          if (total === 12) {
            this.events.crapspush.emit(total);
          }
          else {
            this.events.craps.emit(total);
          }
          return;
        }

        this.point = total;
        this.events.point.emit(total);
        return;
      }

      // point 'on'
      if (this.checks.natural.indexOf(total) !== -1) {
        this.events.come.emit(total);
      }

      if (this.checks.craps.indexOf(total) !== -1) {
        this.events.comecraps.emit(total);
      }

      if (total === 7) {
        this.events.sevenout.emit(this.point);
        this.point = 0;
        return;
      }

      if (total === this.point) {
        this.events.pointhit.emit(total);
        this.point = 0;
        this.events.point.emit(0);
        return;
      }

      if (this.checks.place.indexOf(total) !== -1) {
        this.events.place.emit(total);
      }
    } finally {
      this.events.rake.emit();
    }

  }


}
