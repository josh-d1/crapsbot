import {Component} from '@angular/core';


import {BettingArea} from '../bettingarea.component';
import {Boxman} from '../../shared/boxman.service';
import {chips} from '../../animation/chips.animation';
import {CrapsBets} from '../../shared/crapsbets.model';
import {Stickman} from '../../shared/stickman.service';
import {Wager} from '../../shared/wager';


class ComeBet extends Wager {}

@Component({
             selector: 'table-come',
             templateUrl: 'app/table/come/come.component.html',
             styleUrls: ['app/table/come/come.component.css',
                         'app/table/hotzone.css'],
             animations: [chips],
           })
export class ComeComponent extends BettingArea {

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {
    super(stickman, boxman);
    this.type = CrapsBets.Come;
    this.bet = new ComeBet();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected get validbet(): boolean {
    return (this.stickman.point !== 0);
  }

}
