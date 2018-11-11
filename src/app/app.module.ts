import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormPage } from '../pages/form/form';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
import { RegisterPage } from '../pages/register/register';
import { OriginMapPage } from '../pages/origin-map/origin-map';
import { DestinationMapPage } from '../pages/destination-map/destination-map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FormPage,
    LoginPage,
    SplashPage,
    RegisterPage,
    OriginMapPage,
    DestinationMapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    FormPage,
    RegisterPage,
    SplashPage,
    OriginMapPage,
    DestinationMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
