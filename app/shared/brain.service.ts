import {Injectable} from '@angular/core';
import {
  LocalStorageService,
  LocalStorage
} from 'ng2-webstorage';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {BetEvent} from './betevent.model';
import {Boxman} from './boxman.service';
import {CrapsBets} from './crapsbets.model';
import {Dice} from './dice.service';
import {Stickman} from './stickman.service';
import {WagerTypes} from './wagertypes.enum';


@Injectable()
export class Brain {
  // protected _replay: ReplaySubject<any> = new ReplaySubject();
  protected stats: any = [];
  protected storagekey = 'brain-wagers';
  protected _recording = false;
  protected types = WagerTypes;

  @LocalStorage('brain-wagers')
  protected _wagers: any;


  constructor(protected stickman: Stickman,
              protected boxman: Boxman,
              protected localstorage: LocalStorageService) {

    // this.stats = Object.keys(CrapsBets)
    //                    .filter((key) => {
    //                      return !Number.parseInt(key);
    //                    })
    //                    .map((key) => {
    //                      return this.createStatPayload(CrapsBets[key]);
    //                    });
    //
    // this.stats.fetch = (bet: CrapsBets) => {
    //   return this.stats.find((item: any) => {
    //     return item.bet == bet;
    //   });
    // };

    if (this._wagers === null) {
      this._wagers = {
        pointoff: [],
        pointon: [],
        singleroll: [],
        come: [],

      };
      this.localstorage
          .store(this.storagekey, this._wagers);
    }

    this.createSubscriptions();
  }


  // get replay() {
  //   return this._replay.asObservable();
  // }


  get wagers() {
    return this._wagers;
  }


  get recording() {
    return this._recording;
  }


  set recording(val: boolean) {
    this._recording = val;
  }


  protected createStatPayload(bet: CrapsBets) {
    let key = CrapsBets[bet];
    let label = key.toLowerCase()
                   .replace(/placebox/i, 'pb')
                   .replace(/^passline$/i,'pass')
                   .replace(/^passlineodds$/i, 'odds')
                   .replace(/field/i,'fld')
                   .replace(/^nopassline$/i,'nopass')
                   .replace(/^nopasslineodds|dontcomeodds$/i,'nodds')
                   .replace(/^comeodds$/i, 'odds')
                   .replace(/^dontcome$/i, 'nocome');
    let payload = {
      bet: bet,
      val: 0,
      hits: 0,
      label: label,
      // valmsg: new BehaviorSubject<string>('0'),
      // hitmsg: new BehaviorSubject<string>('0'),
    };
    return payload;
  }


  protected addWager(betevent: BetEvent) {
    let buffer: any;
    switch (betevent.bet) {
      case CrapsBets.Come:
      case CrapsBets.ComeOdds:
      case CrapsBets.Dontcome:
      case CrapsBets.DontcomeOdds:
        buffer = this._wagers.come;
        break;

      case CrapsBets.Field:
        buffer = this._wagers.singleroll;
        break;

      default:
        buffer = (this.stickman.point === 0) ?
                 this._wagers.pointoff :
                 this._wagers.pointon;
    }

    let payload = buffer.find((item: any) => {
      return item.bet == betevent.bet;
    });
    if (payload === undefined) {
      payload = this.createStatPayload(betevent.bet);
      buffer.push(payload);
    }
    payload.val += betevent.val;
  }

  public removeWager(type: WagerTypes, index: number) {
    try {
      let buffer = this._wagers[WagerTypes[type]];
      buffer.splice(index, 1);
      this.localstorage
          .store(this.storagekey, this._wagers);
    }
    catch (ex) {
      console.log(ex.toString());
    }
  }


  // boxman event handlers
  public onBetEvent(betevent: BetEvent) {
    if (betevent.bet >= CrapsBets.Buybox4 && betevent.bet <= CrapsBets.Buybox10) {
      this.runComeOdds(betevent.bet + 10);
      return;
    }

    if (betevent.bet >= CrapsBets.Laybox4 && betevent.bet <= CrapsBets.Laybox10) {
      this.runComeOdds(betevent.bet + 10);
      return;
    }

    if (!this._recording) return;

    let _betevent = Object.assign({}, betevent);
    if (_betevent.bet >= CrapsBets.Buybox4Odds && _betevent.bet <= CrapsBets.Buybox10Odds) {
      _betevent.bet = CrapsBets.ComeOdds;
    }
    else if (_betevent.bet >= CrapsBets.Laybox4Odds && _betevent.bet <= CrapsBets.Laybox10Odds) {
      _betevent.bet = CrapsBets.DontcomeOdds;
    }
    this.addWager(_betevent);
    this.localstorage
        .store(this.storagekey, this._wagers);
  }


  public onDice(dice: Dice) {
  }


  public runPointoff() {
    let swap = Boolean(this._recording);
    this._recording = false;
    let wagers = this._wagers.pointoff;
    for (let i in this._wagers.pointoff) {
      this.boxman.bet(wagers[i].bet, wagers[i].val, true);
    }
    this._recording = swap;
  }


  public runPointon() {
    let swap = Boolean(this._recording);
    this._recording = false;
    let wagers = this._wagers.pointon;
    for (let i in wagers) {
      this.boxman.bet(wagers[i].bet, wagers[i].val, true);
    }
    this._recording = swap;
  }


  public runSingleroll() {
    let swap = Boolean(this._recording);
    this._recording = false;
    let wagers = this._wagers.singleroll;
    for (let i in wagers) {
      if (!this.boxman.isBet(wagers[i].bet)) {
        this.boxman.bet(wagers[i].bet, wagers[i].val);
      }
    }
    this._recording = swap;
  }


  public runCome() {
    let swap = Boolean(this._recording);
    this._recording = false;
    let wagers = this._wagers.come;
    for (let i in wagers) {
      let bettype = wagers[i].bet;
      if (bettype === CrapsBets.ComeOdds || bettype === CrapsBets.DontcomeOdds) continue;
      if (!this.boxman.isBet(wagers[i].bet)) {
        this.boxman.bet(wagers[i].bet, wagers[i].val);
      }
    }
    this._recording = swap;
  }


  public runComeOdds(bet: CrapsBets) {
    let swap = Boolean(this._recording);
    this._recording = false;
    let wagers = this._wagers.come;
    for (let i in wagers) {
      let bettype = wagers[i].bet;
      if (bettype === CrapsBets.Come || bettype === CrapsBets.Dontcome) continue;
      if (!this.boxman.isBet(bet)) {
        this.boxman.bet(bet, wagers[i].val);
      }
    }
    this._recording = swap;
  }


  protected createSubscriptions() {
    this.boxman
        .events
        .bet
        .map((betevent: BetEvent) => {
          this.onBetEvent(betevent);
        })
        .subscribe();

    this.stickman
        .events
        .dice
        .map((dice: Dice) => {
          this.onDice(dice);
          // this._replay.next(Object.assign({}, dice));
        })
        .subscribe();


    Observable.merge(this.stickman.events.sevenout,
                     this.stickman.events.craps,
                     this.stickman.events.pointhit)
              .delay(400)
              .map((val: number) => {
                this.runPointoff();
              })
              .subscribe();

    this.stickman
        .events
        .point
        .filter((val: any) => {
          return val > 0;
        })
        .delay(300)
        .map((val: any) => {
          this.runPointon();
        })
        .subscribe();

    this.stickman
        .events
        .rake
        .map(() => {
          this.runSingleroll();
          if (this.stickman.point !== 0) {
            this.runCome();
          }
        })
        .subscribe();


  }

}
