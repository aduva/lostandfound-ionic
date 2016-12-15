import { Component } from '@angular/core';

/*
  Generated class for the Locator component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'locator',
  templateUrl: 'locator.html'
})
export class LocatorComponent {

  text: string;

  constructor() {
    console.log('Hello Locator Component');
    this.text = 'Hello World';
  }

}
