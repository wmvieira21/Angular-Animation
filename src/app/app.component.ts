import { trigger, state, transition, style, animate, animation, keyframes, group } from '@angular/animations';
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
        //initial style 
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

    //transition for steps (keyframes) offsets between 0 and 1
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),

      transition('void => *', [
        animate(1000, keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0 //wich time in this 1000ms we shoud be in this state;
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(-50px)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateX(-20px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 1
          }),
        ]))
      ]),

      /*transition('* => void', [
        style({
          color: 'red',
          backgroundColor: 'blue'
        }),
        animate(5000, keyframes([
          style({
            opacity: 1,
            transform: 'translateX(100px)',
            offset: 0.3
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(200px)',
            offset: 0.6
          }),
          style({
            opacity: 0,
            transform: 'translateX(300px)',
            offset: 0.9
          })
        ]))
      ]),*/

      //group apply multiple animation at the same time.
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(800, style({
            opacity: 0,
            transform: 'translateX(300px)',
          }))
        ])
      ])
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

  animationStart(event: any) {
    console.log(event);
  }
  animationEnded(event: any) {
    console.log(event);
  }
}
