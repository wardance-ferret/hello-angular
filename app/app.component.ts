/** app.component.ts */
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HeroService} from './heroes/mock-hero.service';
import {HeroListComponent} from './heroes/heroes-list.component';

//what causes this?
//angular2.dev.js:23730 EXCEPTION: Cannot resolve all parameters for 'HeroesComponent'(?). Make sure that all the parameters are decorated with Inject or have valid type annotations and that 'HeroesComponent' is decorated with Injectable. (This error is caused in HeroesComponent if the HeroService is not included.

//Using the directive <my-heroes></my-heroes> for HeroListComponent
//was the first way we tried, but it's not the best way to set up navigation when there are multiple views - we'd like to set up a <router-outlet/> tag, importing RouteConfig and the rest.  There is also a routerLink element with odd syntax... 
@Component(
{
        selector: 'my-app',
        //templateUrl could point to a file so we don't use a metadata string, see dashboard component
        template: `
            <h1>{{title}}</h1>
            <nav>
            <!--see nav tag nestles the two -->
            <a [routerLink]="['Heroes']">Heroes</a>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <nav>
            <router-outlet></router-outlet>
       `,
        directives: [ROUTER_DIRECTIVES],
        providers: [
            ROUTER_PROVIDERS,
            HeroService
        ]
})
//note: a refactoring (add heroes folder) affected the imports, it didn't affect the routes.
//note that I can use /dashboard route as the default
//route using an optional property, saves me having to define /
@RouteConfig(
[
    {path:'/crisis-center', name: 'CrisisCenter', component: CrisisListComponent},
    {path:'/heroes', name: 'Heroes', component: HeroListComponent},
    {path:'/hero/:id', name: 'HeroDetail', component:HeroDetailComponent}
    {path: '/dashboard', name: 'Dashboard',
     component: DashboardComponent, useAsDefault: true        
    }
]
)
export class AppComponent{
    title = 'Tour of Heroes';
}