"use strict";
var RecipientModel = (function () {
    function RecipientModel(userId, name, description, categories, donations, reminder) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.categories = categories;
        this.donations = donations;
        this.reminder = reminder;
    }
    return RecipientModel;
}());
exports.RecipientModel = RecipientModel;
//# sourceMappingURL=recipient.model.js.map