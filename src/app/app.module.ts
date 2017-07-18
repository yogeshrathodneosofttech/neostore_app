import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RatingModule } from "ngx-rating";
import { IonicStorageModule } from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Forgetpassword } from '../pages/forgetpassword/forgetpassword';
import { Resetpassword } from '../pages/resetpassword/resetpassword';
import { Homescreen } from '../pages/homescreen/homescreen';
import { Productlisting } from '../pages/productlisting/productlisting';
import { Productdetail } from '../pages/productdetail/productdetail';
import { Myaccount } from '../pages/myaccount/myaccount';
import { Editprofile } from '../pages/editprofile/editprofile';
import { Cart } from '../pages/cart/cart';
import { Storelocator } from '../pages/storelocator/storelocator';
import { Orders } from '../pages/orders/orders';
import { Address } from '../pages/address/address';
import { Addresslist } from '../pages/addresslist/addresslist';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Register,
    Forgetpassword,
    Resetpassword,
    Homescreen,
    Productlisting,
    Productdetail,
    Myaccount,
    Editprofile,
    Cart,
    Storelocator,
    Orders,
    Address,
    Addresslist
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Register,
    Forgetpassword,
    Resetpassword,
    Homescreen,
    Productlisting,
    Productdetail,
    Myaccount,
    Editprofile,
    Cart,
    Storelocator,
    Orders,
    Address,
    Addresslist
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Deeplinks,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
