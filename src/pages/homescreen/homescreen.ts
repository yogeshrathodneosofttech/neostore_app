import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as Globals from '../globals';

import { Productlisting } from '../productlisting/productlisting';

import { Myaccount } from '../myaccount/myaccount';

/**
 * Generated class for the Homescreen page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-homescreen',
  templateUrl: 'homescreen.html',
})
export class Homescreen {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  clicked(Tables) {
    this.navCtrl.push(Productlisting, Tables );
  }

}
