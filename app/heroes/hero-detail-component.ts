/** hero-detail.component.ts */
//2 decorators, import like classes, which suggests the Decorator pattern.
import {Component, Input} from 'angular2/core';
//import class
import {Hero} from './hero';

@Component({
    selector: 'my-hero-detail',
    template: `
              <div *ngIf="hero">
                  <h2>{{hero.name}} details!</h2>
                  <div><label>id: </label>{{hero.id}}</div>
                  <div>
                  <label>name: </label>
                  <input [(ngModel)]="hero.name" placeholder="name">
                  </div>
              </div>
    `,
})

export class HeroDetailComponent{
    //https://angular.io/docs/ts/latest/guide/attribute-directives.html#!#input
    //leaving off parens results in an undiagnosable error and compiler doesn't notice
    @Input()
    hero: Hero;
}