import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Headers } from '@angular/http';

import * as Globals from '../globals';
import { ApiData } from '../services/api';
import { Address } from '../address/address';

/**
 * Generated class for the Addresslist page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addresslist',
  templateUrl: 'addresslist.html',
  providers: [ ApiData ]
})
export class Addresslist {
  placeOrderEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/order';
  loading:any;
  shippingAddressSelected:any = 0;
  AddressesByUser:any = [
    {
      name: 'John Doe',
      address: 'NeoSoft Dadar(W)'
    }, {
      name: 'John Doe',
      address: 'NeoSoft Rabale(W)'
    }, {
      name: 'John Doe',
      address: 'NeoSoft Pune(E)'
    }
  ];
  shipToAddress: any = this.AddressesByUser[0].address;

  constructor(
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController,
      public navParams: NavParams) {}

  addAddress() {
  	this.navCtrl.push(Address);
  }

  placeOrder() {
    this.loader();
     var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );
    var formData = new FormData();
    formData.append("address", this.shipToAddress );
    this.apiService.postRequestWithHeaders(this.placeOrderEndPoint, formData, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('Your order is placed Successfully!!!', 2000);
        this.loading.dismiss();
      }
    }, error => {
       this.toastMessage('Could not place your order. Please try again.', 3000);
       this.loading.dismiss();
    });
  }

  addressSelected(value) {
    this.shippingAddressSelected = value;
    this.shipToAddress = this.AddressesByUser[value].address;
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
