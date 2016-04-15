/** hero-detail.component.ts */
//2 decorators, import like classes, which suggests the Decorator pattern.
import {Component, Input, OnInit} from 'angular2/core';
//import class
import {Hero} from './hero';
import {HeroService} from './hero.service'
import {RouteParams} from 'angular2/router';

//(1) OUT WITH THE OLD:  This template shows a property binding ('[]') from the parent component (Hero) to HeroDetailComponent
//@Input() is related to the two-way bound input element in this template. 
@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/heroes/hero-detail.component.html',
})

export class HeroDetailComponent implements OnInit{

    //consumers of directive HeroDetailComponent can only bind to the property of our public API
    @Input()
    hero: Hero;
    //(1) IN WITH NEW:  HDC should get id from the RouteParameters service and fetch that hero from storage

    //(1) inject the dependencies
    constructor(
      private _heroService: HeroService,
      private _routeParams: RouteParams){}
    
    ngOnInit(){
      //BTW: convert string to number with operator '+'
      let id = +this._routeParams.get('id');
      this._heroService.getHero(id)
          .map(res => res.json())
          .subscribe(
            data => this.hero = data,
            error => console.log(error)
          );
    }

    //pop the pushed state of browser history
    goBack() {
      window.history.back();
    }

}

/**
    @Input - //https://angular.io/docs/ts/latest/guide/attribute-directives.html#!#input
    //leaving off parens results in an undiagnosable error and compiler doesn't notice
    //what does this do?

*/