import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppointmentService } from './services/appointment.service';

//  firebase imports, remove what you don't require
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';

import { File } from '@ionic-native/file/ngx';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),

  ],
  declarations: [AppComponent],
  providers: [InAppBrowser, SplashScreen, StatusBar, File, AppointmentService, GooglePlus,],
  bootstrap: [AppComponent]
})
export class AppModule { }
