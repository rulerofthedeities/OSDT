"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_model_1 = require('./field.model');
var TextareaField = (function (_super) {
    __extends(TextareaField, _super);
    function TextareaField(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'textarea';
        this.rows = options['rows'] || 3;
        this.cols = options['cols'] || 10;
    }
    return TextareaField;
}(field_model_1.Field));
exports.TextareaField = TextareaField;
