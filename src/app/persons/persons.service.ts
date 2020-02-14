import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PersonsService {
  // Moved from app.component.ts to here:

    // It will hold the full list of persons (string[])
  personsChanged = new Subject<string[]>(); // Similar to event emitters.
  persons: string[] = ['Carmen', 'Chico', 'Alberto'];

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
