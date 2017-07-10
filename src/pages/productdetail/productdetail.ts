import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Productdetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class Productdetail {
	productDetails:any;
	starsCounts:any;

  constructor(
  			public navCtrl: NavController,
  			public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Productdetail');
  }

  ngOnInit() {
  	this.productDetails = this.navParams.data;
  	console.log("this.navParams", this.productDetails);
  	this.starsCounts = this.productDetails.rating;
  }

}
