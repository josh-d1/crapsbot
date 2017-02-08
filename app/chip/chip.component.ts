import {
  Component,
  Input,
} from '@angular/core';

import {blankpng} from '../shared/blankpng';

@Component({
             selector: 'chip',
             templateUrl: '/app/chip/chip.component.html',
             styleUrls: ['app/chip/chip.component.css'],
             host: {
               '[class.one]': "val === '1'",
               '[class.five]': "val === '5'",
               '[class.twentyfive]': "val === '25'",
               '[class.odds]': "type === 'odds'",
               '[class.winbet]': "type === 'win'",
             }
           })
export class ChipComponent {
  @Input()
  val: string;

  @Input()
  type: string;

}
