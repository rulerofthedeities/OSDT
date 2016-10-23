"use strict";
var core_1 = require('@angular/core');
var error_model_1 = require('../models/error.model');
var ErrorService = (function () {
    function ErrorService() {
        this.errorOccurred = new core_1.EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        console.log('Error:', error);
        var msg = 'unknown error message';
        var title = 'error';
        if (error && error.error) {
            msg = error.error.error || msg;
            title = error.title || title;
        }
        this.errorOccurred.emit(new error_model_1.Error(title, msg));
    };
    return ErrorService;
}());
exports.ErrorService = ErrorService;
