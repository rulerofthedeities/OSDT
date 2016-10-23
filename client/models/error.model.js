"use strict";
var Error = (function () {
    function Error(title, message, details) {
        this.title = title;
        this.message = message;
        this.details = details;
    }
    return Error;
}());
exports.Error = Error;
