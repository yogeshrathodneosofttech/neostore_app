import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';

import { Productdetail } from '../productdetail/productdetail';

import { ApiData } from '../services/api';

/**
 * Generated class for the Productlisting page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-productlisting',
  templateUrl: 'productlisting.html',
  providers: [ ApiData ]
})
export class Productlisting {
	selectedItem:any = 1;
  productCategoryId:any = 1;
  productsEndPoint:any = '';
  products:any = [];
  starsCounts: number[] = [];

  constructor(
        private apiService: ApiData,
  			public navCtrl: NavController,
  			public navParams: NavParams) {
    this.getParameters();
  }

  getParameters() {
    switch (this.navParams.data) {
      case "Tables":
        this.productCategoryId = 1;
      break;
      case "Sofas":
        this.productCategoryId = 3;
      break;
      case "Chairs":
        this.productCategoryId = 2;
      break;
      case "Cupboards":
        this.productCategoryId = 4;
      break;
      default:
        break;
    }
    this.productsEndPoint = `http://staging.php-dev.in:8844/trainingapp/api/products/getList?{&product_category_id=${this.productCategoryId}&limit=10&page=1&}`;
  }



  ionViewDidLoad() {
    this.selectedItem = this.navParams.data;
    this.products = [];
    this.starsCounts = [];

    this.apiService.getData(this.productsEndPoint).subscribe((response) => {
      _.forEach(response.data, (data) => {
        this.products.push(data);
        this.starsCounts.push(data.rating);
      });
    }, error => {
        console.log("error", error);
    });
  }

  productDetail(item) {
    this.navCtrl.push(Productdetail, item);
  }

}
