import {
  HostBinding,
  HostListener,
  Input,
  OnInit
} from '@angular/core';
import {
  DragDropData
} from 'ng2-dnd';

import {CrapsBets} from '../shared/crapsbets.model';
import {Boxman} from '../shared/boxman.service';
import {Stickman} from '../shared/stickman.service';
import {Wager} from '../shared/wager';
import {BetEvent} from '../shared/betevent.model';
import {AnimeState} from '../shared/anime-state';
import {Observable} from 'rxjs/Observable';


export abstract class BettingArea implements OnInit {
  @Input()
  valid: string;

  // @HostBinding('class')
  protected rollhit: string = '';

  protected chipanime = new AnimeState();
  protected winanime = new AnimeState();
  protected oddsanime = new AnimeState();
  protected oddswinanime = new AnimeState();
  protected bet: Wager;
  protected type = CrapsBets.Passline;

  protected bethandler: any;

  constructor(protected stickman: Stickman,
              protected boxman: Boxman) {}

  ngOnInit() {
    this.boxman.register(this.type, this.bet);

    this.stickman
        .events
        .rolling
        .map(() => {
          this.rollhit = 'inactive'
        })
        .subscribe();

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
                              this.oddsanime.state = 'newbet';
                            } else {
                              this.chipanime.state = 'newbet';
                            }
                          }).
                          subscribe();

    this.boxman
        .events
        .clear
        .filter((betevent: BetEvent) => {
          return typerex.test(CrapsBets[betevent.bet]);
        })
        .map((betevent: BetEvent) => {
          if (oddsrex.test(CrapsBets[betevent.bet])) {
            this.oddsanime.state = 'getback';
          } else {
            this.chipanime.state = 'getback';
          }
        })
        .subscribe();

    this.boxman
        .events
        .win
        .filter((betevent: BetEvent) => {
          return typerex.test(CrapsBets[betevent.bet]);
        })
        .map((betevent: BetEvent) => {
          if (oddsrex.test(CrapsBets[betevent.bet])) {
            if (this.bet.odds === 0) return;
            this.oddsanime.state = 'win';
            this.oddswinanime.val = betevent.val;
            this.oddswinanime.state = 'payout';
          }
          else {
            if (this.bet.total === 0) return;
            this.chipanime.state = 'win';
            this.winanime.val = betevent.val;
            this.winanime.state = 'payout';
          }
        })
        .subscribe();

    this.boxman
        .events
        .lose
        .filter((betevent: BetEvent) => {
          return typerex.test(CrapsBets[betevent.bet]);
        })
        .map((betevent: BetEvent) => {
          if (this.bet.total > 0) {
            this.chipanime.state = 'lose';
          }
          if (this.bet.odds > 0) {
            this.oddsanime.state = 'lose';
          }
        })
        .subscribe();
  }


  protected nuke() {
    this.boxman
        .getback(this.type);
  }


  // @HostListener('onDragEnter', ['$event'])
  // protected dragEnter(event: DragDropData) {
  //   this.rollhit = this.validbet ?
  //                  'dropzone' :
  //                  'invalid';
  // }


  // @HostListener('onDragLeave', ['$event'])
  // protected dragLeave(event: DragDropData) {
  //   this.rollhit = '';
  // }


  protected get validbet(): boolean {
    return true;
  }


  @HostListener('onDropSuccess', ['$event'])
  protected dropSuccess(event: any) {
    if (this.validbet) {
     this.boxman.bet(this.type, event.dragData);
    }
    this.rollhit = '';
  }

}
