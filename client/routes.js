"use strict";
var currencies_component_1 = require('./components/currencies.component');
var recipients_component_1 = require('./components/recipients.component');
var donations_component_1 = require('./components/donations.component');
var edit_donation_component_1 = require('./components/edit-donation.component');
var sign_up_component_1 = require('./components/auth/sign-up.component');
var sign_in_component_1 = require('./components/auth/sign-in.component');
var log_out_component_1 = require('./components/auth/log-out.component');
var auth_menu_component_1 = require('./components/auth/auth-menu.component');
exports.routes = [
    { path: '', component: recipients_component_1.Recipients },
    { path: 'recipients', component: recipients_component_1.Recipients },
    { path: 'currencies', component: currencies_component_1.Currencies },
    { path: 'donations', component: donations_component_1.Donations },
    { path: 'donation', component: edit_donation_component_1.EditDonation },
    {
        path: 'auth',
        component: auth_menu_component_1.AuthMenu,
        children: [
            {
                path: '',
                redirectTo: '/auth/signup',
                pathMatch: 'full',
                component: auth_menu_component_1.AuthMenu
            },
            { path: 'signup', component: sign_up_component_1.SignUp },
            { path: 'signin', component: sign_in_component_1.SignIn },
            { path: 'logout', component: log_out_component_1.LogOut }
        ]
    },
];
//# sourceMappingURL=routes.js.map