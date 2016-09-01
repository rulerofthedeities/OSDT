import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import {routes} from './routes';

import {AuthService} from './services/auth.service';
import {CurrencyService} from './services/currency.service';
import {RecipientService} from './services/recipient.service';
import {ErrorService} from './services/error.service';

import {EqualValidator} from './directives/equal-validator.directive';
import {EmailValidator} from './directives/email-validator.directive';

import {AppComponent} from './components/app.component';
import {ErrorMessage} from './components/common/error-message.component';
import {Currency} from './components/currency.component';
import {Recipient} from './components/recipient.component';
import {AuthMenu} from './components/auth/auth-menu.component';
import {SignUp} from './components/auth/sign-up.component';
import {SignIn} from './components/auth/sign-in.component';
import {LogOut} from './components/auth/log-out.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CurrencyService,
    RecipientService,
    ErrorService,
    AuthService
  ],
  declarations: [
    AppComponent,
    ErrorMessage,
    Currency,
    Recipient,
    EqualValidator,
    EmailValidator,
    AuthMenu,
    SignUp,
    SignIn,
    LogOut
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
