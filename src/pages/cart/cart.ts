import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Headers } from '@angular/http';

import * as _ from 'lodash';

import * as Globals from '../globals';
import { ApiData } from '../services/api';

import { Addresslist } from '../addresslist/addresslist';

/**
 * Generated class for the Cart page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [ ApiData ]
})
export class Cart {
  getUsersCartEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/cart';
  deleteItemFromCartEndpoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/deleteCart';
  updateCartEndpoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/editCart';
  loading:any;
  cartTotal:any;
  cartItems:any = [];
  openQuantityDropdown:any = true;
  quantity:any = [1,2,3,4,5,6,7,8,9];

  constructor(
      public events: Events,
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController,
      public navParams: NavParams) {}

  ionViewCanEnter() {
    this.loader();
    this.cartItems = [];

    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );

    this.apiService.getRequestWithHeaders(this.getUsersCartEndPoint, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
        this.cartTotal = response.total;
        _.forEach(response.data, (cartItem) => {
          this.cartItems.push(cartItem);
        });
        this.loading.dismiss();
        this.events.publish('updateSidebar');
      }
    }, error => {
       this.toastMessage('Could not get your Cart Details. Please try again.', 3000);
       this.loading.dismiss();
    });
  }

  removeFromCart(item) {
    this.loader();
    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );
    var formData = new FormData();
    formData.append("product_id", item.product_id);

    this.apiService.postRequestWithHeaders(this.deleteItemFromCartEndpoint, formData, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('Item Deleted Successfully!!!', 2000);
        this.loading.dismiss();
        this.ionViewCanEnter();
        this.events.publish('updateSidebar');
      }
    }, error => {
       this.toastMessage('Could not delete from Cart. Please try again.', 3000);
       this.loading.dismiss();
    });
  }

  updateCart(item) {
    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );
    var formData = new FormData();
    formData.append("product_id", item.product_id);
    formData.append("quantity", item.quantity);
    this.apiService.postRequestWithHeaders(this.updateCartEndpoint, formData, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('Cart updated Successfully!!!', 2000);
        setTimeout( () => {
          this.ionViewCanEnter();
        }, 1000);
      }
    }, error => {
       this.toastMessage('Could not update your Cart. Please try again.', 3000);
    });

  }

  placeOrder() {
    this.navCtrl.push(Addresslist);
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
