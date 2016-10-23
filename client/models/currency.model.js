"use strict";
var Currency = (function () {
    function Currency(_id, name, code, symbol) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.symbol = symbol;
    }
    return Currency;
}());
exports.Currency = Currency;
