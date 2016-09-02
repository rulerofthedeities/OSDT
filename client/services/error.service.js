"use strict";
var core_1 = require('@angular/core');
var error_model_1 = require('../models/error.model');
var ErrorService = (function () {
    function ErrorService() {
        this.errorOccurred = new core_1.EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        console.log('error', error);
        var msg = 'unknown error message';
        var err = 'unknown error';
        if (error.error) {
            msg = error.error.message;
            err = error.error;
            this.errorOccurred.emit(new error_model_1.Error(error.title, msg, err));
        }
    };
    return ErrorService;
}());
exports.ErrorService = ErrorService;
//# sourceMappingURL=error.service.js.map