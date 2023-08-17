// The Swift Programming Language
// https://docs.swift.org/swift-book

print("Hello, world!")


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
    private var _customerType: CustomerType = CustomerType.standard
    var customerType: CustomerType { get {return _customerType} }

  //  protected IGetPriceFormula GetPriceFormula = new GetPriceFormula();
  //  protected IGetDiscountFormula GetDiscountFormula = new GetDiscountFormula();

    func GetPrice(itemId: String, date: String) -> Double
    {
        return 0
        //return this.GetPriceFormula.GetPrice(itemId, date)
    }

    func GetDiscount(itemId: String, date: String) -> Double
    {
        return 0
        //return this.GetDiscountFormula.GetDiscount(itemId, date)
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