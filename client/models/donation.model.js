"use strict";
var DonationModel = (function () {
    function DonationModel(currency, amount, paymentType, dt, note) {
        this.currency = currency;
        this.amount = amount;
        this.paymentType = paymentType;
        this.dt = dt;
        this.note = note;
    }
    return DonationModel;
}());
exports.DonationModel = DonationModel;
//# sourceMappingURL=donation.model.js.map