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
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth.service');
var Navbar = (function () {
    function Navbar(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isCollapsed = true;
    }
    Navbar.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    Navbar.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/auth/signin']);
    };
    Navbar.prototype.getUserName = function () {
        return this.authService.getUserName();
    };
    Navbar = __decorate([
        core_1.Component({
            selector: 'navbar',
            template: "\n  <div class=\"small text-right user\">{{getUserName()}}</div>\n  <nav role=\"navigation\" class=\"navbar navbar-default\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n    <div class=\"navbar-header\">\n      <button \n        type=\"button\" \n        data-target=\"#navbarCollapse\" \n        (click)=\"isCollapsed = !isCollapsed\" \n        class=\"navbar-toggle\"\n      >\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\">OSDT</a>\n    </div>\n    <!-- Collection of nav links and other content for toggling -->\n    <div \n      id=\"navbarCollapse\" \n      class=\"collapse navbar-collapse\" \n      [collapse]=\"isCollapsed\"\n    >\n      <ul class=\"nav navbar-nav\">\n        <li routerLinkActive=\"active\">\n          <a routerLink=\"dashboard\" class=\"item\">Dashboard</a>\n        </li>\n        <li routerLinkActive=\"active\">\n          <a routerLink=\"recipients\" class=\"item\">Recipients</a>\n        </li>\n        <li routerLinkActive=\"active\">\n          <a routerLink=\"donations\" class=\"item\">Donations</a>\n        </li>\n        <li routerLinkActive=\"active\">\n          <a routerLink=\"currencies\" class=\"item\">Currencies</a>\n        </li>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right loginout\">\n        <li *ngIf=\"!isLoggedIn()\" routerLinkActive=\"active\">\n          <a routerLink=\"auth\" class=\"item\">Login</a>\n        </li>\n        <li *ngIf=\"isLoggedIn()\" routerLinkActive=\"active\">\n          <a (click)=\"onLogout()\" class=\"item\">Logout</a>\n        </li>\n      </ul>\n    </div>\n  </nav>\n  ",
            styles: ["\n    .loginout {cursor: pointer;}\n    .user {\n      font-style: italic;\n      color:DarkGrey\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], Navbar);
    return Navbar;
}());
exports.Navbar = Navbar;
//# sourceMappingURL=navbar.component.js.map