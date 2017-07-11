import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
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
  loading:any;

  constructor(
        public loadingCtrl: LoadingController,
        private apiService: ApiData,
        private toastCtrl: ToastController,
        public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Forgetpassword');
  }

  forgetPassword(form: NgForm) {
    this.loader();
    var formData = new FormData();
    formData.append("email", form.value.email);

    this.apiService.postRequest(this.forgetPasswordEndPoint, formData).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('We have sent a new password to your registered Email Address. Please Login using it.', 3000);
        this.navCtrl.pop();
        this.loading.dismiss();
      }
    }, error => {
       this.toastMessage('Email is wrong. Please try again.', 3000);
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

}
