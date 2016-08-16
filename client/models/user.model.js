"use strict";
var UserModel = (function () {
    function UserModel(email, password, name, defaultCurrency) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.defaultCurrency = defaultCurrency;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map