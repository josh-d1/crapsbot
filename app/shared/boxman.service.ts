import {
  Injectable,
  EventEmitter
} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BetEvent} from './betevent.model';
import {CrapsBets} from './crapsbets.model';
import {DummyBet} from './dummybet.model';
import {Stickman} from './stickman.service';
import {Wager} from './wager';

import {place} from './craps-rolls';


@Injectable()
export class Boxman {
  protected _total: number = 0;
  protected _winnings: number = 0;
  protected _losses: number = 0;
  protected _tally: number = 0;
  protected _ioc: any = {};
  events: any;


  constructor(protected stickman: Stickman) {
    this.events = {
      win: new EventEmitter<BetEvent>(),
      clear: new EventEmitter<BetEvent>(),
      bet: new EventEmitter<BetEvent>(),
      lose: new EventEmitter<BetEvent>(),
    };

    this.stickman
        .events
        .come
        .map((val: number) => {

        })
        .subscribe();

    this.stickman
        .events
        .comecraps
        .map((val: number) => {
          this.comecraps(val);
        })
        .subscribe();

    this.stickman
        .events
        .craps
        .map((val: number) => {
          this.craps(val);
        })
        .subscribe();

    this.stickman
        .events
        .field
        .map((val: number) => {
          this.field(val);
        })
        .subscribe();

    this.stickman
        .events
        .natural
        .map((val: number) => {
          this.natural(val);
        })
        .subscribe();

    this.stickman
        .events
        .place
        .map((val: number) => {
          this.place(val);
        })
        .subscribe();

    this.stickman
        .events
        .point
        .map((val: number) => {
          this.point(val);
        })
        .subscribe();

    this.stickman
        .events
        .pointhit
        .map((val: number) => {
          this.pointhit(val);
        })
        .subscribe();

    this.stickman
        .events
        .rake
        .map(() => {
          this._total = this._total + this._tally;
          this._winnings += this._tally;
        })
        .subscribe();

    this.stickman
        .events
        .rolling
        .map(() => {
          this._tally = 0;
        })
        .subscribe();

    this.stickman
        .events
        .sevenout
        .map((point: number) => {
          this.sevenout(point);
        })
        .subscribe();

  }


  register(type: CrapsBets, obj: Wager) {
    this._ioc[type] = obj;
  }


  protected fetch(type: CrapsBets): Wager {
    try {
      return this._ioc[type];
    } catch(ex) {
      return new DummyBet();
    }
  }


  isBet(type: CrapsBets): boolean {
    if (type >= CrapsBets.Buybox4Odds && type <= CrapsBets.Buybox10Odds) {
      let wager = this.fetch(type - 10);
      return wager && wager.odds > 0;
    }

    if (type === CrapsBets.PasslineOdds) {
      let wager = this.fetch(CrapsBets.Passline);
      return wager && wager.odds > 0;
    }

    let wager = this.fetch(type);
    return wager && wager.total > 0;
  }


