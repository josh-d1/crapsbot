import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {Boxman} from '../shared/boxman.service';
import {Brain} from '../shared/brain.service';
import {Dice} from '../shared/dice.service';
import {Stickman} from '../shared/stickman.service';
import {WagerTypes} from '../shared/wagertypes.enum';

import {rolling} from '../animation/rolling.animation';
import {dice_glyphs} from '../shared/dice-glyphs';


@Component({
             selector: 'crapsbot',
             templateUrl: 'app/crapsbot/crapsbot.component.html',
             styleUrls: ['app/crapsbot/crapsbot.component.css'],
             animations: [rolling],
             // changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class CrapsbotComponent {
  protected message: BehaviorSubject<string> = new BehaviorSubject('welcome');
  protected dice: Dice;
  protected glyphs = dice_glyphs;
  protected rolling = false;
  protected timer: any = null;
  protected loadeddice = false;
  protected dicerolls = 0;
  protected wagertypes = WagerTypes;

  protected chatter: any = {
    dice: {
      '6,6': 'hard 12 - double in the field',
      '6,5': 'yo-leven',
      '6,4': 'easy 10',
      '6,3': 'niner - center field nine',
      '6,2': 'easy 8',
      '2,1': 'ace duece - 3 in the field'
    }
  };

  constructor(protected stickman: Stickman,
              protected boxman: Boxman,
              protected brain: Brain) {}

  ngOnInit() {
    this.stickman
        .events
        .dice
        .map((dice: Dice) => {
          this.dice = dice;
          // let key = (dice.die2 > dice.die1) ?
          //           '' + dice.die2 + ',' + dice.die1 :
          //           '' + dice.die1 + ',' + dice.die2;
          // this.message.next(this.chatter.dice[key]);
        })
        .subscribe();
  }

  ngAfterViewInit() {
    Observable.timer(200)
              .subscribe(() => {
                this.brain.runPointoff();
                this.brain.runSingleroll();
              });
  }

  pause() {
    if (this.timer !== null) {
      this.timer.unsubscribe();
      this.timer = null;
    } else {
      this.timer = Observable.timer(100, 2000)
                             .subscribe(() => {
                               this.rollDice();
                             });
    }
  }

  rollDice() {
    this.rolling = !this.rolling;
    ++this.dicerolls;
    this.stickman.roll();

  }

  // recording() {
  //   this.brain.recording = !this.brain.recording;
  // }


  loadDice() {
    this.stickman.magic = !this.stickman.magic;
  }

}
