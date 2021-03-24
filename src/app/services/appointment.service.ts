import { Injectable } from '@angular/core';
import { Appointment } from '../services/appointment';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createBooking(apt: Appointment) {
    return this.bookingListRef.push({
      title: apt.title,
      venue: apt.venue,
      date: apt.date,
      time: apt.time,
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile
    })
  }

  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/add-appointment/' + id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/add-appointment');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, apt: Appointment) {
    return this.bookingRef.update({
      venue: apt.venue,
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile
    })
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/add-appointment/' + id);
    this.bookingRef.remove();
  }
}