import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Headers } from '@angular/http';

import * as Globals from '../pages/globals';
import { ApiData } from '../pages/services/api';

import { HomePage } from '../pages/home/home';
import { Homescreen } from '../pages/homescreen/homescreen';
import { Myaccount } from '../pages/myaccount/myaccount';
import { Cart } from '../pages/cart/cart';
import { Productlisting } from '../pages/productlisting/productlisting';


@Component({
  templateUrl: 'app.html',
  providers: [ ApiData ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  getUserDetailsEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData';
  loading:any;
  usersInformation:any;

  rootPage: any = Homescreen;

  pages: Array<{title: string, component: any}>;

  constructor(
      public menuCtrl: MenuController,
      public loadingCtrl: LoadingController,
      private apiService: ApiData,
      private toastCtrl: ToastController,
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.loader();

    var headers = new Headers();
    headers.append( 'access_token', Globals.globals.userAccessToken );

    this.apiService.getRequestWithHeaders(this.getUserDetailsEndPoint, { headers }).subscribe((response) => {
      if ( response.status === 200 ) {
        this.usersInformation = response;
        this.loading.dismiss();
      }
    }, error => {
       this.toastMessage('Could not get your Details. Please try again.', 3000);
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

  openCartPage() {
    this.nav.setRoot(Cart);
    this.menuCtrl.toggle();
  }

  openTablesPage() {
    this.nav.setRoot(Productlisting, { category: 'Tables' } );
    this.menuCtrl.toggle();
  }

  openSofaPage() {
    this.nav.setRoot(Productlisting, { category: 'Sofas' } );
    this.menuCtrl.toggle();
  }

  openChairPage() {
    this.nav.setRoot(Productlisting, { category: 'Chairs' } );
    this.menuCtrl.toggle();
  }

  openCupboardPage() {
    this.nav.setRoot(Productlisting, { category: 'Cupboards' } );
    this.menuCtrl.toggle();
  }

  openAccountPage() {
    this.nav.setRoot(Myaccount);
    this.menuCtrl.toggle();
  }

  openStorePage() {}

  openOrdersPage() {}

  Logout() {}

}