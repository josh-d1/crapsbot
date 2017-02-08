import {
  Component,
  Input
} from '@angular/core';


import {BettingArea} from '../bettingarea.component';
import {BetEvent} from '../../shared/betevent.model';
import {Boxman} from '../../shared/boxman.service';
import {chips} from '../../animation/chips.animation';
import {Stickman} from '../../shared/stickman.service';
import {Wager} from '../../shared/wager';
import {CrapsBets} from '../../shared/crapsbets.model';


class PlaceBet extends Wager {}

@Component({
             selector: 'table-placebox',
             templateUrl: 'app/table/placebox/placebox.component.html',
             styleUrls: ['app/table/placebox/placebox.component.css','app/table/hotzone.css'],
             animations: [chips],
             host: {
               '[class.inactive]': "rollhit === 'inactive'",
               '[class.active]': "rollhit === 'active'",
               '[class.dropzone]': "rollhit === 'dropzone'",
               '[class.invalid]': "rollhit === 'invalid'",
               '[class.push]': "rollhit === 'push'",
             }
           })
export class PlaceboxComponent extends BettingArea {
  @Input() boxnumber: string;

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {
    super(stickman, boxman);
    this.bet = new PlaceBet();
  }

  ngOnInit() {
    this.type = Number(this.boxnumber);
    super.ngOnInit();

    this.stickman
      .events
      .place
      .map((val: number) => {
        if (val === Number(this.boxnumber)) {
          this.rollhit = 'active';
        }
      })
      .subscribe();

    // this.stickman
    //     .events
    //     .pointhit
    //     .map((val: number) => {
    //       if (this.bet.total > 0) {
    //         this.chipanime.state = 'getback';
    //       }
    //     })
    //     .subscribe();

    // let test = Number(this.boxnumber);
    // this.boxman
    //     .events
    //     .win
    //     .filter((obj: any) => {
    //       return obj.bet === test;
    //     })
    //     .map((bet: BetEvent) => {
    //       this.chipanime.state = 'win';
    //       this.winanime.val = bet.val;
    //       this.winanime.state = 'payout';
    //     })
    //     .subscribe();
  }

  protected get validbet(): boolean {
    return this.stickman.point !== 0;
  }
}
