"use strict";
var Donation = (function () {
    function Donation(currency, amount, paymentType, dt, note) {
        this.currency = currency;
        this.amount = amount;
        this.paymentType = paymentType;
        this.dt = dt;
        this.note = note;
    }
    return Donation;
}());
exports.Donation = Donation;
//# sourceMappingURL=donation.model.js.map