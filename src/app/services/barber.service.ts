import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Barber {
  $id: string;
  location: string;
  description: string;
  name: string;
  email: string
  mobile: number;
  picture: string;
}
@Injectable({
  providedIn: 'root'
})
export class BarberService {

  private barbersCollection: AngularFirestoreCollection<Barber>;

  private barbers: Observable<Barber[]>;
  private barbersMale: Observable<Barber[]>;
  private barbersFemale: Observable<Barber[]>;

  value: any

  constructor(public db: AngularFirestore, private firestore: AngularFirestore) {
    this.barbersCollection = db.collection<Barber>('barbers');

    this.barbers = this.barbersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
      }

  getBarbers() {
    return this.barbers;
  }


  getBarber(id) {
    return new Promise((resolve, reject) => {
      this.firestore.collection('barbers').doc(id).get()
          .subscribe(res => {
            resolve(res.data());
          }, (err) => {
            reject(err);
          });
    });
  }

  updateBarber(barber: Barber, id: string) {
    return this.barbersCollection.doc(id).update(barber);
  }

  addBarber(barber: Barber) {
    return this.barbersCollection.add(barber);
  }

  removeBarber(id) {
    return this.barbersCollection.doc(id).delete();
  }

  setValue(m){
    this.value = m
  }
  getValue(){
    return this.value
  }
}
