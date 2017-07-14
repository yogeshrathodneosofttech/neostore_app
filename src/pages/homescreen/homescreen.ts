import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers } from '@angular/http';

import * as _ from 'lodash';

import * as Globals from '../globals';
import { ApiData } from '../services/api';

import { Productlisting } from '../productlisting/productlisting';

import { Myaccount } from '../myaccount/myaccount';

/**
 * Generated class for the Homescreen page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-homescreen',
  templateUrl: 'homescreen.html',
  providers: [ ApiData ]
})
export class Homescreen {
	getUsersDataEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData';
	sliderImages:any = [];

  constructor(private apiService: ApiData, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
  	var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );

    this.apiService.getRequestWithHeaders(this.getUsersDataEndPoint, { headers }).subscribe((response) => {
      _.forEach( response.data.product_categories, (imageUrl) => {
      	this.sliderImages.push(imageUrl.icon_image);
      });
    }, error => {
    });
  }

  clicked(Tables) {
    this.navCtrl.push(Productlisting, Tables );
  }

}
