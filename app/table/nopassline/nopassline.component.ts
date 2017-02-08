import {
  Component,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group,
} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BettingArea} from '../bettingarea.component';
import {Boxman} from '../../shared/boxman.service';
import {Stickman} from '../../shared/stickman.service';
import {chips} from '../../animation/chips.animation';
import {Wager} from '../../shared/wager';
import {CrapsBets} from '../../shared/crapsbets.model';

class NopasslineBet extends Wager {}

@Component({
             selector: 'table-nopassline',
             templateUrl: 'app/table/nopassline/nopassline.component.html',
             styleUrls: ['app/table/nopassline/nopassline.component.css',
                         'app/table/hotzone.css'],
             animations: [chips]
           })
export class NopasslineComponent extends BettingArea {

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {
    super(stickman, boxman);
    this.bet = new NopasslineBet();
    this.type = CrapsBets.Nopassline;
  }

  ngOnInit() {
    super.ngOnInit();

    Observable.merge(this.stickman.events.natural,
                     this.stickman.events.pointhit)
              .map(() =>{
                if (this.bet.total > 0) {
                  this.chipanime.state = 'lose';
                }
                if (this.bet.odds > 0) {
                  this.oddsanime.state = 'lose';
                }
              })
              .subscribe();

    Observable.merge(this.stickman.events.craps,
                     this.stickman.events.sevenout)
              .map((val: number) => {
                this.rollhit = 'active';
              })
              .subscribe();

    this.stickman
        .events
        .rolling
        .map(() => {
          this.rollhit = 'inactive'
        })
        .subscribe();

    this.stickman
        .events
        .crapspush
        .map((val: number) => {
          this.rollhit = 'push';
        })
        .subscribe();
  }
}
