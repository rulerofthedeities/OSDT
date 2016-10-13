import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';

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

export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    let timer = Observable.timer(30000, 3600000); //Start after 30 secs, then check every hour
    timer.subscribe(
      t => {this.authService.keepTokenFresh();}
    );
  }

}