  bet(type: CrapsBets, val: number|string, check: boolean = false) {
    let wager = this.fetch(type);
    val = Number(val);

    // let noddsWager = (point: number) => {
    //   let wager = this.fetch(CrapsBets.Nopassline);
    //   switch (point) {
    //     case 6:
    //     case 8:
    //       return wager.total * (6/5);
    //
    //     case 9:
    //     case 5:
    //       return wager.total * (3/2);
    //
    //     case 4:
    //     case 10:
    //       return wager.total * (2/1);
    //   }
    // };

    if (type === CrapsBets.Passline && this.stickman.point !== 0) {
      wager.add_odds(val);
      type = CrapsBets.PasslineOdds;
      this._total = this._total - val;
      this.events.bet.emit(new BetEvent(type, val));
      return;
    }
    else if (type === CrapsBets.PasslineOdds) {
      wager = this.fetch(CrapsBets.Passline);
      wager.add_odds(val);
      this._total = this._total - val;
      this.events.bet.emit(new BetEvent(type, val));
      return;
    }
    else if (type === CrapsBets.Nopassline && this.stickman.point !== 0) {
      let wager = this.fetch(CrapsBets.Nopassline);
      // auto-bridge odds bet
      let oddsbet = this.passlinewin(this.stickman.point, wager.total);
      wager.add_odds(oddsbet);
      wager.add_nodds();
      type = CrapsBets.NopasslineOdds;
      this._total -= oddsbet;
      this.events.bet.emit(new BetEvent(type, wager.nodds));
      return;
    }
    else if (type === CrapsBets.NopasslineOdds) {
      wager = this.fetch(CrapsBets.Nopassline);
      let oddsbet = this.passlinewin(this.stickman.point, wager.total) * (check ? val : 1);
      wager.add_odds(oddsbet);
      wager.add_nodds(val);
      this._total -= oddsbet;
      this.events.bet.emit(new BetEvent(type, oddsbet));
      return;
    }
    else if (type >= CrapsBets.Buybox4 && type <= CrapsBets.Buybox10) {
      wager = this.fetch(type);
      wager.add_odds(val);
      this._total -= val;
      this.events.bet.emit(new BetEvent(type + 10, val));
      return;
    }
    else if (type >= CrapsBets.Buybox4Odds && type <= CrapsBets.Buybox10Odds) {
      wager = this.fetch(type - 10);
      wager.add_odds(val);
      this._total -= val;
      this.events.bet.emit(new BetEvent(type, val));
      return;
    }
    else if (type >= CrapsBets.Laybox4 && type <= CrapsBets.Laybox10) {
      wager = this.fetch(type);
      let oddsbet = this.passlinewin(type - 1020, wager.total);
      wager.add_odds(oddsbet);
      wager.add_nodds();
      this.events.bet.emit(new BetEvent(type + 10, wager.nodds));
      return;
    }
    else if (type >= CrapsBets.Laybox4Odds && type <= CrapsBets.Laybox10Odds) {
      wager = this.fetch(type - 10);
      let oddsbet = this.passlinewin(type - 1030, wager.total) * (check ? val : 1);
      wager.add_odds(oddsbet);
      wager.add_nodds(val);
      this._total -= oddsbet;
      this.events.bet.emit(new BetEvent(type, val));
      return;
    }
    else if (type === this.stickman.point) {
      this.events.bet.emit(new BetEvent(type, val));
      return;
    }
    else {
      if (check) {
        let total = wager.total;
        if (total != val) {
          wager.addbet(val - total);
          this._total = this._total - val;
          this.events.bet.emit(new BetEvent(type, val));
        }
        else {
          this.events.bet.emit(new BetEvent(type, val, false));
        }
        return;
      }
      else {
        wager.addbet(val);
        this._total = this._total - val;
        this.events.bet.emit(new BetEvent(type, val));
        return;
      }

    }
  }


  getback(type: CrapsBets) {
    if (type === CrapsBets.PasslineOdds) {
      let wager = this.fetch(CrapsBets.Passline);
      if (wager.odds > 0) {
        this.events.clear.emit(new BetEvent(type, 0));
      }
      this._total += wager.odds;
      wager.clearodds();
      return;
    }
    else if (type === CrapsBets.NopasslineOdds) {
      let wager = this.fetch(CrapsBets.Nopassline);
      if (wager.odds > 0) {
        this.events.clear.emit(new BetEvent(type, 0));
      }
      this._total += wager.odds;
      wager.clearodds();
      return;
    }
    else if (type >= CrapsBets.Buybox4Odds && type <= CrapsBets.Buybox10Odds) {
      let wager = this.fetch(type - 10);
      if (wager.odds > 0) {
        this.events.clear.emit(new BetEvent(type, 0));
      }
      this._total += wager.odds;
      wager.clearodds();
      return;
    }
    else if (type >= CrapsBets.Laybox4Odds && type <= CrapsBets.Laybox10Odds) {
      let wager = this.fetch(type - 10);
      if (wager.odds > 0) {
        this.events.clear.emit(new BetEvent(type, 0));
      }
      this._total += wager.odds;
      wager.clearodds();
      return;
    }
    else {
      let wager = this.fetch(type);
      if (wager.total > 0) {
        this.events.clear.emit(new BetEvent(type, 0));
      }
      this._total += wager.total;
      wager.clearbet();
      return;
    }
  }


