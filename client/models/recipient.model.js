"use strict";
var Recipient = (function () {
    function Recipient(userId, name, description, categories, isActive) {
        if (isActive === void 0) { isActive = true; }
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.isActive = isActive;
    }
    return Recipient;
}());
exports.Recipient = Recipient;
//# sourceMappingURL=recipient.model.js.map