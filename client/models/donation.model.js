"use strict";
var Donation = (function () {
    function Donation(currency, amount, paymentType, dtPaid, note, recipientId) {
        this.currency = currency;
        this.amount = amount;
        this.paymentType = paymentType;
        this.dtPaid = dtPaid;
        this.note = note;
        this.recipientId = recipientId;
    }
    return Donation;
}());
exports.Donation = Donation;
//# sourceMappingURL=donation.model.js.map