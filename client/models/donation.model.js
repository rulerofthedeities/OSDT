"use strict";
var Donation = (function () {
    function Donation(currency, amount, paymentType, dtPaid, note, _id) {
        this.currency = currency;
        this.amount = amount;
        this.paymentType = paymentType;
        this.dtPaid = dtPaid;
        this.note = note;
        this._id = _id;
    }
    return Donation;
}());
exports.Donation = Donation;
