import {
  Component,
  Input
} from '@angular/core';

import {BettingArea} from '../bettingarea.component';
import {chips} from '../../animation/chips.animation';
import {Wager} from '../../shared/wager';
import {Stickman} from '../../shared/stickman.service';
import {Boxman} from '../../shared/boxman.service';
import {CrapsBets} from '../../shared/crapsbets.model';
import {BetEvent} from '../../shared/betevent.model';


class LayBet extends Wager {}

@Component({
             selector: 'table-laybox',
             templateUrl: './laybox.component.html',
             styleUrls: ['./laybox.component.css',
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
export class LayboxComponent extends BettingArea {
  @Input() box: string;

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {
    super(stickman, boxman);
    this.bet = new LayBet();
  }

  ngOnInit() {
    this.type = 1020 + Number(this.box);
    super.ngOnInit();

    this.bethandler.unsubscribe();
    let typerex = new RegExp('^' + CrapsBets[this.type], 'i');
    let oddsrex = /odds/i;
    this.bethandler = this.boxman
                          .events
                          .bet
                          .filter((betevent: BetEvent) => {
                            return typerex.test(CrapsBets[betevent.bet]) && this.bet.total > 0;
                          })
                          .map((betevent: BetEvent) => {
                            if (!betevent.anime) return;
                            if (oddsrex.test(CrapsBets[betevent.bet])) {
                              this.oddsanime.state = 'layboxslide';
                            } else {
                              this.chipanime.state = 'layboxslide';
                            }
                          }).
                          subscribe();
  }


  protected get validbet() {
    return this.bet.total > 0;
  }
}
