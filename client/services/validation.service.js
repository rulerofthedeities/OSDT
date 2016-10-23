"use strict";
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (label, validatorName, validatorValue) {
        var config = {
            'required': label + ' is required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address. Format should be john@doe.com.',
            'minlength': label + " must be at least " + validatorValue.requiredLength + " characters long.",
            'invalidPassword': ("Invalid password. Password must be at least " + validatorValue.requiredLength)
                + " characters long, and contain a number.",
            'usernameTaken': "This username is not available. Please choose another username.",
            'emailTaken': "This email address is not available. Please choose another email.",
            'recipientTaken': "This recipient already exists."
        };
        return config[validatorName];
    };
    ValidationService.creditCardValidator = function (control) {
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { 'invalidCreditCard': true };
        }
    };
    ValidationService.emailValidator = function (control) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    ValidationService.passwordValidator = function (control) {
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': { requiredLength: 6 } };
        }
    };
    ValidationService.equalPasswordsValidator = function (group) {
        if (group.controls['password'].value === group.controls['confirmPassword'].value) {
            return null;
        }
        else {
            return { 'mismatchingPasswords': true };
        }
    };
    ValidationService.checkUniqueUserName = function (http) {
        return function (control) {
            return http.get('/api/user/check?user=' + control.value)
                .map(function (response) {
                if (response.json().obj === true) {
                    return { 'usernameTaken': true };
                }
                else {
                    return null;
                }
            })
                .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
        };
    };
    ValidationService.checkUniqueEmail = function (http) {
        return function (control) {
            return http.get('/api/user/check?mail=' + control.value)
                .map(function (response) {
                if (response.json().obj === true) {
                    return { 'emailTaken': true };
                }
                else {
                    return null;
                }
            })
                .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
        };
    };
    ValidationService.checkUniqueRecipient = function (http, authService, recipientId) {
        return function (control) {
            var name = '?name=' + control.value, recipient = recipientId ? '&id=' + recipientId : '', token = authService.getToken();
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Bearer ' + token);
            return http.get('/api/recipients/check' + name + recipient, { headers: headers })
                .map(function (response) {
                if (response.json().obj === true) {
                    return { 'recipientTaken': true };
                }
                else {
                    return null;
                }
            })
                .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
        };
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
