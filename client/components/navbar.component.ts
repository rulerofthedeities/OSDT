import {Component} from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
  <nav role="navigation" class="navbar navbar-default">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand">OSDT</a>
    </div>
    <!-- Collection of nav links and other content for toggling -->
    <div id="navbarCollapse" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li routerLinkActive="active">
          <a routerLink="recipients" class="item">
            Recipients
          </a>
        </li>
        <li routerLinkActive="active">
          <a routerLink="donations" class="item">
            Donations
          </a>
        </li>
        <li routerLinkActive="active">
          <a routerLink="currencies" class="item">
            Currencies
          </a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Login</a></li>
      </ul>
    </div>
  </nav>
  `
})

export class Navbar { }
