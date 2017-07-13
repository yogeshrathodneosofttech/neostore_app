import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Headers } from '@angular/http';
import { NgForm } from '@angular/forms';

import * as _ from 'lodash';

import * as Globals from '../globals';
import { ApiData } from '../services/api';

/**
 * Generated class for the Editprofile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
  providers: [ ApiData ]
})
export class Editprofile {
	getUserDetailsEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData';
	postUserDetailsEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/update';
	loading:any;
	usersInformation:any;
	base64textString:any;
	binaryString:any;

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
      if ( response.status === 200 ) {
      	this.usersInformation = response.data.user_data;
        this.loading.dismiss();
      }
    }, error => {
       this.toastMessage('Could not get your Details. Please try again.', 3000);
       this.loading.dismiss();
    });
  }

  fileUpload(event) {
  	var files = event.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
  	this.binaryString = readerEvt.target.result;
  	this.base64textString = btoa(this.binaryString);
  }

  updateInfo(form: NgForm) {
    this.loader();
    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );
    var formData = new FormData();
    formData.append("first_name", form.value.firstname);
    formData.append("last_name", form.value.lastname);
    formData.append("email", form.value.email);
    formData.append("dob", '21-10-1993');
    formData.append("phone_no", form.value.phone);
    if ( this.binaryString == undefined ) {
    	formData.append("profile_pic", '' );
    } else {
    	formData.append("profile_pic", 'data:image/jpg;base64,'+ btoa(this.binaryString) );
    }

    this.apiService.postRequestWithHeaders(this.postUserDetailsEndPoint, formData, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
      	this.toastMessage('Your details have updated Successfully!!!', 2000);
        this.loading.dismiss();
        this.ngOnInit();
      }
    }, error => {
       this.toastMessage('Could not update your Details. Please try again.', 3000);
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