  get total(): number {
    return this._total;
  }


  get winnings(): number {
    return this._winnings;
  }


  protected passlinewin(point: number, val: number) {
    switch (point) {
      case 6:
      case 8:
        return val * (6/5);

      case 5:
      case 9:
        return val * (3/2);

      case 4:
      case 10:
        return val * 2;
    }
  }


  protected nopasswin(point: number, val: number) {
    switch (point) {
      case 6:
      case 8:
        return val * (5/6);

      case 5:
      case 9:
        return val * (2/3);

      case 4:
      case 10:
        return val * (1/2);
    }
  }




  protected movecome(point: number) {
    let bet = this.fetch(CrapsBets.Come);
    if (bet.total > 0) {
      let box = this.fetch(1000 + point);
      box.addbet(bet.total);
      this.events.bet.emit(new BetEvent(1000 + point, bet.total));
      bet.clearbet();
    }
  }


  protected movedontcome(point: number) {
    let bet = this.fetch(CrapsBets.Dontcome);
    if (bet.total > 0) {
      let box = this.fetch(1020 + point);
      box.addbet(bet.total);
      this.events.bet.emit(new BetEvent(1020 + point, bet.total));
      bet.clearbet();
    }
  }

  //
  // event handlers
  //
  protected come(val: number) {
    let bet = this.fetch(CrapsBets.Come);
    let win = bet.total;
    this.events.win.emit(new BetEvent(CrapsBets.Come, win));

    bet = this.fetch(CrapsBets.Dontcome);
    this.events.lose.emit(new BetEvent(CrapsBets.Dontcome, 0));
    bet.lose();
  }


  protected comecraps(val: number) {
    let bet = this.fetch(CrapsBets.Come);
    this.events.lose.emit(new BetEvent(CrapsBets.Come, bet.total));
    bet.clearbet();

    bet = this.fetch(CrapsBets.Dontcome);
    let win = bet.total;
    this.events.win.emit(new BetEvent(CrapsBets.Dontcome, bet.total));
    this._tally += win;
  }


  protected craps(val: number) {
    let bet = this.fetch(CrapsBets.Nopassline);
    let win = bet.total;
    this.events.win.emit(new BetEvent(CrapsBets.Nopassline, win));
    this._tally += win;
    bet = this.fetch(CrapsBets.Passline);
    bet.lose();
  }


  protected field(val: number) {
    let bet = this.fetch(CrapsBets.Field);
    if (val === 0) {
      this.events.lose.emit(new BetEvent(CrapsBets.Field, 0));
      bet.clearbet();
      return;
    }

    let payoff = ([2,12].indexOf(val) !== -1) ?
                 bet.total * 2 :
                 bet.total;
    this.events.win.emit(new BetEvent(CrapsBets.Field, payoff));
    this._tally += payoff;
  }


  protected natural(val:number) {
    let wager = this.fetch(CrapsBets.Passline);
    let win = wager.total;
    this.events.win.emit(new BetEvent(CrapsBets.Passline, win));
    this._tally += win;
    if (val === 11) return;

    place.forEach((box: number) => {
      wager = this.fetch(box + 1000);
      if (wager.total > 0) {
        this.getback(box + 1010);
        this.events.lose.emit(new BetEvent(box + 1000, 0));
        wager.clearbet();
      }
    });
  }


