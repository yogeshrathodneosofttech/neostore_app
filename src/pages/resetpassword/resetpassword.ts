import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Headers } from '@angular/http';

import * as Globals from '../globals';
import { ApiData } from '../services/api';

/**
 * Generated class for the Resetpassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
  providers: [ ApiData ]
})
export class Resetpassword {
  updateUserPasswordEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/change';
  loading:any;
  passwordMatch:any = false;

  constructor(
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController,
      public navParams: NavParams) {}


  resetPassword(form: NgForm) {
    this.loader();
    console.log("form.value", form.value);
    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );
    var formData = new FormData();
    formData.append("old_password", form.value.currentpassword);
    formData.append("password", form.value.newpassword);
    formData.append("confirm_password", form.value.confirmpassword);
    this.apiService.postRequestWithHeaders(this.updateUserPasswordEndPoint, formData, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('Password Changed Successfully!!!', 2000);
        this.loading.dismiss();
        this.navCtrl.pop();
      }
    }, error => {
       this.toastMessage('Could not update your Password. Please try again.', 3000);
       this.loading.dismiss();
    });
  }

  checkConfirmPassword(event, password) {
    if ( event.target.value != password || password.length < 6 ) {
      this.passwordMatch = true;
    } else {
        this.passwordMatch = false;
    }
  }

  checkPasswordLength(event, confirmpassword) {
    if ( event.target.value.length < 6 || event.target.value != confirmpassword ) {
      this.passwordMatch = true;
    } else {
        this.passwordMatch = false;
    }
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
