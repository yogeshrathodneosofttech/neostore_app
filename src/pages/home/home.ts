import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Login } from '../login/login';
import { Register } from '../register/register';
import { Forgetpassword } from '../forgetpassword/forgetpassword';
import { Resetpassword } from '../resetpassword/resetpassword';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
  	setTimeout( () => {
  		this.navCtrl.push(Login);
  	}, 1000);
  }

}
