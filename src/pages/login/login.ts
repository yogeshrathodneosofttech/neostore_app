import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

import { Forgetpassword } from '../forgetpassword/forgetpassword';
import { Register } from '../register/register';
import { Homescreen } from '../homescreen/homescreen';
import * as Globals from '../globals';

import { ApiData } from '../services/api';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ ApiData ]
})
export class Login {
  loginEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/login';
  loading:any;

  constructor(
      private storage: Storage,
      public events: Events,
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController) {
  }

  loginUser(form: NgForm) {
    this.loader();

    var formData = new FormData();
    formData.append("email", form.value.username);
    formData.append("password", form.value.password);

    this.apiService.postRequest(this.loginEndPoint, formData).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('You have Logged In Successfully!!!', 2000);
        Globals.globals.loggedInUser = true;
        this.navCtrl.setRoot(Homescreen);
        this.loading.dismiss();
        Globals.globals.userAccessToken = response.data.access_token;
        this.storage.set('userAccessToken', Globals.globals.userAccessToken );
        this.events.publish('updateSidebar');
      }
    }, error => {
       this.toastMessage('Email or Password is wrong. Please try again.', 3000);
       this.loading.dismiss();
    });

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

  forgetPassword() {
  	this.navCtrl.push(Forgetpassword);
  }

  register() {
  	this.navCtrl.push(Register);
  }

}
