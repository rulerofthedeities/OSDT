"use strict";
var router_1 = require('@angular/router');
var currency_component_1 = require('./components/currency.component');
var recipient_component_1 = require('./components/recipient.component');
var routes = [
    { path: '', component: recipient_component_1.Recipient },
    { path: 'currencies', component: currency_component_1.Currency }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=routes.js.map