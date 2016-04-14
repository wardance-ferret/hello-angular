import {Component, OnInit, Input} from 'angular2/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { RouteParams, CanActivate } from 'angular2/router';
import { tokenNotExpired } from 'angular2-jwt';

//add decoration

@Component({
    selector: 'my-secret-hero-detail',
    templateUrl: 'app/hero-detail.component.html'
}
)
@CanActivate(() => tokenNotExpired())
export class SecretHeroDetailComponent implements OnInit{
    
    @Input()
    hero: Hero;

    constructor(
        private _heroService : HeroService,
        private _routeParams: RouteParams
    ){}

    ngOnInit(){
        let id = +this._routeParams.get('id');
        this._heroService.getSecretHero(id)
        .map(res => res.json())
        .subscribe(
            data => this.hero = data,
            error => console.log(error)
        );
    }

    //pop the pushed browser history state 
    goBack(){
        window.history.back();
    }

}