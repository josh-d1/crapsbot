import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/core';

export let pulse = animate('.2s ease-in',
                    keyframes([
                                style({
                                        offset: 0,
                                        transform: 'scale(.9)',
                                        opacity: .5,
                                      }),
                                style({
                                        offset: .5,
                                        opacity: 1,
                                      }),
                                style({
                                        offset: .5,
                                        transform: 'scale(1.3)',
                                        opacity: 1
                                      })
                              ]),
                    );


export let hotzone = trigger('hotzone', [
  state('inactive', style({
                            backgroundColor: 'transparent'
                          })),
  state('active', style({
                          backgroundColor: 'rgba(69,162,242,.8)'
                        })),
  state('push', style({
                        backgroundColor: 'rgba(255, 255, 0, .8)'
                      })),
  state('dropzone', style({
                            backgroundColor: 'rgba(0, 255, 51, .8)',
                            // transform: 'scale(1.02, 1.07)',
                            boxShadow: '2px 1px 2px 1px rgba(0, 0, 0, .2)',
                            color: 'rgba(0, 0, 0, .5)',
                          })),
  state('invalid', style({
                           backgroundColor: 'rgba(255, 0, 0, .5)',
                           transform: 'scale(1.01, 1.1)',
                           color: 'rgba(255, 255, 255, .8)',
                         })),
  transition('* => active',
             [
               animate('.2s ease-in'),
             ]),
  transition('* => inactive',
             [
               animate('.2s ease-out'),
             ]),
  transition('* => push',
             [
               style({ backgroundColor: 'rgba(255, 255, 0, .8)' }),
               animate('.2s ease-in',
                       keyframes([
                                   style({
                                           offset: 0,
                                           transform: 'scale(.9)',
                                           opacity: .5,
                                         }),
                                   style({
                                           offset: 1,
                                           transform: 'scale(1.3)',
                                           opacity: 1
                                         })
                                 ]),
               )]),
  transition('* <=> dropzone',
             [
               animate('.1s ease')
             ]),
  transition('* <=> invalid',
             [
               animate('.1s ease')
             ]),
]);
