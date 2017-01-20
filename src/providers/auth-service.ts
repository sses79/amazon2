import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
// import { Observable } from 'rxjs/Rx';
import { LoadingController, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();
  storage: Storage = new Storage();
  refreshSubscription: any;
  user: Object;
  idToken: string;
  userType: string;
  restaurant_id: number;
  loader: any;
  contentHeader: Headers = new Headers({ "Content-Type": "application/json" });
  error: string;

  RE_AUTH_URL: string = "http://localhost:8100/api-token-refresh/";
  LOGIN_URL: string = "http://link5g.com/oauth/token";

  constructor(private authHttp: AuthHttp, private loadingCtrl: LoadingController,
              private http: Http, public events: Events) {

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });
    this.storage.get('user_type').then(user_type => {
      this.userType = user_type;
    });

    this.events.subscribe('authenticated', authResult => {
      debugger;
      console.log(authResult);
      this.storage.set('id_token', authResult.access_token);
      this.idToken = authResult.access_token;

      this.storage.set('refresh_token', authResult.refresh_token);

      this.storage.get('id_token').then(token => {
        console.log(token);
      });

      // Schedule a token refresh
      // this.scheduleRefresh();

      // this.storage.set('user_type', authResult.user_type);
      // this.setUserType(authResult.user_type);
      // debugger;
      // this.storage.set('phone_number', authResult.phone_number);
      // this.storage.set('verified', authResult.verified);

      this.events.publish('loggedIn', authResult);

    });

  }

  public login(credentials) {
    let formCredentials = {
      username: credentials.username,
      password: credentials.password,
      grant_type: "password",
      client_id: "1",
      client_secret: "R27KE7HfmXvesKZ1WispfNLW5SCYB5WBfslKcRDj",
      scope: "*"
    };

    // debugger;
    this.loader = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    this.loader.present();
    // this.http.post(this.LOGIN_URL, JSON.stringify(formCredentials), { headers: this.contentHeader })
    //   .map(res => res.json())
    //   .subscribe(
    //     data => {
    //       // debugger;
    //       this.loader.dismiss();
    //       this.events.publish('authenticated', data);
    //
    //     },
    //     err => {
    //       this.loader.dismiss();
    //       // this.appService.presentBasicAlert(err._body,"");
    //       this.error = err
    //
    //     }
    //   );

    this.authHttp.post(this.LOGIN_URL, JSON.stringify(formCredentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {
          this.loader.dismiss();
          this.events.publish('authenticated', data);
        },
        err => console.log(err),
        () => console.log('Request Complete')
      );
  }

  // public scheduleRefresh() {
  //   // If the user is authenticated, use the token stream
  //   // provided by angular2-jwt and flatMap the token
  //
  //   let source = Observable.of(this.idToken).flatMap(
  //     token => {
  //       debugger;
  //       // The delay to generate in this case is the difference
  //       // between the expiry time and the issued at time
  //       var asdf = this.jwtHelper.decodeToken(token);
  //       let jwtIat = this.jwtHelper.decodeToken(token).orig_iat;
  //       let jwtExp = this.jwtHelper.decodeToken(token).exp;
  //       let iat = new Date(0);
  //       let exp = new Date(0);
  //
  //       let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));
  //
  //       return Observable.interval(delay);
  //     });
  //
  //   this.refreshSubscription = source.subscribe(() => {
  //     // this.getNewJwt();
  //   });
  // }

  // public getNewJwt() {
  //   // Get a new JWT from Auth0 using the refresh token saved
  //   // in local storage
  //   debugger;
  //   this.storage.get('refresh_token').then(token => {
  //     var request = {
  //       token: token
  //     }
  //     debugger;
  //     this.http.post(this.RE_AUTH_URL, JSON.stringify(request), { headers: this.contentHeader })
  //       .map(res => res.json())
  //       .subscribe(
  //         data => {
  //           debugger;
  //           this.storage.set('id_token', data.token);
  //           this.idToken = data.token;
  //
  //         },
  //         err => {
  //           alert(err);
  //         }
  //       );
  //
  //   }).catch(error => {
  //     console.log(error);
  //   });
  //
  // }

  public authenticated() {
    this.storage.get('id_token').then(token => {
      debugger;
      return tokenNotExpired('id_token', token);
    });
  }
}
