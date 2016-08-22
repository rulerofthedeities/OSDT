import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HttpModule} from '@angular/http';

import {routing} from './routes';

import {AppComponent} from './components/app.component';
import {ErrorMessage} from './components/common/error-message.component';
import {Currency} from './components/currency.component';
import {Recipient} from './components/recipient.component';

import {CurrencyService} from './services/currency.service';
import {RecipientService} from './services/recipient.service';
import {ErrorService} from './services/error.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    CurrencyService,
    RecipientService,
    ErrorService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  declarations: [
    AppComponent,
    ErrorMessage,
    Currency,
    Recipient
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
