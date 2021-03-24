import { Component, ViewChild, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage  {

  @ViewChild('shopList', { static: true }) shopList: IonList;

  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
  excludeCategories: any = [];

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  public selectedIndex = 0;

  ads: any;

  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    private data: DataService,
    public user: UserData,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config

  ) { }

  ionViewDidEnter() {
    this.confData.getAds().subscribe((ads: any[]) => {
      this.ads = ads;
    });
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }


}
