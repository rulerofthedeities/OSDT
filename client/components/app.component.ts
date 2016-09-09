import {Component} from '@angular/core';

@Component({
  selector: 'osdt',
  template: `
    <div class="container">
      <navbar></navbar>
      <router-outlet></router-outlet>
      <error-msg></error-msg>
    </div>
  `
})

export class AppComponent { }
