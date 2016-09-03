"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_model_1 = require('./field.model');
var DropdownField = (function (_super) {
    __extends(DropdownField, _super);
    function DropdownField(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'dropdown';
        this.options = [];
        this.options = options['options'] || [];
    }
    return DropdownField;
}(field_model_1.Field));
exports.DropdownField = DropdownField;
//# sourceMappingURL=field-dropdown.model.js.map