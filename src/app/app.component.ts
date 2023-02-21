import { trigger, state, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlight', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlight', animate(600)),
      //transition('highlight => normal', animate(1000))
    ]),

    trigger('wildState', [
      state('normal', style({
        'background-color': 'yellow',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlight', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(100px) scale(0.5)'
      })),
      transition('normal => highlight', animate(300)),
      transition('highlight => normal', animate(800)),

      transitionn('shrunken <=> *', [
        animate(300, style({
          borderRadius: '50px'
        })),
        style({
          'background-color': 'black'
        })
      ],
        animate(500))
    ])
  ]
})
export class AppComponent {
  title = 'Angular-Animation';
  state = 'normal';
  wildState = 'normal';

  onAnimation() {
    this.state = (this.state === 'normal' ? 'highlight' : 'normal');
    this.wildState = (this.wildState === 'normal' ? 'highlight' : 'normal');
  }
  onShrink() {
    this.wildState = 'shrunken';
  }
}
