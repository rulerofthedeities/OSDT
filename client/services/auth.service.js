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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var angular2_jwt_1 = require('angular2-jwt');
require('rxjs/Rx');
var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.accessLocal = null;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AuthService.prototype.getToken = function () {
        return localStorage.getItem('km-osdt.token');
    };
    AuthService.prototype.signup = function (user) {
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/user/signup', body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    AuthService.prototype.signin = function (user) {
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.post('/api/user/signin', body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
    };
    AuthService.prototype.signedIn = function (data) {
        var userData, userAccess = { level: 1, roles: [] }, decoded = this.jwtHelper.decodeToken(data.token);
        userData = {
            token: data.token,
            userId: decoded.user._id,
            userName: decoded.user.userName
        };
        userAccess = {
            level: decoded.user.access.level,
            roles: decoded.user.access.roles
        };
        this.storeUserData(userData);
        this.setUserAccess(userAccess);
        this.router.navigateByUrl('/');
    };
    AuthService.prototype.logout = function () {
        this.clearStorage();
        this.router.navigate(['/auth/signin']);
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('km-osdt.token') !== null;
    };
    AuthService.prototype.getUserName = function () {
        return localStorage.getItem('km-osdt.userName');
    };
    AuthService.prototype.setUserAccess = function (data) {
        this.accessLocal = data;
    };
    AuthService.prototype.getUserAccess = function () {
        return this.accessLocal;
    };
    AuthService.prototype.fetchUserAccess = function () {
        var token = this.getToken();
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
        return this.http.get('/api/user/access', { headers: headers, body: '' })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    AuthService.prototype.hasRole = function (role) {
        var access = this.getUserAccess();
        var hasRole = false;
        if (access && access.roles) {
            for (var i = 0; i < access.roles.length; i++) {
                if (access.roles[i] === role) {
                    hasRole = true;
                }
            }
        }
        return hasRole;
    };
    AuthService.prototype.storeUserData = function (data) {
        localStorage.setItem('km-osdt.token', data.token);
        localStorage.setItem('km-osdt.userId', data.userId);
        localStorage.setItem('km-osdt.userName', data.userName);
    };
    AuthService.prototype.clearStorage = function () {
        localStorage.removeItem('km-osdt.token');
        localStorage.removeItem('km-osdt.userId');
        localStorage.removeItem('km-osdt.userName');
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map