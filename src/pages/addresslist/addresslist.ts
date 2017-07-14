import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers } from '@angular/http';

import * as _ from 'lodash';

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
  AddressesByUser:any = [];
  shipToAddress: any = 0;

  constructor(
      public events: Events,
      private storage: Storage,
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController,
      public navParams: NavParams) {}


  ngOnInit() {
    this.storage.get('addressList').then((addressList) => {
      if ( addressList != undefined ) {
        _.forEach(addressList, (address) => {
          Globals.userAddresses.push(address);
        });
        this.AddressesByUser = Globals.userAddresses;
      }
    });
    this.shipToAddress = this.AddressesByUser[0];
  }

  addAddress() {
  	this.navCtrl.push(Address);
  }

  ionViewCanEnter() {
    this.AddressesByUser = Globals.userAddresses;
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
        this.events.publish('updateSidebar');
      }
    }, error => {
       this.toastMessage('Could not place your order. Please try again.', 3000);
       this.loading.dismiss();
    });
  }

  addressSelected(value) {
    this.shippingAddressSelected = value;
    this.shipToAddress = this.AddressesByUser[value];
  }

  deleteAddress(item) {
    _.remove( this.AddressesByUser, item );
    this.storage.set('addressList', Globals.userAddresses);
    this.shippingAddressSelected = 0;
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
