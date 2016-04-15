/** auth.service.ts */
import { Injectable } from 'angular2/core';
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {


    lock: Auth0Lock = new Auth0Lock('mkVFHkE5AvOhy7wthf9FuarwUkxn1x5q', 'wardance-ferret.auth0.com');


    login(){
        this.lock.show();
    }

    logout(){
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    }

    loggedIn(){
        return tokenNotExpired();    
    }

    getAuthDetails(){

        let hash = this.lock.parseHash();
        if (hash){
            if (hash.error) {
                console.log('There was some error logging in ', hash.error);
            }else {
                this.lock.getProfile(hash.id_token, 

                    function(err:Object, profile:Object) {
                        if (err){
                            console.log(err);
                            return;
                        }
                        localStorage.setItem('profile', JSON.stringify(profile));
                        localStorage.setItem('id_token', hash.id_token);
                    }
                ); //take profile data and store it locally
            }//there was no login error
        }
    }//getAuthDetails()

}

/**
Notes:
    //Auth0 is an authentication broker that supports authentication with identity providers like Google.
    //lock is a widget to add SSO to this app. Lock accepts a user and a domain as input and authenticates the user with an identify provider in Auth0.  This lets the user take their authenticated status and use
    //it somewhere else (isn't that the definition of an JWT?).  There are other ways of doing this also.  See also https://jwt.io/introduction/

    //if you want to modify your middleware (express-jwt) a good place to start is to read:
    //https://github.com/auth0/express-jwt/blob/master/README.md
*/