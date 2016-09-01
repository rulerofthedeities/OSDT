"use strict";
var UserModel = (function () {
    function UserModel(email, password, confirmPassword, userName, defaultCurrency) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.userName = userName;
        this.defaultCurrency = defaultCurrency;
    }
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map