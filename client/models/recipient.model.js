"use strict";
var Recipient = (function () {
    function Recipient(userId, name, description, categories, url, isActive, _id) {
        if (isActive === void 0) { isActive = true; }
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.url = url;
        this.isActive = isActive;
        this._id = _id;
    }
    return Recipient;
}());
exports.Recipient = Recipient;
