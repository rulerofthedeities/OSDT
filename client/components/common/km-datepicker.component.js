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
var KmDatepicker = (function () {
    function KmDatepicker() {
        this.dateModelChange = new core_1.EventEmitter();
        this.showDatepicker = false;
        this.init = true;
    }
    KmDatepicker.prototype.togglePopup = function () {
        this.init = true;
        this.showDatepicker = !this.showDatepicker;
    };
    KmDatepicker.prototype.dataChange = function (event) {
        if (!this.init) {
            this.showDatepicker = false;
        }
        this.init = false;
        this.dateModel = event;
        this.dateModelChange.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], KmDatepicker.prototype, "dateModel", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], KmDatepicker.prototype, "dateModelChange", void 0);
    KmDatepicker = __decorate([
        core_1.Component({
            selector: 'km-datepicker',
            template: "\n    <div class=\"input-group\" (click)=\"togglePopup()\">\n      <span class=\"input-group-addon\">\n        <span class=\"glyphicon glyphicon-calendar\"></span>\n      </span>\n      <div class=\"form-control\">{{dateModel | date:'longDate'}}</div>\n    </div>\n\n    <datepicker \n      *ngIf=\"showDatepicker\"\n      class=\"popup\"\n      [(ngModel)]=\"dateModel\" \n      showWeeks=\"true\" \n      (ngModelChange)=\"dataChange($event)\" >\n    </datepicker>\n",
            styles: ["\n  .popup {\n    position: absolute;\n    background-color: #fff;\n    border-radius: 3px;\n    border: 1px solid #ddd;\n    height: 251px;\n    z-index:2;\n  }\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], KmDatepicker);
    return KmDatepicker;
}());
exports.KmDatepicker = KmDatepicker;
