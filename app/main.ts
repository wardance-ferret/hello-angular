import { bootstrap }    from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { AppComponent } from './app.component';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './auth.service';

//instead of adding the dependencies w/ the decorator on AppComponent
//pass more args to bootstrap(?!)
//Bootstrap registration of providers is possibly discouraged, but I don't see why.
//[ Http ] is short hand for a registration that creates a new instance of the Http class
//i.e. [ new Provider (Http, {useClass: Http})]
//the provide method, like the constructor, takes two args
// [provide(AuthHttp, {})]
//the first arg is like a registration key (what you or I would use to look up the provider definition in a "dictionary")
//the second arg is a provider definition object
//a JSON object with useFactory and deps fields

bootstrap(AppComponent, 
    [   HTTP_PROVIDERS,
        ROUTER_PROVIDERS,
        provide(AuthHttp, {
            useFactory: (http: Http) => {
                return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
            }
        ),
        AuthService
    ]
);
