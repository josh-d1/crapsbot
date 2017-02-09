import {Component} from '@angular/core';

import {BettingArea} from '../bettingarea.component';
import {Boxman} from '../../shared/boxman.service';
import {Stickman} from '../../shared/stickman.service';
import {chips} from '../../animation/chips.animation';
import {Wager} from '../../shared/wager';
import {CrapsBets} from '../../shared/crapsbets.model';

class DontcomeBet extends Wager {}

@Component({
             selector: 'table-dont-come',
             templateUrl: './dont-come.component.html',
             styleUrls: ['./dont-come.component.css'],
             animations: [chips],
           })
export class DontcomeComponent extends BettingArea {

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {
    super(stickman, boxman);
    this.bet = new DontcomeBet();
    this.type = CrapsBets.Dontcome;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected get validbet(): boolean {
    return (this.stickman.point !== 0);
  }

}
