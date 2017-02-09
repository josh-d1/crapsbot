import {
  Component,
  HostBinding,
  HostListener,
  ComponentRef,
} from '@angular/core';

import {chips} from '../animation/chips.animation';


@Component({
             selector: 'anime-chip',
             templateUrl: './anime-chip.component.html',
             styleUrls: ['./chip.component.css'],
             animations: [chips],
           })
export class AnimeChipComponent {
  @HostBinding('@chips')
  protected anime = 'rain';

  @HostBinding('class')
  protected chipval: string;

  componentRef: ComponentRef<AnimeChipComponent>;

  constructor() {
  }

  set chip(val: number) {
    switch (val) {
      case 1:
        this.chipval = 'one';
        break;

      case 5:
        this.chipval = 'five';
        break;

      case 25:
        this.chipval = 'twentyfive';
        break;
    }
  }

  @HostListener('click', ['$event'])
  protected click(event: any) {
    this.anime = 'addbank';
  }

  @HostListener('@chips.done', ['$event'])
  protected chipsReset(event: any) {
    this.anime = '';
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
