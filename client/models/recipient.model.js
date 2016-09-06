"use strict";
var Recipient = (function () {
    function Recipient(userId, name, _id) {
        this.userId = userId;
        this.name = name;
        this._id = _id;
        this.isActive = true;
    }
    return Recipient;
}());
exports.Recipient = Recipient;
//# sourceMappingURL=recipient.model.js.map