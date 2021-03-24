import { BarberService } from './../../services/barber.service';
import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Router } from '@angular/router';

@Component({
  selector: 'page-barber-list',
  templateUrl: 'barber-list.html',
  styleUrls: ['./barber-list.scss'],
})
export class barberListPage {
  barbers: any[] = [];
  public selectedIndex = 0;

  constructor
    (
      public confData: ConferenceData,
      public router: Router,
      public barbersService: BarberService
    ) { }

    ngOnInit() {
    this.barbersService.getBarbers().subscribe(res => {
      this.barbers = res;
      console.log('barbers', this.barbers);
    });
  }

  ionViewDidEnter() {
    // this.confData.getbarbers().subscribe((barbers: any[]) => {
    //   this.barbers = barbers;
    // });
  }
  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }
}
