/** dashboard.component.ts */
import {Component, OnInit} from 'angular2/core';
//we want to use the singleton HeroService
import {Hero} from './heroes/hero';
import {HeroService} from './heroes/hero.service';
import {Router} from 'angular2/router';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',

})

export class DashboardComponent implements OnInit{
    heroes: Hero[]=[];
    constructor(
        private _router: Router,
        private _heroService : HeroService){}


    ngOnInit() {
        this._heroService.getHeroes()
        .map(resp => resp.json())
        .subscribe(
            data => this.heroes = data.slice(1,5),
            error => console.log(error)
        );    
    }

    gotoDetail(hero: Hero){ 
        let link = ['HeroDetail', {id: hero.id}];
        this._router.navigate(link);
    }

}

/**
Notes:
//it seems like we're initializing a decorator object with a json object (define this somewhere)
//use templateUrl property to point to a new template file
//note: our templateUrl must go all the way back to app, it cannot be relative

//learn:  good use of arrow => functions (i.e. anonymous functions).  the result is bound to the "this" object.

*/