// The Swift Programming Language
// https://docs.swift.org/swift-book

let creators: [CustomerCreator] = [
    StandardCustomerCreator(),
    VIPCustomerCreator(),
    FriendCustomerCreator()
    ]

for creator in creators
{
    let customer:CustomerBase = creator.FactoryMethod()
    PrintPriceAndDiscount(customer: customer)
}

func PrintPriceAndDiscount(customer: CustomerBase)
{
    print(
        """
        Customer \(customer.customerType) [ 
            Price: \(customer.getPrice(itemId:"item1", date:"01-01-2000")), 
            Discount: \(customer.getDiscount(itemId:"item1", date:"01-01-2000"))
        ]\n
        """
    );
}

/// <summary>
/// Customer types
/// </summary>

enum CustomerType
{
    case standard
    case vip
    case friend
}

/// <summary>
/// Customer base class
/// </summary>

class CustomerBase
{
    var customerType: CustomerType = CustomerType.standard
    var getPriceFormula: IGetPriceFormula = GetPriceFormula()
    var getDiscountFormula: IGetDiscountFormula = GetDiscountFormula()

    func getPrice(itemId: String, date: String) -> Double
    {
        return getPriceFormula.getPrice(itemId: itemId, date: date)
    }

    func getDiscount(itemId: String, date: String) -> Double
    {
        return getDiscountFormula.getDiscount(itemId: itemId, date: date)
    }
}

/// <summary>
/// Customer Creator - FACTORY METHOD PATTERN
/// https://refactoring.guru/design-patterns/factory-method/csharp/example
/// </summary>

class CustomerCreator
{
    func FactoryMethod() -> CustomerBase {
        fatalError("Subclasses need to implement the `FactoryMethod()` method.")
    }
}

/// <summary>
/// Concrete Customer creation classes
/// </summary>

class StandardCustomerCreator : CustomerCreator
{
    override func FactoryMethod() -> CustomerBase
    {
        return StandardCustomer()
    }
}

class VIPCustomerCreator : CustomerCreator
{
    override func FactoryMethod() -> CustomerBase
    {
        return VIPCustomer()
    }
}

class FriendCustomerCreator : CustomerCreator
{
    override func FactoryMethod() -> CustomerBase
    {
        return FriendCustomer()
    }
}

/// <summary>
/// Concrete Customers classes
/// </summary>

class StandardCustomer: CustomerBase
{
    override init()
    {
        super.init()
        customerType = CustomerType.standard
    }
}

class VIPCustomer : CustomerBase
{
    override init()
    {
        super.init()
        customerType = CustomerType.vip
        getPriceFormula = GetVIPsPriceFormula()
        getDiscountFormula = GetVIPsDiscountFormula()
    }
}

class FriendCustomer : CustomerBase
{
    override init()
    {
        super.init()
        customerType = CustomerType.friend
        getPriceFormula = GetFriendsPriceFormula()
        getDiscountFormula = GetFriendsDiscountFormula()
    }
}

/// <summary>
/// STRATEGY PATTERN - Get price & discount interfaces
/// https://www.csharptutorial.net/csharp-design-patterns/csharp-strategy-pattern/
/// </summary>

protocol IGetPriceFormula
{
    func getPrice(itemId: String, date: String) -> Double
}

protocol IGetDiscountFormula
{
    func getDiscount(itemId: String, date: String) -> Double
}

// Concrete price formulas

class GetPriceFormula : IGetPriceFormula
{
    func getPrice(itemId: String, date: String) -> Double
    {
        return 100
    }
}

class GetVIPsPriceFormula : IGetPriceFormula
{
    func getPrice(itemId: String, date: String) -> Double
    {
        return 90
    }
}

class GetFriendsPriceFormula : IGetPriceFormula
{
    func getPrice(itemId: String, date: String) -> Double
    {
        return 0
    }
}

// Concrete discount formulas

class GetDiscountFormula : IGetDiscountFormula
{
    func getDiscount(itemId: String, date: String) -> Double
    {
        return 0
    }
}

class GetVIPsDiscountFormula : IGetDiscountFormula
{
    func getDiscount(itemId: String, date: String) -> Double
    {
        return 50
    }
}

class GetFriendsDiscountFormula : IGetDiscountFormula
{
    func getDiscount(itemId: String, date: String) -> Double
    {
        return 100
    }
}

