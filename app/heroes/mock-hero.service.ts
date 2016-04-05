/**
    mock-hero.service.ts
    use this class to inject a dependency

 */
import {Injectable} from 'angular2/core';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {

    //changing this implementation doesn't require us to change the consumers of heroes!
    //the service does some work, and we implicitly give it a "callback" function so it
    //can call us back when it gets results
    getHeroes(){
        return Promise.resolve(HEROES);
    }

    getHeroesSlowly(){
      return new Promise<Hero[]>(resolve=>setTimeout(()=>resolve(HEROES), 2000))
    }

}