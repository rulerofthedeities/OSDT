import {Component} from '@angular/core';

@Component({
  selector: 'osdt',
  template: `
    <h2>OSDT</h2>
    <router-outlet></router-outlet>
    <error-msg></error-msg>
  `
})

export class AppComponent {}
