import {
  Component,
  Input,
} from '@angular/core';
import {Stickman} from '../shared/stickman.service';

@Component({
             selector: 'table-button',
             templateUrl: './point-button.component.html',
             styleUrls: ['./point-button.component.css'],
             host: {
               '[class.inactive]': "stickman.point === 0",
               '[class.active]': "stickman.point !== 0",
             }
           })
export class PointButtonComponent {
  constructor(protected stickman: Stickman) {}
}
