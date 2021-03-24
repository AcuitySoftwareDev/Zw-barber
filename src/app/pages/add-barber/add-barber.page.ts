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

  barberForm: FormGroup;
  submitted = false;
  barbers: any[] = [];

  constructor(
    private aptService: AddBarberService,
    private router: Router,
    public fb: FormBuilder,) { }

  ngOnInit() {
    this.barberForm = this.fb.group({
      location: [''],
      description: [''],
      name: [''],
      email: [''],
      mobile: ['']
    })
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
