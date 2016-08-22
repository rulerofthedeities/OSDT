"use strict";
var CurrencyModel = (function () {
    function CurrencyModel(_id, name, code, symbol) {
        this._id = _id;
        this.name = name;
        this.code = code;
        this.symbol = symbol;
        this.isDefault = false;
    }
    return CurrencyModel;
}());
exports.CurrencyModel = CurrencyModel;
//# sourceMappingURL=currency.model.js.map