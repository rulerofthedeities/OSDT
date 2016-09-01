"use strict";
var currency_component_1 = require('./components/currency.component');
var recipient_component_1 = require('./components/recipient.component');
var sign_up_component_1 = require('./components/auth/sign-up.component');
var sign_in_component_1 = require('./components/auth/sign-in.component');
var log_out_component_1 = require('./components/auth/log-out.component');
var auth_menu_component_1 = require('./components/auth/auth-menu.component');
exports.routes = [
    { path: '', component: recipient_component_1.Recipient },
    { path: 'recipients', component: recipient_component_1.Recipient },
    { path: 'currencies', component: currency_component_1.Currency },
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