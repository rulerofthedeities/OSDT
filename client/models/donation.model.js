"use strict";
var Donation = (function () {
    function Donation(currency, amount, paymentType, dtPaid, note, rates, _id) {
        this.currency = currency;
        this.amount = amount;
        this.paymentType = paymentType;
        this.dtPaid = dtPaid;
        this.note = note;
        this.rates = rates;
        this._id = _id;
    }
    return Donation;
}());
exports.Donation = Donation;
//# sourceMappingURL=donation.model.js.map