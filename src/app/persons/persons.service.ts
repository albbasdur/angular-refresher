import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PersonsService {
  // Moved from app.component.ts to here:

    // It will hold the full list of persons (string[])
  personsChanged = new Subject<string[]>(); // Similar to event emitters.
  // persons: string[] = ['Carmen', 'Chico', 'Alberto'];
  // persons: string[];
  persons: string[] = [];

    // We can use http private object which has been created when it is declared here
    // We will use it to fetch persons
  constructor(private http: HttpClient) {}

  fetchPersons() {
    /*
    this.http.get<any>('https://swapi.co/api/people').subscribe(resData => {
      console.log(resData);
    });
    */
    this.http
      .get<any>('https://swapi.co/api/people')
      .pipe(map(resData => {
                          // This 'map' is the NORMAL map method from JS,
                          // not the map above in the pipe
        return resData.results.map(character => character.name);
          // this will return only the field 'name' in an array of string
          // from the object requested
      }))
      .subscribe(transformedData => {
        console.log(transformedData);
        this.personsChanged.next(transformedData);
        // NOTE: With this http added, we can no longer add persons, because whenever we reload
        // the persons component which does call fectchPersons, we overwrite the old
        // persons or we emit our new persons which are only the ones we fetched
      });
  }

  addPerson(name: string) {
    this.persons.push(name);
    // console.log(this.persons);
    this.personsChanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => {
      return person !== name;
    });
    // console.log(this.persons);
    this.personsChanged.next(this.persons);
  }
}
