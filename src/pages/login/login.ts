import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Forgetpassword } from '../forgetpassword/forgetpassword';
import { Register } from '../register/register';
import { Homescreen } from '../homescreen/homescreen';

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

  constructor(
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController) {
  }

  loginUser(form: NgForm) {

    var formData = new FormData();
    formData.append("email", form.value.username);
    formData.append("password", form.value.password);
    console.log("formData", formData);

    this.apiService.postLogin(this.loginEndPoint, formData).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('You have Logged In Successfully!!!', 2000);
        this.navCtrl.push(Homescreen);
      }
    }, error => {
       this.toastMessage('Email or Password is wrong. Please try again.', 3000);
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

  forgetPassword() {
  	this.navCtrl.push(Forgetpassword);
  }

  register() {
  	this.navCtrl.push(Register);
  }

}
