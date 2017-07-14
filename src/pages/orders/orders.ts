import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Headers } from '@angular/http';

import * as _ from 'lodash';

import * as Globals from '../globals';
import { ApiData } from '../services/api';

/**
 * Generated class for the Orders page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
  providers: [ ApiData ]
})
export class Orders {
	getOrdersEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/orderList';
  loading:any;
  userOrders: any = [];

  constructor(
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public navCtrl: NavController,
      public navParams: NavParams) {}

  ionViewCanEnter() {
    this.loader();

    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );

    this.apiService.getRequestWithHeaders(this.getOrdersEndPoint, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
      	_.forEach(response.data, (order) => {
      		this.userOrders.push(order);
      	});
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
