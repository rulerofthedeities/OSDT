import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule} from '@angular/http';

import {routing} from './routes';

import {AppComponent} from './components/app.component';
import {Demo} from './components/demo.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  declarations: [
    AppComponent,
    Demo
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
