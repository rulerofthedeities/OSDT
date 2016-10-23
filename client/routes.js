"use strict";
var currencies_component_1 = require('./components/currencies.component');
var recipients_component_1 = require('./components/recipients.component');
var donations_component_1 = require('./components/donations.component');
var dashboard_component_1 = require('./components/dashboard.component');
var sign_up_component_1 = require('./components/auth/sign-up.component');
var sign_in_component_1 = require('./components/auth/sign-in.component');
var auth_menu_component_1 = require('./components/auth/auth-menu.component');
var access_resolver_1 = require('./resolves/access.resolver');
var currencies_resolver_1 = require('./resolves/currencies.resolver');
var auth_guard_service_1 = require('./services/auth-guard.service');
exports.routes = [
    { path: '', component: dashboard_component_1.Dashboard, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'dashboard', component: dashboard_component_1.Dashboard, canActivate: [auth_guard_service_1.AuthGuard] },
    {
        path: 'recipients',
        component: recipients_component_1.Recipients,
        resolve: { access: access_resolver_1.AccessResolver },
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'recipients/donations/:id',
        component: recipients_component_1.Recipients,
        resolve: { access: access_resolver_1.AccessResolver },
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'donations',
        component: donations_component_1.Donations,
        resolve: { currencies: currencies_resolver_1.CurrenciesResolver, access: access_resolver_1.AccessResolver },
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'donations/:id',
        component: donations_component_1.Donations,
        resolve: { currencies: currencies_resolver_1.CurrenciesResolver },
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'currencies',
        component: currencies_component_1.Currencies,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
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
            { path: 'signin', component: sign_in_component_1.SignIn }
        ]
    }
];
