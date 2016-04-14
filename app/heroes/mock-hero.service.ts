/**
    mock-hero.service.ts
    use this class to inject a dependency

 */
import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {

    //changing this implementation doesn't require us to change the consumers of heroes!
    //the service does some work, and we implicitly give it a "callback" function so it
    //can call us back when it gets results
    getHeroes(){
        return Promise.resolve(HEROES);
    }

    //(1) IN WITH THE NEW:  service will return a single hero, get all objects (models) and filter on hero.id
    getHero(id: number){
        return Promise.resolve(HEROES).then(heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }

    //next step is to mock up an http service returning json, not just use this fake timeout.
    getHeroesSlowly(){
      return new Promise<Hero[]>(resolve=>setTimeout(()=>resolve(HEROES), 2000))
    }

}