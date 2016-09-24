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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var auth_service_1 = require('../services/auth.service');
var ProtectedDirective = (function () {
    function ProtectedDirective(authService, router, location) {
        this.authService = authService;
        this.router = router;
        this.location = location;
    }
    ProtectedDirective.prototype.ngOnInit = function () {
        if (!this.authService.isLoggedIn()) {
            this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            this.router.navigate(['/auth/signin']);
        }
    };
    ProtectedDirective = __decorate([
        core_1.Directive({
            selector: '[protected]'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, common_1.Location])
    ], ProtectedDirective);
    return ProtectedDirective;
}());
exports.ProtectedDirective = ProtectedDirective;
//# sourceMappingURL=protected.directive.js.map