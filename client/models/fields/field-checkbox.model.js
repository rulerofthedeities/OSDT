"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_model_1 = require('./field.model');
var CheckboxField = (function (_super) {
    __extends(CheckboxField, _super);
    function CheckboxField(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'checkbox';
        this.display = options['display'] || '';
    }
    return CheckboxField;
}(field_model_1.Field));
exports.CheckboxField = CheckboxField;
