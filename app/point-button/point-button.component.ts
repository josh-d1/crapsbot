import {
  Component,
  Input,
} from '@angular/core';
import {Stickman} from '../shared/stickman.service';

@Component({
             selector: 'table-button',
             templateUrl: '/app/point-button/point-button.component.html',
             styleUrls: ['app/point-button/point-button.component.css'],
             host: {
               '[class.inactive]': "stickman.point === 0",
               '[class.active]': "stickman.point !== 0",
             }
           })
export class PointButtonComponent {
  constructor(protected stickman: Stickman) {}
}
