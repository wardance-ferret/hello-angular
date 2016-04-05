/** 
The heroes component for hello-angular.
-knows which hero is selected in the list, and which hero to show
 */
import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail-component';
//after we refactored, both heroes-components and app-component
//know what a HeroService is but there is just one copy of that HeroService,
//
import {HeroService} from './mock-hero.service';

//var title = 'Some Unrelated Title for Checking Scope';
    //notice the {{}} for one-way data binding
    //notice the * prefix for a directive, it gives a special status to the 
    //element marked with the directive and child nodes.  ngIf, ngFor and other structural directives change the structure of the DOM
    //Event bind or "($event)": when user clicks on list item, the component must have an onSelect method defined. angular event bindings will respond to any DOM event
    //we're not done with the list
    //Property bind or "[$property]:"  we bind a boolean expression "hero === selectedHero" to the name of the CSS class, selected.  which way does data flow?  if the model says that that particular hero is selected, then the value of true flows from the model to the view.  This bind is a property bind.
    //I use directives to register my own custom directives
    //<my-hero-detail> tag means that HeroesComponent creates a child instance of HeroDetailComponent (huh? you mean it's own private object of that class??). 
    //when I use providers to register services, I'm telling Angular to provide a fresh service whenever it creates a new HeroesComponent.
    //I can call getHeroes() on initialization of HeroesComponent (WITHOUT CALLING CONSTRUCTOR) by adding this.getHeroes() to the impl of the ngOnInit lifecycle hook
    //the problem is that getting json back from the service could take a while, and we don't want the browser to have to wait...so the service needs to make a promise (I'll call back later when my results are ready), and the caller needs to act on the promise.

@Component({
    //note how we use a comma for a property on a decorator
    selector: 'my-heroes',
    template: `
              <h1>{{title}}</h1>
              <h2>HEROES</h2>
              <ul class="items">
                 <li *ngFor="#hero of asArray(heroes)" 
                  [class.myselected]="hero === selectedHero"
                 (click)="onSelect(hero)"
                 >
                   <span class="badge">{{hero.id}}</span> {{hero.name}}
                 </li>
              </ul>
              <my-hero-detail [hero]="selectedHero"></my-hero-detail>
                `,
    //styles for my-heroes, the component!
    styles:[`
            .myselected {
                background-color: #CFD8DC !important;
                color: white;
              }
              .heroes {
                margin: 0 0 2em 0;
                list-style-type: none;
                padding: 0;
                width: 15em;
              }
              .heroes li {
                cursor: pointer;
                position: relative;
                left: 0;
                background-color: #EEE;
                margin: .5em;
                padding: .3em 0;
                height: 1.6em;
                border-radius: 4px;
              }
              .heroes li.myselected:hover {
                background-color: #BBD8DC !important;
                color: white;
              }
              .heroes li:hover {
                color: #607D8B;
                background-color: #DDD;
                left: .1em;
              }
              .heroes .text {
                position: relative;
                top: -3px;
              }
              .heroes .badge {
                display: inline-block;
                font-size: small;
                color: white;
                padding: 0.8em 0.7em 0 0.7em;
                background-color: #607D8B;
                line-height: 1em;
                position: relative;
                left: -1px;
                top: -4px;
                height: 1.8em;
                margin-right: .8em;
                border-radius: 4px 0 0 4px;
              }
    `],
    directives: [HeroDetailComponent]
    //the service HeroService was promoted from HeroesComponent to AppComponent, so I commented this out so angular doesn't create a 2nd copy of the service
    //providers: [HeroService] 
})
//this means to export a TypeScript class definition
    //we defined a static property that had a value before the user typed anything in, but we don't need
    //hero: Hero = {
    //    name: 'Firestorm',
    //    id: 1,
    //};
export class HeroListComponent implements OnInit {

    //this is a property
    title = 'Tour of Heroes:\n';
    
    //the heroes records the selected hero
    selectedHero: Hero;

    //here's a property to bind the heroes to the component
    //TypeScript will infer the type based on what's assigned to it (in the back of our minds, not in black and white, we imagine this is an array)
    //public heroes;
    heroes: Hero[];


    onSelect(hero: Hero) { 
      //this.selectedHero = hero; this.title = 'Tour of Heroes:\n'+hero.name;
      //the router needs a destination and the (required) route params and the (optional) query params.
      //it looks like the HeroDetailComponent is implied by HeroDetail.
      this._router.navigate(['HeroDetail', { id:hero.id }]);
    }

    /**
    *the router uses a routeParams service to extract the val of the route parameter "id" and give it to the HeroDetailComponent.
    *
    */
    constructor(
      private _heroService: HeroService,
      private _routeParams
      private _router: Router
    ){}

    //do not invoke getHeroes in the constructor
    getHeroes() {
        this.heroes = this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);    
    }

    ngOnInit(){
        this.getHeroes();
    }

    asArray(val){
       return Array.from(val);
    }
}