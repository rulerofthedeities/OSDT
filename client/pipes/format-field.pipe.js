"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FormatFieldPipe = (function () {
    function FormatFieldPipe() {
    }
    FormatFieldPipe.prototype.transform = function (value, field) {
        var newValue = value;
        switch (field.controlType) {
            case 'dropdown':
                //find the value in the array of options
                var ddfield = field;
                var options = ddfield.options.filter(function (option) { return option.key === value; });
                if (options && options[0]) {
                    newValue = options[0].display;
                }
                break;
            case 'radio':
                //find the value in the array of buttons
                var rfield = field;
                var buttons = rfield.buttons.filter(function (option) { return option.key === value; });
                if (buttons && buttons[0]) {
                    newValue = buttons[0].display;
                }
                break;
        }
        return newValue;
    };
    FormatFieldPipe = __decorate([
        core_1.Pipe({ name: 'formatField' }), 
        __metadata('design:paramtypes', [])
    ], FormatFieldPipe);
    return FormatFieldPipe;
}());
exports.FormatFieldPipe = FormatFieldPipe;
//# sourceMappingURL=format-field.pipe.js.map