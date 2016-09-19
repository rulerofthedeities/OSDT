"use strict";
var currencies_component_1 = require('./components/currencies.component');
var recipients_component_1 = require('./components/recipients.component');
var donations_component_1 = require('./components/donations.component');
var dashboard_component_1 = require('./components/dashboard.component');
var sign_up_component_1 = require('./components/auth/sign-up.component');
var sign_in_component_1 = require('./components/auth/sign-in.component');
var log_out_component_1 = require('./components/auth/log-out.component');
var auth_menu_component_1 = require('./components/auth/auth-menu.component');
var currencies_resolver_1 = require('./resolves/currencies.resolver');
exports.routes = [
    { path: '', component: dashboard_component_1.Dashboard },
    { path: 'dashboard', component: dashboard_component_1.Dashboard },
    { path: 'recipients', component: recipients_component_1.Recipients },
    { path: 'recipients/donations/:id', component: recipients_component_1.Recipients },
    { path: 'donations', component: donations_component_1.Donations, resolve: { currencies: currencies_resolver_1.CurrenciesResolver } },
    { path: 'donations/:id', component: donations_component_1.Donations, resolve: { currencies: currencies_resolver_1.CurrenciesResolver } },
    { path: 'currencies', component: currencies_component_1.Currencies },
    {
        path: 'auth',
        component: auth_menu_component_1.AuthMenu,
        children: [
            {
                path: '',
                redirectTo: '/auth/signin',
                pathMatch: 'full',
                component: auth_menu_component_1.AuthMenu
            },
            { path: 'signup', component: sign_up_component_1.SignUp },
            { path: 'signin', component: sign_in_component_1.SignIn },
            { path: 'logout', component: log_out_component_1.LogOut }
        ]
    }
];
//# sourceMappingURL=routes.js.map