/** hero.service.ts 
    use this class to inject a dependency
*/
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';

//RXJS operators auto-retry an HTTP request if it fails
import 'rxjs/add/operator/map';
import { Hero } from './hero';

@Injectable()
export class HeroService {
    
    API_URL = 'http://localhost:3002/api';

    constructor(private http:Http, private authHttp:AuthHttp){

    }

    getHeroes(){
        return this.http.get(`${this.API_URL}/public/heroes`);
    }   

    getSecretHeroes(){
        return this.authHttp.get(`${this.API_URL}/secret/heroes`);
    }

    getHero(id: number){
        return this.http.get(`${this.API_URL}/public/heroes/${id}`);
    }

    getSecretHero(id : number){
        return this.authHttp.get(`${this.API_URL}/secret/heroes/${id}`);    
    }

}