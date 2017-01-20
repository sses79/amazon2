import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {UsersPage} from '../pages/users/users';
import {ReposPage} from '../pages/repos/repos';
import {LoginPage} from '../pages/login/login';
import {OrganisationsPage} from '../pages/organisations/organisations';
import {UserDetailsPage} from '../pages/user-details/user-details';

import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {Storage} from '@ionic/storage';

import {GithubUsers} from '../providers/github-users';
import {AuthService} from '../providers/auth-service';
import {Http} from '@angular/http';

let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    UsersPage,
    ReposPage,
    LoginPage,
    OrganisationsPage,
    UserDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsersPage,
    ReposPage,
    LoginPage,
    OrganisationsPage,
    UserDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GithubUsers, AuthService, {
    provide: AuthHttp,
    useFactory: getAuthHttp,
    deps: [Http]
  }
  ]
})
export class AppModule {
}
