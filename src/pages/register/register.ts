import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Homescreen } from '../homescreen/homescreen';

import { ApiData } from '../services/api';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ ApiData ]
})
export class Register {
  registerEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/register';
	IAgree:any = false;
	genderValue:any = 'Male';
	maleSelected:any = true;
	femaleSelected:any = false;
  passwordMatch: any = false;

  constructor(
            private apiService: ApiData,
            private toastCtrl: ToastController,
            public navCtrl: NavController) {}

  gender(event) {
    this.genderValue = event.target.innerText;

    if ( this.genderValue.trim() == 'Male' ) {
    	this.maleSelected = true;
    	this.femaleSelected = false;
    } else if ( this.genderValue.trim() == 'Female' ) {
    	this.maleSelected = false;
    	this.femaleSelected = true;
    }
  }

  register(form: NgForm) {

    if ( this.genderValue == 'Male' ) {
      this.genderValue = 'M';
    } else if ( this.genderValue == 'Female' ) {
      this.genderValue = 'F';
    }

    let obj = {
      first_name: 'Kannan',
      last_name: 'Maravar',
      email: 'Kannan.Maravar2110@wwindia.com',
      password: 'Kannan123',
      confirm_password: 'Kannan123',
      gender: 'M',
      phone_no: 77150200100
    };
        console.log("obj", obj);

    console.log("this.genderValue", this.genderValue);

    if ( this.IAgree == false ) {
      this.toastMessage('Please agree Terms & Conditions!', 3000);
    } else {
        var formData = new FormData();
        formData.append("first_name", form.value.firstname);
        formData.append("last_name", form.value.lastname);
        formData.append("email", form.value.email);
        formData.append("password", form.value.password);
        formData.append("confirm_password", form.value.confirmpassword);
        formData.append("gender", this.genderValue);
        formData.append("phone_no", form.value.phone);

        console.log("formData", formData);

        this.apiService.postRegister(this.registerEndPoint, obj).subscribe((response) => {
          console.log("response", response);
          if ( response.status === 200 ) {
            console.log("response.status");
            this.toastMessage('You have Logged In Successfully!!!', 2000);
            this.navCtrl.push(Homescreen);
          }
        }, error => {
          console.log("error");
          this.toastMessage('Registration Failed. Please try again.', 3000);
        });

    }

    // var formData = new FormData();
    // formData.append("first_name", form.value.firstname);
    // formData.append("last_name", form.value.lastname);
    // formData.append("email", form.value.email);
    // formData.append("password", form.value.password);
    // formData.append("confirm_password", form.value.confirmpassword);
    // formData.append("gender", this.genderValue);
    // formData.append("phone_no", form.value.phone);
  }

  checkConfirmPassword(form: NgForm) {
    if ( form.value.password !== form.value.confirmpassword ) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
    }
  }

  iAgree() {
  	if (this.IAgree === false ) {
  		this.IAgree = true;
  	} else {
  		this.IAgree = false;
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

}
