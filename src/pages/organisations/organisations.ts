import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Phone} from '../../models/phone';

import {AuthService} from '../../providers/auth-service';
/*
 Generated class for the Organisations page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-organisations',
  templateUrl: 'organisations.html'
})
export class OrganisationsPage {
  phones: Phone[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    authService.load().subscribe(phones => {
      this.phones = phones;
      console.log(phones);
    })
  }

}
