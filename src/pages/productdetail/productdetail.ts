import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Headers } from '@angular/http';

import * as _ from 'lodash';

import * as Globals from '../globals';
import { ApiData } from '../services/api';



/**
 * Generated class for the Productdetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
  providers: [ ApiData ]
})
export class Productdetail {
  productInfoEndPoint:any = '';
  setRatingEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/products/setRating';
	productDetails:any;
	starsCounts:any;
  productCategory:any = 'Tables';
  loading:any;
  ratingPopUp:any = false;
  buyPopUp:any = false;
  productImages:any = [];
  activeImage:any = '';
  productQuantity:any = 0;

  constructor(
        public loadingCtrl: LoadingController,
        private apiService: ApiData,
        private toastCtrl: ToastController,
  			public navCtrl: NavController,
  			public navParams: NavParams) {}

  ngOnInit() {
    this.loader();
  	this.productDetails = this.navParams.data;
    this.starsCounts = this.productDetails.rating;

    switch (this.productDetails.product_category_id) {
      case 1:
        this.productCategory = 'Tables';
        break;
      case 2:
        this.productCategory = 'Chairs';
        break;
      case 3:
        this.productCategory = 'Sofas';
        break;
      case 4:
        this.productCategory = 'Cupboards';
        break;
      default:
        break;
    }

    this.productInfoEndPoint = `http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${ this.productDetails.id }`;

    this.apiService.getData(this.productInfoEndPoint).subscribe((response) => {
      this.productDetails = response.data;
      this.loading.dismiss();
      this.activeImage = this.productDetails.product_images[0].image;
      _.forEach(this.productDetails.product_images, (productImage) => {
        this.productImages.push(productImage.image);
      });
    }, error => {
        this.loading.dismiss();
    });
  }

  postRating() {
    this.loader();

    var formData = new FormData();
    formData.append("product_id", this.productDetails.id);
    formData.append("rating", this.starsCounts);

    this.apiService.postRequest(this.setRatingEndPoint, formData).subscribe((response) => {
      if ( response.status === 200 ) {
        this.toastMessage('Rating Updated Successfully!!!', 2000);
        this.loading.dismiss();
        this.ratingPopUp = false;
      }
    }, error => {
       this.toastMessage('Rating could not be updated. Please try again.', 3000);
       this.loading.dismiss();
       this.ratingPopUp = false;
    });
  }

  hidePopUp(event) {
   event.stopPropagation();
  }

  buyItem(value) {
    this.loader();
    let addToCartEndPoint = `http://staging.php-dev.in:8844/trainingapp/api/addToCart`;

    var formData = new FormData();
    formData.append("product_id", this.productDetails.id);
    formData.append("quantity", value );

    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );

    this.apiService.postRequestWithHeaders(addToCartEndPoint, formData, { headers }).subscribe((response) => {
        console.log("response", response);
      if ( response.status === 200 ) {
        this.toastMessage('Product added to cart Successfully!!!', 2000);
        this.loading.dismiss();
        this.buyPopUp = false;
      }
    }, error => {
       this.toastMessage('Product could not be added to cart. Please try again.', 3000);
       this.loading.dismiss();
       this.buyPopUp = false;
    });
  }

  replaceMainImage(event, item) {
    this.activeImage = item;
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
