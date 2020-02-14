// import { Component, Input } from '@angular/core'; Input is not needed here because of the services
import { Component, OnInit, OnDestroy} from '@angular/core';

import { PersonsService } from './persons.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy{
  // @Input() personList: string[];
  personList: string[];
  isFetching = false;
  // private personService: PersonsService;
  private personListSubs: Subscription;

  // *IMPORTANT NOTE: With private before the param name, it will be created a private property
  // for the class automatically
  constructor(private prsService: PersonsService) {
    // Not recommened to do this here:
    // this.personList = prsService.persons;
    // this.personService = prsService;
  }

  ngOnInit() {
    // Commented because we will use HttpClient -> swapi.co
    // this.personList = this.prsService.persons;
    // this.prsService.fetchPersons();

    // Set up a listener to the prsService personChanged subject by calling subscribe(), for
    // listening to new values
    // We have to set up the subscription BEFORE we send it (fetchPersons call)
    this.personListSubs = this.prsService.personsChanged.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    });
    this.isFetching = true;
    this.prsService.fetchPersons();
  }

  ngOnDestroy() {
    // For preventing memory leaks
    this.personListSubs.unsubscribe();
  }

  onRemovePerson(personName: string) {
    this.prsService.removePerson(personName);
  }
}
