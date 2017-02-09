import {
  Component,
} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BettingArea} from '../bettingarea.component';
import {Boxman} from '../../shared/boxman.service';
import {chips} from '../../animation/chips.animation';
import {CrapsBets} from '../../shared/crapsbets.model';
import {Stickman} from '../../shared/stickman.service';
import {Wager} from '../../shared/wager';

class PasslineBet extends Wager {}


@Component({
             selector: 'table-passline',
             templateUrl: './passline.component.html',
             styleUrls: ['./passline.component.css',
                         '../hotzone.css'],
             animations: [chips],
             host: {
               '[class.inactive]': "rollhit === 'inactive'",
               '[class.active]': "rollhit === 'active'",
               '[class.dropzone]': "rollhit === 'dropzone'",
               '[class.invalid]': "rollhit === 'invalid'",
               '[class.push]': "rollhit === 'push'",
             }
           })
export class PasslineComponent extends BettingArea {

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {
    super(stickman, boxman);
    this.bet = new PasslineBet();
    this.type = CrapsBets.Passline;
  }

  ngOnInit() {
    super.ngOnInit();

    // Observable.merge(this.stickman.events.sevenout,
    //                  this.stickman.events.craps,
    //                  this.stickman.events.crapspush)
    //           .map(() => {
    //             if (this.bet.total > 0) {
    //               this.chipanime.state = 'lose';
    //             }
    //           })
    //           .subscribe();

    Observable.merge(this.stickman.events.natural,
                     this.stickman.events.pointhit)
              .map((val: number) => {
                this.rollhit = 'active';
              })
              .subscribe();
  }

  protected get validbet(): boolean {
    return (this.stickman.point === 0 || (this.stickman.point !== 0 && this.bet.total !== 0));
  }

}
