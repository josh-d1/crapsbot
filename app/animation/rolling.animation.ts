import {
  animate,
  keyframes,
  group,
  style,
  trigger,
  transition,
} from '@angular/core';

export let rolling = trigger('rolling', [
  transition('* <=> *', [
    animate('.3s ease-out', keyframes([
                                        style({offset: 0, transform: 'rotate(0deg) scale(.9)' }),
                                        style({offset: 1, transform: 'rotate(360deg) scale(3)' })
                                      ])),
  ])
]);
