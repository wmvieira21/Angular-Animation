import { trigger, state, transition, style, animate, animation, keyframes } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { delay } from 'rxjs';

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
        'background-color': 'grey',
        transform: 'translateX(0) scale(1)'
      })),

      state('highlight', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),

      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),

      transition('normal <=> highlight', animate(300)),

      transition('shrunken <=>*', [
        style({ 'background-color': 'black' }),
        animate(3000, keyframes(
          [
            style({ 'border-radius': '50px' })
          ])),
        animate(2000)
      ])
    ]),

    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void =>*', [
        style({
          opacity: 0,
          transform: 'translateX(-150px)'
        }),
        animate(1000)
      ]),
      transition('* => void', animate(1000,
        style({
          opacity: 0,
          transform: 'translateX(300px)'
        }))
      )
    ]),

    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void =>*', [
        style({
          opacity: 0,
          transform: 'translateX(-150px)'
        }),
        animate(1000)
      ]),
      transition('* => void', animate(1000,
        style({
          opacity: 0,
          transform: 'translateX(300px)'
        }))
      )
    ])
  ]
})

export class AppComponent {
  title = 'Angular-Animation';
  state = 'normal';
  wildState = 'normal';
  list = ['milk', 'suger', 'bread'];
  @ViewChild('ingredient') ingredient: ElementRef;

  onAnimation() {
    this.state = (this.state == 'normal' ? 'highlight' : 'normal');
    this.wildState = (this.wildState == 'normal' ? 'highlight' : 'normal');
  }
  onShrink() {
    this.wildState = 'shrunken';
  }

  onAddIngredient() {
    this.list.push(this.ingredient.nativeElement.value);
  }
  deleteItem(index: number) {
    this.list.splice(index, 1);
  }
}
