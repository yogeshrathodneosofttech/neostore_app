import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ApiData } from '../services/api';

/**
 * Generated class for the Forgetpassword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
  providers: [ ApiData ]
})
export class Forgetpassword {
  forgetPasswordEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/forgot';

  constructor(
        private apiService: ApiData,
        private toastCtrl: ToastController,
        public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Forgetpassword');
  }

  forgetPassword(form: NgForm) {
	  console.log("form Values", form.value);
    var formData = new FormData();
    formData.append("email", form.value.email);

    this.apiService.postRequest(this.forgetPasswordEndPoint, formData).subscribe((response) => {
      console.log("response", response);
      if ( response.status === 200 ) {
        this.toastMessage('We have sent a new password to your registered Email Address. Please Login using it.', 3000);
        this.navCtrl.pop();
      }
    }, error => {
        console.log("error", error);
       this.toastMessage('Email is wrong. Please try again.', 3000);
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

}
