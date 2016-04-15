/** 
The heroes component for hello-angular.
-knows which hero is selected in the list, and which hero to show
 */
import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
//after we refactored, both heroes-components and app-component
//know what a HeroService is but there is just one copy of that HeroService,
//
import {Router, RouteParams} from 'angular2/router';

import {HeroService} from './hero.service';

//var title = 'Some Unrelated Title for Checking Scope';

@Component({
    //note how we use a comma for a property on a decorator
    selector: 'my-heroes',
    templateUrl: 'app/heroes/heroes-list.component.html',
    styleUrls: ['app/heroes/heroes-list.css'],
    directives: [HeroDetailComponent]

})



//export a TypeScript class definition, namespaces don't apply    
export class HeroListComponent implements OnInit {

    //this is a property
    title = 'Tour of Heroes:\n';
    
    //the heroes records the selected hero
    selectedHero: Hero;

    //here's a property to bind the heroes to the component
    heroes: Hero[];

    onSelect(hero: Hero) { 
      this.selectedHero = hero;
    }

    /**
    *the router uses a routeParams service to extract the val of the route parameter "id" and give it to the HeroDetailComponent.
    *
    */
    constructor(
      private _heroService: HeroService,
      private _routeParams: RouteParams,
      private _router: Router
    ){}

    //do not invoke getHeroes in the constructor
    getHeroes() {
        this._heroService.getHeroes()
        .map(response => response.json())
        .subscribe(
            data => this.heroes = data,
            error => console.log(error)
        );    
    }

    ngOnInit(){
        this.getHeroes();
    }


    gotoDetail(){
      this._router.navigate(['HeroDetail', { id:this.selectedHero.id }]);
    }

}


/**
Notes:
    //the service HeroService was promoted from HeroesComponent to AppComponent, so I commented the next line out.  Doing this ensures that Angular treats the HeroService instance as a singleton, available to all components.
    //providers: [HeroService] 

    //Previously we defined a static property that had a value before the user typed anything in, but we didn't need it
    //hero: Hero = {
    //    name: 'Firestorm',
    //    id: 1,
    //};

    //TypeScript will infer the type of a property based on what's assigned to it, so we could have simply declared heroes this way:
    //public heroes;
    //notice the {{}} for one-way data binding
    //notice the * prefix for a directive, it gives a special status to the 
    //element marked with the directive and child nodes.  ngIf, ngFor and other structural directives change the structure of the DOM
    //Event bind or "($event)": when user clicks on list item, the component must have an onSelect method defined. angular event bindings will respond to any DOM event
    //we're not done with the list
    //Property bind or "[$property]:"  we bind a boolean expression "hero === selectedHero" to the name of the CSS class, selected.  which way does data flow?  if the model says that that particular hero is selected, then the value of true flows from the model to the view.  This bind is a property bind.  Michael used terms "input" for param binding [], something changed the model and the component should know about it. Then there is the output for event binding (), something changed in the view and the component should know about it.
    ////Michael asked about the annotations @Input() and @Output().  With @Input(), the statement [class.myselected]="hero === selectedHero" passes the selected hero "selectHero" from this, the parent component, HeroesListComponent to HeroesDetailComponent (CONFIRM THIS)
    //I use directives to register my own custom directives
    //<my-hero-detail> tag means that HeroesComponent creates a child instance of HeroDetailComponent (huh? you mean it's own private object of that class??). 
    //when I use providers to register services, I'm telling Angular to provide a fresh service whenever it creates a new HeroesComponent.
    //I can call getHeroes() on initialization of HeroesComponent (WITHOUT CALLING CONSTRUCTOR) by adding this.getHeroes() to the impl of the ngOnInit lifecycle hook
    //the problem is that getting json back from the service could take a while, and we don't want the browser to have to wait...so the service needs to make a promise (I'll call back later when my results are ready), and the caller needs to act on the promise.
    //Next, it's bad that component's hero property is set to a hero object using a M->V binding.
    //<my-hero-detail [hero]="selectedHero"></my-hero-detail>

//a class is just a class until we tell A2 it's a component by adding the metadata

*/