import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Headers } from '@angular/http';

import * as _ from 'lodash';

import * as Globals from '../globals';
import { ApiData } from '../services/api';

/**
 * Generated class for the Orderdetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
  providers: [ ApiData ]
})
export class Orderdetail {
	getOrderDetailEndPoint:any = '';
  loading:any;
  orderDetails:any;
  orders:any = [];

  constructor(
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController,
      public navParams: NavParams) {}

  ionViewDidLoad() {
  	let orderId = this.navParams.data.id;
  	this.orders = [];

  	this.getOrderDetailEndPoint = `http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=${ orderId }`;
    this.loader();

    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );

    this.apiService.getRequestWithHeaders(this.getOrderDetailEndPoint, { headers }).subscribe((response) => {
        console.log("response", response);
      if ( response.status === 200 ) {
      	this.orderDetails = response.data;
      	_.forEach(response.data.order_details, (order) => {
      		this.orders.push(order);
      	});
    		console.log("this.orders", this.orders);
        this.loading.dismiss();
      }
    }, error => {
       this.toastMessage('Could not get your Cart Details. Please try again.', 3000);
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
