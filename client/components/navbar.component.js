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
var error_service_1 = require('../services/error.service');
var Navbar = (function () {
    function Navbar(authService, errorService, route) {
        this.authService = authService;
        this.errorService = errorService;
        this.route = route;
        this.isCollapsed = true;
        this.showAccess = false;
    }
    Navbar.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    Navbar.prototype.onLogout = function () {
        this.authService.logout();
    };
    Navbar.prototype.getUserName = function () {
        return this.authService.getUserName();
    };
    Navbar.prototype.getUserAccess = function () {
        var _this = this;
        this.showAccess = !this.showAccess;
        if (this.showAccess) {
            this.access = this.authService.getUserAccess();
            if (!this.access) {
                this.authService.fetchUserAccess().subscribe(function (access) { _this.authService.setUserAccess(access); _this.access = access; }, function (error) { return _this.errorService.handleError(error); });
            }
        }
    };
    Navbar = __decorate([
        core_1.Component({
            selector: 'navbar',
            template: "\n  <div class=\"row\">\n    <div class=\"small text-right user\" \n      *ngIf=\"isLoggedIn()\"\n      (click)=\"getUserAccess()\">\n      <span class=\"fa\" [ngClass]=\"{'fa-chevron-right':!showAccess, 'fa-chevron-down':showAccess}\"></span>\n      {{getUserName()}}\n      <div *ngIf=\"showAccess\" id=\"accesswrapper\">\n        <ul class=\"list-unstyled\">\n          <li><strong>level</strong>: {{access?.level | levelName}}</li>\n          <li><strong>roles</strong>: {{access?.roles?.length > 0 ? access?.roles.join(', ') : 'no roles'}}</li>\n        </ul>\n      </div>\n    </div>\n    <nav role=\"navigation\" class=\"navbar navbar-default\">\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header\">\n        <button \n          type=\"button\" \n          data-target=\"#navbarCollapse\" \n          (click)=\"isCollapsed = !isCollapsed\" \n          class=\"navbar-toggle\"\n        >\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\">\n          <img src=\"assets/img/osdt_logo.png\" alt=\"OSDT\" id=\"logo\">OSDT\n        </a>\n      </div>\n      <!-- Collection of nav links and other content for toggling -->\n      <div \n        id=\"navbarCollapse\" \n        class=\"collapse navbar-collapse\" \n        [collapse]=\"isCollapsed\"\n      >\n        <ul class=\"nav navbar-nav\">\n          <li routerLinkActive=\"active\">\n            <a routerLink=\"dashboard\" class=\"item\">Dashboard</a>\n          </li>\n          <li routerLinkActive=\"active\">\n            <a routerLink=\"recipients\" class=\"item\">Recipients</a>\n          </li>\n          <li routerLinkActive=\"active\">\n            <a routerLink=\"donations\" class=\"item\">Donations</a>\n          </li>\n          <li routerLinkActive=\"active\">\n            <a routerLink=\"currencies\" class=\"item\">Currencies</a>\n          </li>\n        </ul>\n        <ul class=\"nav navbar-nav navbar-right loginout\">\n          <li *ngIf=\"!isLoggedIn()\" routerLinkActive=\"active\">\n            <a routerLink=\"auth\" class=\"item\">Login</a>\n          </li>\n          <li *ngIf=\"isLoggedIn()\" routerLinkActive=\"active\">\n            <a (click)=\"onLogout()\" class=\"item\">Logout</a>\n          </li>\n        </ul>\n      </div>\n    </nav>\n  </div>\n  ",
            styles: ["\n    #logo {\n      width: 32px;\n      height: 32px;\n      float: left;\n      margin-right: 10px;\n      top:-6px;\n      position:relative;\n    }\n    .loginout {cursor: pointer;}\n    .user {\n      font-style: italic;\n      color:DarkGrey;\n      cursor: pointer;\n    }\n    .nav li a {\n      line-height: 50px;\n      height: 50px;\n      font-size: 1.5em;\n      padding-top: 0;\n    }\n    #accesswrapper {\n      color:white;\n      z-index:3;\n      position: absolute;\n      width:120px;\n      display: inline;\n    }\n    #accesswrapper > ul {\n      background-color:white;\n      border: 1px solid black;\n      color:black;\n      position: relative;\n      left:-120px;\n      top:16px;\n      padding:6px;\n      border-radius: 5px;\n      text-align:left;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, error_service_1.ErrorService, router_1.ActivatedRoute])
    ], Navbar);
    return Navbar;
}());
exports.Navbar = Navbar;
//# sourceMappingURL=navbar.component.js.map