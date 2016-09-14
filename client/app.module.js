"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var routes_1 = require('./routes');
var auth_service_1 = require('./services/auth.service');
var currency_service_1 = require('./services/currency.service');
var recipient_service_1 = require('./services/recipient.service');
var donation_service_1 = require('./services/donation.service');
var error_service_1 = require('./services/error.service');
var fields_service_1 = require('./services/fields.service');
var validation_service_1 = require('./services/validation.service');
var format_field_pipe_1 = require('./pipes/format-field.pipe');
var equal_validator_directive_1 = require('./directives/equal-validator.directive');
var email_validator_directive_1 = require('./directives/email-validator.directive');
var app_component_1 = require('./components/app.component');
var navbar_component_1 = require('./components/navbar.component');
var error_message_component_1 = require('./components/common/error-message.component');
var auto_form_field_component_1 = require('./components/common/auto-form-field.component');
var auto_form_read_component_1 = require('./components/common/auto-form-read.component');
var auto_form_component_1 = require('./components/common/auto-form.component');
var currencies_component_1 = require('./components/currencies.component');
var recipients_component_1 = require('./components/recipients.component');
var recipient_component_1 = require('./components/recipient.component');
var donations_component_1 = require('./components/donations.component');
var donations_embedded_component_1 = require('./components/donations-embedded.component');
var donation_component_1 = require('./components/donation.component');
var donation_new_recipient_component_1 = require('./components/donation-new-recipient.component');
var auth_menu_component_1 = require('./components/auth/auth-menu.component');
var sign_up_component_1 = require('./components/auth/sign-up.component');
var sign_in_component_1 = require('./components/auth/sign-in.component');
var log_out_component_1 = require('./components/auth/log-out.component');
var field_messages_component_1 = require('./components/common/field-messages.component');
var km_datepicker_component_1 = require('./components/common/km-datepicker.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                ng2_bootstrap_1.Ng2BootstrapModule,
                router_1.RouterModule.forRoot(routes_1.routes)
            ],
            providers: [
                currency_service_1.CurrencyService,
                recipient_service_1.RecipientService,
                donation_service_1.DonationService,
                error_service_1.ErrorService,
                auth_service_1.AuthService,
                fields_service_1.FieldsService,
                validation_service_1.ValidationService,
                { provide: forms_1.NG_VALIDATORS, useExisting: core_1.forwardRef(function () { return email_validator_directive_1.EmailValidator; }), multi: true }
            ],
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.Navbar,
                error_message_component_1.ErrorMessage,
                currencies_component_1.Currencies,
                recipients_component_1.Recipients,
                recipient_component_1.EditRecipient,
                donations_component_1.Donations,
                donations_embedded_component_1.EmbeddedDonations,
                donation_component_1.EditDonation,
                donation_new_recipient_component_1.DonationNewRecipient,
                equal_validator_directive_1.EqualValidator,
                email_validator_directive_1.EmailValidator,
                field_messages_component_1.FieldMessages,
                auth_menu_component_1.AuthMenu,
                sign_up_component_1.SignUp,
                sign_in_component_1.SignIn,
                log_out_component_1.LogOut,
                auto_form_field_component_1.AutoFormField,
                auto_form_read_component_1.AutoFormRead,
                auto_form_component_1.AutoForm,
                format_field_pipe_1.FormatFieldPipe,
                km_datepicker_component_1.KmDatepicker
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map