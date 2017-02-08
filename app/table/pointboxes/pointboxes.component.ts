import {Component} from '@angular/core';
import {Stickman} from '../../shared/stickman.service';
import {hotzone} from '../../shared/hotzone';
import {pointbuttonslider} from '../../animation/pointbutton-slider.animation';

@Component({
             selector: 'table-pointboxes',
             templateUrl: 'app/table/pointboxes/pointboxes.component.html',
             styleUrls: ['app/table/pointboxes/pointboxes.component.css'],
             animations: [hotzone, pointbuttonslider],
           })
export class PointboxesComponent {
  private point: number = 0;
  private zones: any;

  constructor(private stickman: Stickman) {
    this.zones = this.resetZones();
  }

  private resetZones() {
    return {
      4: 'inactive',
      5: 'inactive',
      6: 'inactive',
      8: 'inactive',
      9: 'inactive',
      10: 'inactive',
    };
  }

  ngOnInit() {
    this.stickman
        .events
        .rolling
        .map(() => {
          this.zones = this.resetZones();
        })
        .subscribe();

    this.stickman
        .events
        .place
        .map((val: number) => {
          this.zones = this.resetZones();
          this.zones[val] = 'active';
        })
        .subscribe();

    this.stickman
        .events
        .pointhit
        .map((val: number) => {
          this.zones = this.resetZones();
          this.zones[this.point] = 'active';
        })
        .subscribe();

    this.stickman
        .events
        .point
        .map((point: number) => {
          this.point = point;
        })
        .subscribe();

    this.stickman
      .events
      .sevenout
      .map(() => {
        this.zones = this.resetZones();
        this.point = 0;
      })
      .subscribe();
  }
}
