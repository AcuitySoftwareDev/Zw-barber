import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { UtilService } from './services/util.service';

import { UserData } from './providers/user-data';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  rootPage: any = '/home';
  appPages = [
    {
      title: 'My Dashboard',
      url: '/app/tabs/schedule',
      icon: 'speedometer'
    },
    {
      title: 'Hair Dressers',
      url: '/app/tabs/barbers',
      icon: 'people'
    },
    {
      title: 'Shop',
      url: '/app/tabs/shop',
      icon: 'pricetags-outline'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;
  dark = false;
  isGoogleLogin = false;
  public isMenuEnabled: boolean = true;
  public selectedIndex = 0;
  username: string;
  public loading: any;
  public user = null;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private fireAuth: AngularFireAuth,
    private util: UtilService,

  ) {
    this.initializeApp();
  }

  async ngOnInit() {

    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.selectedIndex = 1;
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });

    // this.platform.ready().then(() => {
    //   this.fireAuth.onAuthStateChanged(user => {
    //     if (user) {
    //       this.isGoogleLogin = true;
    //     }
    //     else {
    //       this.isGoogleLogin = false;
    //     }
    //   });
    // });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  updategLoggedInStatus(isGoogleLogin: boolean) {
    setTimeout(() => {
      this.loggedIn = isGoogleLogin
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/login');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }

  close() {
    this.menu.toggle();
  }
}
