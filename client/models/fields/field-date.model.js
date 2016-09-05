"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_model_1 = require('./field.model');
var DateField = (function (_super) {
    __extends(DateField, _super);
    function DateField(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'date';
        this.minDate = options['minDate'] || [];
    }
    return DateField;
}(field_model_1.Field));
exports.DateField = DateField;
//# sourceMappingURL=field-date.model.js.map