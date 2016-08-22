"use strict";
var core_1 = require('@angular/core');
var error_model_1 = require('../models/error.model');
var ErrorService = (function () {
    function ErrorService() {
        this.errorOccurred = new core_1.EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        var errMsg = JSON.parse(error._body);
        var errorData = new error_model_1.Error(errMsg.title, errMsg.error.message);
        this.errorOccurred.emit(errorData);
    };
    return ErrorService;
}());
exports.ErrorService = ErrorService;
//# sourceMappingURL=error.service.js.map