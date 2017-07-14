import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

import * as _ from 'lodash';

import * as Globals from '../globals';

/**
 * Generated class for the Address page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class Address {

  constructor(
		  	private storage: Storage,
		  	private toastCtrl: ToastController,
		  	public navCtrl: NavController,
		  	public navParams: NavParams) {}

  addAddress(form: NgForm) {
    let address = {
    	address: form.value.address,
    	landmark: form.value.landmark,
    	city: form.value.city,
    	state: form.value.state,
    	zip: form.value.zip,
    	country: form.value.country
    };
    Globals.userAddresses.push(address);
   	this.storage.set('addressList', Globals.userAddresses);
    this.navCtrl.pop();
    this.toastMessage('Address Added Successfully!!!', 3000);
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
