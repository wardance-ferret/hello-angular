/**1.  to setup the component with lifecycle hook */
import {Component, OnInit} from 'angular2/core';

/** 2.  to setup the routes, and the means to check whether a token is valid */
import { Router, CanActivate } from 'angular2/router';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

/**3.  this needs to be able to get Heros from a service and show details about the Heros.*/
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { SecretHeroDetailComponent } from './secret-hero-detail.component';


@Component(
    {
        selector: 'my-secret-heroes',
        templateUrl: 'app/heroes/heroes-list.component.html',
        styleUrls: ['app/heroes/heroes-list.css'],
        directives: [SecretHeroDetailComponent]
    }
)

@CanActivate(() => tokenNotExpired())
export class SecretHeroListComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
        private _router : Router,
        private _heroService : HeroService
    ){}

    getSecretHeroes(){
        this._heroService.getSecretHeroes()
        .map(res => res.json())
        .subscribe(
            data => this.heroes = data,
            error => console.log(error)
        );
    }

    ngOnInit(){
        this.getSecretHeroes();
    }

    onSelect(hero: Hero) { this.selectedHero = hero; }

    gotoDetail(){
        this._router.navigate(['SecretHeroDetail', {id : this.selectedHero.id}])
    }

    
}

/**
Notes:

@CanActivate - this is an angular2/router life cycle hook. 1) fire the hook 2) navigate to the route (3) instantiate the hook's component class.

Why do we need new components for the secure side? can't a single component check tokenNotExpired, by passing in a parameter


*/