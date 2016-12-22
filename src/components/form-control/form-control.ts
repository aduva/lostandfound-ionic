import {
  Component, OnChanges, Input,
  trigger, state, animate, transition, style, keyframes
} from '@angular/core';

@Component({
  selector: 'form-control',
  templateUrl: 'form-control.html',
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false' , style({ opacity: 0 })),
      transition('0 => 1', [
        animate('400ms ease-in', keyframes([
          style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
          style({opacity: 0.7, transform: 'translateY(-15px)',  offset: 0.5}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('1 => 0', [
        animate('300ms', keyframes([
          style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateY(15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class FormControlComponent {
  @Input() isVisible : boolean = false;
  constructor() {
  }

}
