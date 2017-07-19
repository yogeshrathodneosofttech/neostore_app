import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks';

import * as Globals from '../pages/globals';
import { ApiData } from '../pages/services/api';

import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { Homescreen } from '../pages/homescreen/homescreen';
import { Myaccount } from '../pages/myaccount/myaccount';
import { Cart } from '../pages/cart/cart';
import { Productlisting } from '../pages/productlisting/productlisting';
import { Productdetail } from '../pages/productdetail/productdetail';
import { Storelocator } from '../pages/storelocator/storelocator';
import { Orders } from '../pages/orders/orders';


@Component({
  templateUrl: 'app.html',
  providers: [ ApiData ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  getUserDetailsEndPoint:any = 'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData';
  usersInformation:any;
  cartCount = Globals.globals.cartItems;
  checkLogin: any = Globals.globals.loggedInUser;
  rootPage:any;


  pages: Array<{title: string, component: any}>;

  constructor(
      private deeplinks: Deeplinks,
      private storage: Storage,
      public events: Events,
      public menuCtrl: MenuController,
      private apiService: ApiData,
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen) {

    storage.get('userAccessToken').then((userAccessToken) => {
      Globals.globals.userAccessToken = userAccessToken;
      this.rootPage = HomePage;
    });

    this.initializeApp();
    events.subscribe('updateSidebar', () => {
      this.ngOnOnit();
    });



  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Deep Linking
      this.deeplinks.routeWithNavController(this.nav, {
        '/store': Storelocator,
        '/register': Register,
        '/productcat/:category': Productlisting,
        '/products/:productid': Productdetail
      }).subscribe((match) => {
        console.log('Successfully matched route', match);
      }, (nomatch) => {
        console.error('Got a deeplink that didn\'t match', nomatch);
      });

    });
  }

  ngOnOnit() {
    if ( Globals.globals.userAccessToken !== '' ) {
      var headers = new Headers();
      headers.append( 'access_token', Globals.globals.userAccessToken );
      this.apiService.getRequestWithHeaders(this.getUserDetailsEndPoint, { headers }).subscribe((response) => {
        if ( response.status === 200 ) {
          this.usersInformation = response;
          Globals.globals.cartItems = response.data.total_carts;
          this.cartCount = Globals.globals.cartItems;
        }
      }, error => {
          console.log("error", error);
      });
    }
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

  openStorePage() {
    this.nav.setRoot(Storelocator);
    this.menuCtrl.toggle();
  }

  openOrdersPage() {
    this.nav.setRoot(Orders);
    this.menuCtrl.toggle();
  }

  Logout() {
    Globals.globals.userAccessToken = '';
    this.storage.remove('userAccessToken');
    Globals.globals.loggedInUser = false;
    this.nav.setRoot(Login);
    this.menuCtrl.toggle();
  }

}