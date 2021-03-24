import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from '../../app/providers/user-data';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any

  constructor(public http: HttpClient, public user: UserData) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/data.json')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking barbers to sessions
    this.data = data;

    // loop through each day in the schedule
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each session in the timeline group
        group.sessions.forEach((session: any) => {
          session.barbers = [];
          if (session.barberNames) {
            session.barberNames.forEach((barberName: any) => {
              const barber = this.data.barbers.find(
                (s: any) => s.name === barberName
              );
              if (barber) {
                session.barbers.push(barber);
                barber.sessions = barber.sessions || [];
                barber.sessions.push(session);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Weeves',
      image: '../../assets/categories/download.jpeg'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Nails',
      image: '../../assets/categories/nails.jpeg'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Accesories',
      image: '../../assets/categories/images.jpeg'
    }

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Comb',
      price: 55,
      image: '../../assets/products/download (1).jpeg'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Brazzilian Hair',
      price: 34,
      image: '../../assets/products/71z6j1Acr8L._SL1100_.jpg'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Shaving Machine',
      price: 40,
      image: '../../assets/product-slider/bf30b757b3bed5358a740e54271bde0e.jpg'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Weeves',
      price: 55,
      image: '../../assets/categories/download.jpeg'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Braids',
      price: 34,
      image: '../../assets/products/71LNQuh-LvL._SY355_.jpg'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Raster',
      price: 40,
      image: '../../assets/download.jpeg'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }
  getTimeline(
    dayIndex: number,
    queryText = '',
    excludeTracks: any[] = [],
    segment = 'all'
  ) {
    return this.load().pipe(
      map((data: any) => {
        const day = data.schedule[dayIndex];
        day.shownSessions = 0;

        queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

        day.groups.forEach((group: any) => {
          group.hide = true;

          group.sessions.forEach((session: any) => {
            // check if this session should show or not
            this.filterSession(session, queryWords, excludeTracks, segment);

            if (!session.hide) {
              // if this session is not hidden then this group should show
              group.hide = false;
              day.shownSessions++;
            }
          });
        });

        return day;
      })
    );
  }

  filterSession(
    session: any,
    queryWords: string[],
    excludeTracks: any[],
    segment: string
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }
}
