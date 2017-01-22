import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { OrganisationsPage } from '../organisations/organisations';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  authType: string = "login";
  LOGIN_URL: string = "http://link5g.com/oauth/token";
  userName: string = "Welcome";
  // LOGIN_URL: string = "https://restaurant-moatazs.c9users.io/api-token-auth/";

  constructor(private auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {}

  login(credentials) {
    this.auth.login(credentials);
    this.navCtrl.push(OrganisationsPage);
  }


}
