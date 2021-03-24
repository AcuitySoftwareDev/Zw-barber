import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AppointmentService} from '../../services/appointment.service'
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.page.html',
  styleUrls: ['./add-appointment.page.scss'],
})
export class AddAppointmentPage implements OnInit {

  bookingForm: FormGroup;
  submitted = false;
  barbers: any[] = [];

  constructor(

    private aptService: AppointmentService,
    private router: Router,
    public fb: FormBuilder,
    private confData: ConferenceData,
    ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      title: [''],
      venue:[''],
      date: [''],
      time: [''],
      name: [''],
      email: [''],
      mobile: [''],
    })
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['./shedule']);
      })
        .catch(error => console.log(error));
    }
  }
  ionViewDidEnter() {
    this.confData.getbarbers().subscribe((barbers: any[]) => {
      this.barbers = barbers;
    });
  }

}
