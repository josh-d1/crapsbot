import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  AnimationMetadata,
  group
} from '@angular/core';

let shakeframes = keyframes([
                              style({
                                      offset: 0,
                                      transform: 'translate(-2px, 0)',
                                    }),
                              style({
                                      offset: .2,
                                      transform: 'translate(4px, 2px)',
                                    }),
                              style({
                                      offset: .3,
                                      transform: 'translate(-8px, -4px)',
                                    }),
                              style({
                                      offset: .4,
                                      transform: 'translate(8px, 4px)',
                                    }),
                              style({
                                      offset: .5,
                                      transform: 'translate(-8px, 4px)',
                                    }),
                              style({
                                      offset: .6,
                                      transform: 'translate(8px, -4px)',
                                    }),
                              style({
                                      offset: .7,
                                      transform: 'translate(-8px, -4px)',
                                    }),
                              style({
                                      offset: .8,
                                      transform: 'translate(-4px, -2px)',
                                    }),
                              style({
                                      offset: .9,
                                      transform: 'translate(-2px, 0)',
                                    }),
                              style({
                                      offset: 1,
                                      transform: 'translate(0, 0)',
                                    })
                            ]);

let coinflip = keyframes([
                            style({
                                    offset: .25,
                                    transform: 'translateY(-15vh) scale(.05, 1) rotate(80deg)',
                                  }),
                            style({
                                    offset: .5,
                                    transform: 'translateY(-40vh) scale(1, 1) rotate(165deg)',
                                  }),
                            style({
                                    offset: .75,
                                    transform: 'translateY(-15vh) scale(.05, 1) rotate(300deg)',
                                  }),
                            style({
                                    offset: 1,
                                    transform: 'translateY(0) scale(1, 1) rotate(360deg)',
                                  })
                         ]);

let rain = keyframes([

                       style({
                               offset: 0,
                               transform: 'translateY(-60vh)',
                             }),
                       style({
                               offset: 1,
                               transform: 'translateY(-10vh)',
                             }),
                     ]);

let lose = keyframes([
                       style({
                               offset: .1,
                               transform: 'scale(.2) translateY(0)',
                             }),
                       style({
                               offset: .3,
                               transform: 'scale(.9) translateY(-50%)',
                             }),
                       style({
                               offset: .5,
                               transform: 'scale(.2)  translateY(-100%)',
                             }),
                       style({
                               offset: .7,
                               transform: 'scale(1)  translateY(-200%)',
                               opacity: '.6',
                             }),
                       style({
                               offset: 1,
                               transform: 'scale(1.5) translateY(-400%)',
                               opacity: '0',
                             }),
                     ]);

let newbet = keyframes([
                         style({
                                 offset: 0,
                                 transform: 'translate(-2vw, 100%)',
                                 opacity: '.6',
                               }),
                         style({
                                 offset: 1,
                                 transform: 'translate(0, 0)',
                                 opacity: '1',
                               })
                       ]);

let payout = keyframes([
                         style({
                                 offset: 0,
                                 transform: 'translateY(-30vh)',
                                 opacity: '.6',
                               }),
                         style({
                                 offset: .5,
                                 transform: 'translateY(0)',
                                 opacity: '1',
                               }),
                         style({
                                 offset: 1,
                                 opacity: '0',
                               }),
                       ]);

let getback = keyframes([
                          style({
                                  offset: 1,
                                  transform: 'translate(-2em, 3em)',
                                  opacity: '0',
                                })
                        ]);

let buyboxslide = keyframes([
                              style({
                                      offset: 0,
                                      transform: 'translate(400%, 0)'
                                    }),
                              style({
                                      offset: 1,
                                      transform: 'translate(0, 0)'
                                    })
                            ]);

let layboxslide = keyframes([
                              style({
                                      offset: 0,
                                      transform: 'translate(-400%, 0)'
                                    }),
                              style({
                                      offset: 1,
                                      transform: 'translate(0, 0)'
                                    })
                            ]);


export let chips = trigger('chips',
                           [
                             transition('* => win',
                                        [
                                          style({ willChange: 'translate'}),
                                          animate('.82s cubic-bezier(.36,.07,.19,.97) both',
                                                  shakeframes),
                                          style({ willChange: 'auto'}),
                                        ]),
                             transition('* => lose',
                                        [
                                          animate('.6s ease-out', lose),
                                        ]),
                             transition('* => addbank',
                                        [
                                          // style({ boxShadow: '0px 0px 25px 8px rgba(255, 248, 42, .8), 0px 0px 50px 16px rgba(255, 255, 255, .5)'}),
                                          animate('1s ease-in-out', coinflip),
                                        ]),
                             transition('* => rain',
                                        [
                                          animate('.5s ease-out', rain),
                                        ]),
                             transition('* => newbet',
                                        [
                                          style({ willChange: 'translate, opacity'}),
                                          animate('.4s ease-out', newbet),
                                          style({ willChange: 'auto', opacity: '1'}),
                                        ]),
                             transition('* => payout',
                                        [
                                          style({ willChange: 'translate, opacity'}),
                                          animate('.7s ease-in-out', payout),
                                          style({ willChange: 'auto'}),
                                        ]),
                             transition('* => getback',
                                        [
                                          style({ willChange: 'translate, opacity'}),
                                          animate('.4s ease-in', getback),
                                          style({ willChange: 'auto'}),
                                        ]),
                             transition('* => buyboxslide',
                                        [
                                          style({ willChange: 'translate, opacity'}),
                                          animate('.4s ease-out', buyboxslide),
                                          style({ willChange: 'auto'}),
                                        ]),
                             transition('* => layboxslide',
                                        [
                                          style({ willChange: 'translate, opacity'}),
                                          animate('.4s ease-out', layboxslide),
                                          style({ willChange: 'auto'}),
                                        ]),
                           ]);


