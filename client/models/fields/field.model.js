"use strict";
var Field = (function () {
    function Field(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.placeholder = options.placeholder || '';
        this.display = options.display || '';
        this.required = !!options.required;
        this.readonly = !!options.readonly;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
    return Field;
}());
exports.Field = Field;
//# sourceMappingURL=field.model.js.map