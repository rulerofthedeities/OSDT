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
var routes_1 = require('./routes');
var auth_service_1 = require('./services/auth.service');
var currency_service_1 = require('./services/currency.service');
var recipient_service_1 = require('./services/recipient.service');
var error_service_1 = require('./services/error.service');
var equal_validator_directive_1 = require('./directives/equal-validator.directive');
var email_validator_directive_1 = require('./directives/email-validator.directive');
var app_component_1 = require('./components/app.component');
var error_message_component_1 = require('./components/common/error-message.component');
var currency_component_1 = require('./components/currency.component');
var recipient_component_1 = require('./components/recipient.component');
var auth_menu_component_1 = require('./components/auth/auth-menu.component');
var sign_up_component_1 = require('./components/auth/sign-up.component');
var sign_in_component_1 = require('./components/auth/sign-in.component');
var log_out_component_1 = require('./components/auth/log-out.component');
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
                router_1.RouterModule.forRoot(routes_1.routes)
            ],
            providers: [
                currency_service_1.CurrencyService,
                recipient_service_1.RecipientService,
                error_service_1.ErrorService,
                auth_service_1.AuthService
            ],
            declarations: [
                app_component_1.AppComponent,
                error_message_component_1.ErrorMessage,
                currency_component_1.Currency,
                recipient_component_1.Recipient,
                equal_validator_directive_1.EqualValidator,
                email_validator_directive_1.EmailValidator,
                auth_menu_component_1.AuthMenu,
                sign_up_component_1.SignUp,
                sign_in_component_1.SignIn,
                log_out_component_1.LogOut
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map