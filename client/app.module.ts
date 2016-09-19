import {NgModule, forwardRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule, NG_VALIDATORS} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';

import {routes} from './routes';

import {AuthService} from './services/auth.service';
import {CurrencyService} from './services/currency.service';
import {RecipientService} from './services/recipient.service';
import {DonationService} from './services/donation.service';
import {DashboardService} from './services/dashboard.service';
import {ErrorService} from './services/error.service';
import {FieldsService} from './services/fields.service';
import {ValidationService} from './services/validation.service';
import {XchangeService} from './services/xchange.service';
import {SettingsService} from './services/settings.service';

import {CurrenciesResolver} from './resolves/currencies.resolver';

import {FormatFieldPipe} from './pipes/format-field.pipe';

import {EqualValidator} from './directives/equal-validator.directive';
import {EmailValidator} from './directives/email-validator.directive';

import {AppComponent} from './components/app.component';
import {Navbar} from './components/navbar.component';
import {ErrorMessage} from './components/common/error-message.component';
import {AutoFormField} from './components/common/auto-form-field.component';
import {AutoFormRead} from './components/common/auto-form-read.component';
import {AutoForm} from './components/common/auto-form.component';
import {Currencies} from './components/currencies.component';
import {Dashboard} from './components/dashboard.component';
import {Recipients} from './components/recipients.component';
import {EditRecipient} from './components/recipient.component';
import {Donations} from './components/donations.component';
import {EmbeddedDonations} from './components/donations-embedded.component';
import {EditDonation} from './components/donation.component';
import {DonationNewRecipient} from './components/donation-new-recipient.component';
import {AuthMenu} from './components/auth/auth-menu.component';
import {SignUp} from './components/auth/sign-up.component';
import {SignIn} from './components/auth/sign-in.component';
import {LogOut} from './components/auth/log-out.component';
import {FieldMessages} from './components/common/field-messages.component';
import {KmDatepicker} from './components/common/km-datepicker.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2BootstrapModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CurrencyService,
    RecipientService,
    DonationService,
    DashboardService,
    ErrorService,
    AuthService,
    FieldsService,
    XchangeService,
    ValidationService,
    SettingsService,
    CurrenciesResolver,
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true}
  ],
  declarations: [
    AppComponent,
    Navbar,
    ErrorMessage,
    Currencies,
    Dashboard,
    Recipients,
    EditRecipient,
    Donations,
    EmbeddedDonations,
    EditDonation,
    DonationNewRecipient,
    EqualValidator,
    EmailValidator,
    FieldMessages,
    AuthMenu,
    SignUp,
    SignIn,
    LogOut,
    AutoFormField,
    AutoFormRead,
    AutoForm,
    FormatFieldPipe,
    KmDatepicker
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
