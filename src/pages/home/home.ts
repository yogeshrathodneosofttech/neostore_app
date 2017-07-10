import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Login } from '../login/login';
import { Homescreen } from '../homescreen/homescreen';

import * as Globals from '../globals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
  	setTimeout( () => {
  		this.navCtrl.push(Homescreen);
  	}, 1000);
  }

}
