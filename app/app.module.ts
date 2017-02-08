import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {WebWorkerService} from 'angular2-web-worker/web-worker';
import {DndModule} from 'ng2-dnd';
import {Ng2Webstorage} from 'ng2-webstorage';

import {AnimeChipComponent} from './chip/anime-chip.component';
import {AppComponent}  from './app.component';
import {BankrollComponent} from './bankroll/bankroll.component';
import {BuyboxComponent} from './table/buybox/buybox.component';
import {ChipComponent} from './chip/chip.component';
import {ComeComponent} from './table/come/come.component';
import {CrapsbotComponent} from './crapsbot/crapsbot.component';
import {DontcomeComponent} from './table/dont-come/dont-come.component';
import {FieldComponent} from './table/field/field.component';
import {LayboxComponent} from './table/laybox/laybox.component';
import {NopasslineComponent} from './table/nopassline/nopassline.component';
import {PasslineComponent} from './table/passline/passline.component';
import {PlaceboxComponent} from './table/placebox/placebox.component';
import {PointboxesComponent} from './table/pointboxes/pointboxes.component';
import {PointButtonComponent} from './point-button/point-button.component';
import {TableComponent} from './table/table.component';

import {Boxman} from './shared/boxman.service';
import {Brain} from './shared/brain.service';
import {Dice} from './shared/dice.service';
import {LoadedDice} from './shared/loaded-dice.service';
import {Stickman} from './shared/stickman.service';
import {MagicDice} from './shared/magic-dice';


@NgModule({
            imports: [
              BrowserModule,
              DndModule.forRoot(),
              Ng2Webstorage,
            ],
            declarations: [
              AnimeChipComponent,
              AppComponent,
              BankrollComponent,
              BuyboxComponent,
              ChipComponent,
              ComeComponent,
              CrapsbotComponent,
              DontcomeComponent,
              FieldComponent,
              LayboxComponent,
              NopasslineComponent,
              PasslineComponent,
              PlaceboxComponent,
              PointboxesComponent,
              PointButtonComponent,
              TableComponent,
            ],
            entryComponents: [
              AnimeChipComponent,
              ChipComponent,
            ],
            providers: [
              Boxman,
              Brain,
              Dice,
              LoadedDice,
              MagicDice,
              Stickman,
              WebWorkerService,
            ],
            bootstrap:    [ AppComponent ]
          })
export class AppModule { }
