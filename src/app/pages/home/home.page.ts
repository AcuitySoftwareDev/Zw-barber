import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { UserData } from '../../providers/user-data';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  username: string;
  public loading: any;
  public isGoogleLogin = false;
  public user = null;

  constructor
    (
      public alertCtrl: AlertController,
      public router: Router,
      public userData: UserData,
      private google: GooglePlus,
      public loadingController: LoadingController,
      private fireAuth: AngularFireAuth,
      private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.fireAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.isGoogleLogin = true;
        }
        else {
          this.isGoogleLogin = false;
        }
      });
    });
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

}
