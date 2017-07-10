import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as Globals from '../globals';

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

  ionViewDidLoad() {
  	console.log("Globals loggedInUser", Globals.globals.loggedInUser);
    console.log('ionViewDidLoad Homescreen');
  }

}
