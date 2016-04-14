/** auth.service.ts */
import { Injectable } from 'angular2/core';
import { tokenNotExpired } from 'angular2-jwt';
//import { dotenv } from 'dotenv';
//this is of type any (?!)

declare var Auth0Lock: any;


@Injectable()
export class AuthService {

    //this is a lock associated with the user and a domain which lets them take their authenticated status and use
    //it somewhere else (isn't that the definition of an JWT?)  See also https://jwt.io/introduction/
    lock: Auth0Lock = new Auth0Lock(YOUR_CLIENT_ID, YOUR_CLIENT_DOMAIN);
    
    //if you want to modify your middleware (express-jwt) a good place to start is to read:
    //https://github.com/auth0/express-jwt/blob/master/README.md

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
