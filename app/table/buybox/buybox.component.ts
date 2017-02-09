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


class BuyBet extends Wager {}

@Component({
             selector: 'table-buybox',
             templateUrl: './buybox.component.html',
             styleUrls: ['./buybox.component.css',
                         '../hotzone.css'],
             animations: [chips],
             host: {
               '[class.four]': "box === '4'",
               '[class.five]': "box === '5'",
               '[class.six]': "box === '6'",
               '[class.eight]': "box === '8'",
               '[class.nine]': "box === '9'",
               '[class.ten]': "box === '10'",
               '[class.inactive]': "rollhit === 'inactive'",
               '[class.active]': "rollhit === 'active'",
               '[class.dropzone]': "rollhit === 'dropzone'",
               '[class.invalid]': "rollhit === 'invalid'",
               '[class.push]': "rollhit === 'push'",
             }
           })
export class BuyboxComponent extends BettingArea {
  @Input() box: string;

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {
    super(stickman, boxman);
    this.bet = new BuyBet();
  }

  ngOnInit() {
    this.type = 1000 + Number(this.box);
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
                              this.oddsanime.state = 'buyboxslide';
                            } else {
                              this.chipanime.state = 'buyboxslide';
                            }
                          }).
                          subscribe();
  }


  protected get validbet() {
    return this.bet.total > 0;
  }

}

