import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  AnimationMetadata
} from '@angular/core';

import {place} from '../shared/craps-rolls';

// let posx = 11;
// let states: AnimationMetadata[] = place.map((val, index) => {
//   let _x = posx;
//   posx += 13;
//
//   return state(val.toString(),
//                style({
//                        transform: 'translate(' + _x + 'vw, 20vh)',
//                      }));
// });
//
// states.push(state('0',
//                   style({
//                           transform: 'translate(0, 20vh)',
//                         })
// ));

let states: AnimationMetadata[] = [
  state('0', style({ transform: 'translate(0, 15vh)' })),
  state('4', style({ transform: 'translate(9vw, 23vh'})),
  state('5', style({ transform: 'translate(23vw, 23vh'})),
  state('6', style({ transform: 'translate(36vw, 23vh'})),
  state('8', style({ transform: 'translate(50vw, 23vh'})),
  state('9', style({ transform: 'translate(64vw, 23vh'})),
  state('10', style({ transform: 'translate(78vw, 23vh'})),
];


let transitions: AnimationMetadata[] = [4,5,6,8,9,10].map((val, index) => {
  return transition('* => ' + val.toString(),
                    [
                      animate('.6s ease-out',
                              keyframes([
                                          style({ offset: 1 })
                                        ]),
                      )
                    ]);
});
transitions.push(
  transition('* => 0',
             [
               animate('.6s ease-out',
                       keyframes([
                                   style({offset: 1 })
                                 ])
               ),
             ])
);


export let pointbuttonslider = trigger('pointbuttonslider',
                                       states.concat(transitions));

