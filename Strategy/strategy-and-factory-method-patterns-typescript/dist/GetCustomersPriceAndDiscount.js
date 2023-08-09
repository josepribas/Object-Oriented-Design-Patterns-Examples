"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomersPriceAndDiscount = void 0;
function getCustomersPriceAndDiscount() {
    let result = "";
    let creators;
    creators = [
        new StandardCustomerCreator(),
        new VIPCustomerCreator(),
        new FriendCustomerCreator()
    ];
    for (var i = 0; i < creators.length; i++) {
        let customer = creators[i].factoryMethod();
        result = `Customer ${customer.type} [ 
                Price: ${customer.getPrice("item1", new Date())}, 
                Discount: ${customer.getDiscount("item1", new Date())}
                ]`;
    }
    return result;
}
exports.getCustomersPriceAndDiscount = getCustomersPriceAndDiscount;
/// <summary>
/// Customer types
/// </summary>
var CustomerType;
(function (CustomerType) {
    CustomerType[CustomerType["Standard"] = 0] = "Standard";
    CustomerType[CustomerType["VIP"] = 1] = "VIP";
    CustomerType[CustomerType["Friend"] = 2] = "Friend";
})(CustomerType || (CustomerType = {}));
/// <summary>
/// Customer base class
/// </summary>
class CustomerBase {
    get type() {
        return this._type;
    }
    constructor(customerType) {
        this.customerType = customerType;
        this._type = CustomerType.Standard;
        this.getPriceFormula = new GetPriceFormula();
        this.getDiscountFormula = new GetDiscountFormula();
        this._type = customerType;
    }
    getPrice(itemId, date) {
        return this.getPriceFormula.getPrice(itemId, date);
    }
    getDiscount(itemId, date) {
        return this.getDiscountFormula.getDiscount(itemId, date);
    }
}
/// <summary>
/// Concrete Customers classes
/// </summary>
class StandardCustomer extends CustomerBase {
    constructor() {
        super(CustomerType.Standard);
    }
}
class VIPCustomer extends CustomerBase {
    constructor() {
        super(CustomerType.VIP);
        this.getPriceFormula = new GetVIPsPriceFormula();
        this.getDiscountFormula = new GetVIPsDiscountFormula();
    }
}
class FriendCustomer extends CustomerBase {
    constructor() {
        super(CustomerType.Friend);
        this.getPriceFormula = new GetFriendsPriceFormula();
        this.getDiscountFormula = new GetFriendsDiscountFormula();
    }
}
/// <summary>
/// Customer Creator - FACTORY METHOD PATTERN
/// https://refactoring.guru/design-patterns/factory-method/csharp/example
/// </summary>
class CustomerCreator {
}
/// <summary>
/// Concrete Customer creation classes
/// </summary>
class StandardCustomerCreator {
    factoryMethod() {
        return new StandardCustomer();
    }
}
class VIPCustomerCreator {
    factoryMethod() {
        return new VIPCustomer();
    }
}
class FriendCustomerCreator {
    factoryMethod() {
        return new FriendCustomer();
    }
}
// Concrete price formulas
class GetPriceFormula {
    getPrice(itemId, date) {
        return 100.0;
    }
}
class GetVIPsPriceFormula {
    getPrice(itemId, date) {
        return 90.0;
    }
}
class GetFriendsPriceFormula {
    getPrice(itemId, date) {
        return 0;
    }
}
// Concrete discount formulas
class GetDiscountFormula {
    getDiscount(itemId, date) {
        return 0;
    }
}
class GetVIPsDiscountFormula {
    getDiscount(itemId, date) {
        return 50;
    }
}
class GetFriendsDiscountFormula {
    getDiscount(itemId, date) {
        return 100;
    }
}
//# sourceMappingURL=GetCustomersPriceAndDiscount.js.map