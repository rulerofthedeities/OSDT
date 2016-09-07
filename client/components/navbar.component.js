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
var Navbar = (function () {
    function Navbar() {
    }
    Navbar = __decorate([
        core_1.Component({
            selector: 'navbar',
            template: "\n  <nav role=\"navigation\" class=\"navbar navbar-default\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button type=\"button\" data-target=\"#navbarCollapse\" data-toggle=\"collapse\" class=\"navbar-toggle\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\">OSDT</a>\n    </div>\n    <!-- Collection of nav links and other content for toggling -->\n    <div id=\"navbarCollapse\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li routerLinkActive=\"active\">\n          <a routerLink=\"recipients\" class=\"item\">\n            Recipients\n          </a>\n        </li>\n        <li routerLinkActive=\"active\">\n          <a routerLink=\"donations\" class=\"item\">\n            Donations\n          </a>\n        </li>\n        <li routerLinkActive=\"active\">\n          <a routerLink=\"currencies\" class=\"item\">\n            Currencies\n          </a>\n        </li>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#\">Login</a></li>\n      </ul>\n    </div>\n  </nav>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Navbar);
    return Navbar;
}());
exports.Navbar = Navbar;
//# sourceMappingURL=navbar.component.js.map