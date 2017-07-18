import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import * as Globals from '../globals';

import { Login } from '../login/login';
import { Homescreen } from '../homescreen/homescreen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public events: Events, public navCtrl: NavController) {}

  ngOnInit() {
  	if ( Globals.globals.userAccessToken ) {
  		this.events.publish('updateSidebar');
  		this.navCtrl.setRoot(Homescreen);
  	} else {
  		this.navCtrl.push(Login);
  	}
  }

}
