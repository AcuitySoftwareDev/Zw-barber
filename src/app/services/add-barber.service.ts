import { Injectable } from '@angular/core';
import { Addbarber } from '../services/add-barber'

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddBarberService {
  barberListRef: AngularFireList<any>;
  barberRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

    // Create
    addbarber(apt: Addbarber) {
      return this.barberListRef.push({
        location: apt.location,
        description: apt.description,
        name: apt.name,
        email: apt.email,
        mobile: apt.mobile
      })
    }
      // Get Single
  getBarber(id: string) {
    this.barberRef = this.db.object('/barber-list/' + id);
    return this.barberRef;
  }

    // Delete
    deleteBarber(id: string) {
      this.barberRef = this.db.object('/add-appointment/' + id);
      this.barberRef.remove();
    }

}
