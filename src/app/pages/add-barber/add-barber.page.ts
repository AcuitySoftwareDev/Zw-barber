import { LoadingController, NavController } from '@ionic/angular';
import { Barber, BarberService } from './../../services/barber.service';
import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { AddBarberService } from '../../services/add-barber.service'

@Component({
  selector: 'app-add-barber',
  templateUrl: './add-barber.page.html',
  styleUrls: ['./add-barber.page.scss'],
})
export class AddBarberPage implements OnInit {

  barber: Barber = {
    $id: '',
    location: '',
    description: '',
    name: '',
    email: '',
    mobile: null,
    picture:'https://www.misemacau.org/wp-content/uploads/2015/11/avatar-placeholder-01.png'
  };
  user:any
  op= "Create"

  barberForm: FormGroup;
  submitted = false;
  barbers: any[] = [];

  constructor(
    private aptService: AddBarberService,
    private router: Router,
    public nav: NavController,
    public barberService: BarberService,
    public loadingController: LoadingController,
    public fb: FormBuilder,) { }

  ngOnInit() {

  }

  async addBarber() {

    const loading = await this.loadingController.create({
      message: 'Saving Barber..'
    });
    await loading.present();
      this.barberService.addBarber(this.barber).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/barber');
      });


  }

  formSubmit() {
    if (!this.barberForm.valid) {
      return false;
    } else {
      this.aptService.addbarber(this.barberForm.value).then(res => {
        console.log(res)
        this.barberForm.reset();
        this.router.navigate(['./tabs/barber-list']);
      })
        .catch(error => console.log(error));
    }
  }
}
