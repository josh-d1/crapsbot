import {CrapsBets} from './crapsbets.model';

export class BetEvent {
  constructor(public bet: CrapsBets,
              public val: number,
              public anime: boolean = true) {}
}
