import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
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
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
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
        this.navCtrl.push(Homescreen);
        this.loading.dismiss();
        Globals.globals.userAccessToken = response.data.access_token;
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
