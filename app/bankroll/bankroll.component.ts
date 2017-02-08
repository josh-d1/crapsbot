import {
  Component,
  ElementRef,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import {AnimeChipComponent} from '../chip/anime-chip.component';
import {CrapsBets} from '../shared/crapsbets.model';
import {Stickman} from '../shared/stickman.service';
import {Boxman} from '../shared/boxman.service';

import {chips} from '../animation/chips.animation';


@Component({
             selector: 'bankroll',
             templateUrl: '/app/bankroll/bankroll.component.html',
             styleUrls: ['app/bankroll/bankroll.component.css'],
             animations: [chips],
           })
export class BankrollComponent {
  private chipComponent: ComponentFactory<AnimeChipComponent>;

  @ViewChild('tray1', {read: ViewContainerRef})
  private tray1: ViewContainerRef;
  @ViewChild('tray2', {read: ViewContainerRef})
  private tray2: ViewContainerRef;
  @ViewChild('tray3', {read: ViewContainerRef})
  private tray3: ViewContainerRef;

  constructor(protected stickman: Stickman,
              protected boxman: Boxman,
              private elemRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.chipComponent = this.componentFactoryResolver
                             .resolveComponentFactory(AnimeChipComponent);
    // this.boxman
    //     .events
    //     .win
    //     .map((bet: CrapsBets, val: number) => {
    //       this.winChips(val);
    //     })
    //     .subscribe();
  }

  winChips(amount: number) {
    if (amount === 0) {
      return;
    }

    let step = amount;
    let index = 0;
    do {
      let delta =
        (() => {
          let val = (step -25 >= 0 && 25) ||
            (step - 5 >= 0 && 5) ||
            1;
          let slot = index % 3;

          setTimeout(() => {
                       let tray: ViewContainerRef;
                       switch (slot) {
                         case 0:
                           tray = this.tray1;
                           break;

                         case 1:
                           tray = this.tray2;
                           break;

                         case 2:
                           tray = this.tray3;
                           break;
                       }
                       let chip2 = tray.createComponent(this.chipComponent);
                       chip2.instance.chip = val;
                       chip2.instance.componentRef = chip2;
                     },
                     index * 150);

          return val;
        })();

      step -= delta;
      ++index;
    } while (step > 0);
  }

}
