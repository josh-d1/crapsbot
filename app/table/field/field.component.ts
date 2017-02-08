import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import {BetEvent} from '../../shared/betevent.model';
import {BettingArea} from '../bettingarea.component';
import {Boxman} from '../../shared/boxman.service';
import {CrapsBets} from '../../shared/crapsbets.model';
import {Dice} from '../../shared/dice.service';
import {Stickman} from '../../shared/stickman.service';
import {Wager} from '../../shared/wager';

import {chips} from '../../animation/chips.animation';


class FieldBet extends Wager {}

@Component({
             selector: 'table-field',
             templateUrl: 'app/table/field/field.component.html',
             styleUrls: ['app/table/field/field.component.css', 'app/table/hotzone.css'],
             animations: [chips],
           })
export class FieldComponent extends BettingArea {
  private zones: any;

  constructor(protected stickman: Stickman,
              protected boxman: Boxman,) {
    super(stickman, boxman);
    this.type = CrapsBets.Field;
    this.bet = new FieldBet();
    this.zones = this.resetZones();
  }

  private resetZones() {
    return {
      2: false,
      3: false,
      4: false,
      9: false,
      10: false,
      11: false,
      12: false,
    };
  }

  ngOnInit() {
    super.ngOnInit();

    this.stickman
        .events
        .rolling
        .map(() => {
          this.zones = this.resetZones();
        })
        .subscribe();

    this.stickman
        .events
        .field
        .map((val: number) => {
          this.zones[val] = true;
        })
        .subscribe();
  }
}