  protected place(point: number) {
    let bet = this.fetch(point);
    let payout = 0;
    switch (point) {
      case 6:
      case 8:
        payout = bet.total * (7/6);
        break;

      case 5:
      case 9:
        payout = bet.total * (7/5);
        break;

      case 4:
      case 10:
        payout = bet.total * (9/5);
        break;
    }
    this.events.win.emit(new BetEvent(point, payout));
    this._tally += payout;

    bet = this.fetch(1000 + point);
    if (bet.total > 0) {
      this._tally += bet.total;
      this.events.win.emit(new BetEvent(1000 + point, bet.total));
      let payout = this.passlinewin(point, bet.odds);
      this._tally += payout;
      this.events.win.emit(new BetEvent(1010 + point, payout));
      this.getback(1000 + point);
      this.getback(1010 + point);
    }

    // dontcome bets
    bet = this.fetch(1020 + point);
    if (bet) {
      if (bet.total > 0) {
        this.events.lose.emit(new BetEvent(1020 + point, 0));
      }
      bet.lose();
    }

    this.movecome(point);
    this.movedontcome(point);
  }


  protected point(point: number) {
    // place bet
    let wager = this.fetch(point);
    if (wager && wager.total > 0) {
      this.getback(point);
    }

    // come bets
    wager = this.fetch(1000 + point);
    if (wager && wager.total > 0) {
      this.events.win.emit(new BetEvent(1000 + point, wager.total));
      this._tally += wager.total;
      this.getback(1000 + point);
      this.getback(1010 + point);
    }

    // dontcome bets
    wager = this.fetch(1020 + point);
    if (wager) {
      if (wager.total > 0) {
        this.events.lose.emit(new BetEvent(1020 + point, 0));
      }
      wager.lose();
    }
  }


  protected pointhit(point: number) {
    let bet = this.fetch(CrapsBets.Passline);
    this._tally = this._tally + bet.total;
    this.events
        .win
        .emit(new BetEvent(CrapsBets.Passline, bet.total));
    let payout = this.passlinewin(point, bet.odds);
    this._tally += payout;
    this.events.win.emit(new BetEvent(CrapsBets.PasslineOdds, payout));
    this.getback(CrapsBets.PasslineOdds);

    bet = this.fetch(CrapsBets.Nopassline);
    this.events.lose.emit(new BetEvent(CrapsBets.Nopassline, 0));
    bet.lose();

    this.movecome(point);
    this.movedontcome(point);
  }


  protected sevenout(point: number) {
    let bet = this.fetch(CrapsBets.Nopassline);
    let payout = bet.total;
    this.events.win.emit(new BetEvent(CrapsBets.Nopassline, payout));
    this._tally += payout;
    payout = this.nopasswin(point, bet.odds);
    this.events.win.emit(new BetEvent(CrapsBets.NopasslineOdds, payout));
    this._tally += payout;
    this.getback(CrapsBets.NopasslineOdds);

    bet = this.fetch(CrapsBets.Dontcome);
    this.events.lose.emit(new BetEvent(CrapsBets.Dontcome, 0));
    bet.clearbet();

    place.forEach((val) => {
      bet = this.fetch(1020 + val);
      if (bet.total === 0) return;

      this.events.win.emit(new BetEvent(1020 + val, bet.total));
      this._tally += bet.total;
      payout = this.nopasswin(val, bet.odds);
      this.events.win.emit(new BetEvent(1030 + val, payout));
      this.getback(1020 + val);
      this.getback(1030 + val);
    });


    bet = this.fetch(CrapsBets.Come);
    this._tally += bet.total;
    this.events.win.emit(new BetEvent(CrapsBets.Come, bet.total));
    this.getback(CrapsBets.Come);

    bet = this.fetch(CrapsBets.Passline);
    this.events.lose.emit(new BetEvent(CrapsBets.Passline, 0));
    bet.lose();
    place.forEach((val) => {
      let betType: CrapsBets = val;
      bet = this.fetch(betType);
      if (bet.total > 0) {
        this.events.lose.emit(new BetEvent(betType, 0));
        bet.lose();
      }

      bet = this.fetch(val + 1000);
      if (bet.total > 0) {
        this.events.lose.emit(new BetEvent(val + 1000, 0));
        bet.lose();
      }
    });
  }

}
