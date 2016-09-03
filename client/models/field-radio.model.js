"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_model_1 = require('./field.model');
var RadioField = (function (_super) {
    __extends(RadioField, _super);
    function RadioField(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'radio';
        this.buttons = [];
        this.buttons = options['buttons'] || [];
    }
    return RadioField;
}(field_model_1.Field));
exports.RadioField = RadioField;
//# sourceMappingURL=field-radio.model.js.map