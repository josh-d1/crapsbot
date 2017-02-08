export abstract class Wager {
  private _odds: number = 0;
  private _bet: number = 0;
  private _nodds: number = 0;

  clearbet() {
    this._bet = 0;
  }

  clearodds() {
    this._odds = 0;
  }

  clearnodds() {
    this._nodds = 0;
  }

  addbet(val: number|string) {
    let temp = Number(val);
    this._bet = this._bet + temp;
  }

  add_odds(val: number|string) {
    let _val = Number(val);
    if (this._odds + _val <= this.oddslimit) {
      this._odds += _val;
      return true;
    }
    return false;
  }

  add_nodds(val: number = 0) {
    if (val > 0) {
      this._nodds = val;
    } else {
      ++this._nodds;
    }
  }

  win() {
  }

  lose() {
    this._bet = 0;
    this._odds = 0;
  }

  get total(): number {
    return this._bet;
  }

  get odds(): number {
    return this._odds;
  }

  get nodds(): number {
    return this._nodds;
  }

  get oddslimit(): number {
    return this._bet * 10;
  }

}
