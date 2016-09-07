"use strict";
var Recipient = (function () {
    function Recipient(userId, name, description, categories, isActive, _id) {
        if (isActive === void 0) { isActive = true; }
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.isActive = isActive;
        this._id = _id;
    }
    return Recipient;
}());
exports.Recipient = Recipient;
//# sourceMappingURL=recipient.model.js.map