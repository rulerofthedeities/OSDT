"use strict";
var User = (function () {
    function User(email, password, confirmPassword, userName, defaultCurrency) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.userName = userName;
        this.defaultCurrency = defaultCurrency;
    }
    return User;
}());
exports.User = User;
