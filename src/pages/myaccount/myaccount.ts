import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Headers } from '@angular/http';

import * as _ from 'lodash';

import * as Globals from '../globals';
import { ApiData } from '../services/api';
import { Editprofile } from '../editprofile/editprofile';
import { Resetpassword } from '../resetpassword/resetpassword';

/**
 * Generated class for the Myaccount page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-myaccount',
  templateUrl: 'myaccount.html',
  providers: [ ApiData ]
})
export class Myaccount {
	getUserDetailsEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData';
	loading:any;
	usersInformation:any;

  constructor(
  		public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
  		public navCtrl: NavController,
  		public navParams: NavParams) {}

  ngOnInit() {
  	this.loader();

  	var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );

    this.apiService.getRequestWithHeaders(this.getUserDetailsEndPoint, { headers }).subscribe((response) => {
        console.log("response", response);
      if ( response.status === 200 ) {
      	this.usersInformation = response.data.user_data;
        this.loading.dismiss();
      }
    }, error => {
       this.toastMessage('Could not get your Details. Please try again.', 3000);
       this.loading.dismiss();
    });
  }

  editProfile() {
  	this.navCtrl.push(Editprofile);
  }

  resetPassword() {
    this.navCtrl.push(Resetpassword);
  }

  toastMessage(message, duration) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'middle'
    });
    toast.present();
  }

  loader() {
    this.loading = this.loadingCtrl.create({
      content: '',
      spinner: 'bubbles',
      cssClass: 'loader'
    });
    this.loading.present();
  }

}
