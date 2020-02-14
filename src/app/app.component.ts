import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-refresher';
  // persons: string[] = ['Carmen', 'Chico', 'Alberto']; Move to the persons.sevice

  // We don't need this method here anymore:
  /*
  onPersonCreated(name: string){
    this.persons.push(name);
  }
  */
}
