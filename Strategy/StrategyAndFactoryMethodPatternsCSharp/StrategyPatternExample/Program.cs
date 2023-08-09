
CustomerCreator[] creators = new CustomerCreator[3];
creators[0] = new StandardCustomerCreator();
creators[1] = new VIPCustomerCreator();
creators[2] = new FriendCustomerCreator();

foreach (CustomerCreator creator in creators)
{
    CustomerBase customer = creator.FactoryMethod();
    PrintPriceAndDiscount(customer);
}

Console.ReadLine(); // END

/// <summary>
/// Print price and discount
/// </summary>
void PrintPriceAndDiscount(CustomerBase customer)
{
    Console.WriteLine(
        $"Customer {customer.Type} [" +
        $"Price: {customer.GetPrice("item1", new DateTime(2023, 1, 1)).ToString()}, " +
        $"Discount: {customer.GetDiscount("item1", new DateTime(2023, 1, 1)).ToString()}" +
        $"]"
    );
    Console.WriteLine();
}

/// <summary>
/// Customer types
/// </summary>

public enum CustomerType
{
    Standard,
    VIP,
    Friend
}

/// <summary>
/// Customer base class
/// </summary>

public abstract class CustomerBase
{
    protected CustomerType _type;
    public CustomerType Type => _type;

    protected IGetPriceFormula GetPriceFormula = new GetPriceFormula();
    protected IGetDiscountFormula GetDiscountFormula = new GetDiscountFormula();

    public virtual decimal GetPrice(string itemId, DateTime date)
    {
        return this.GetPriceFormula.GetPrice(itemId, date);
    }

    public virtual decimal GetDiscount(string itemId, DateTime date)
    {
        return this.GetDiscountFormula.GetDiscount(itemId, date);
    }
}

/// <summary>
/// Customer Creator - FACTORY METHOD PATTERN
/// https://refactoring.guru/design-patterns/factory-method/csharp/example
/// </summary>

public abstract class CustomerCreator
{
    public abstract CustomerBase FactoryMethod();
}

/// <summary>
/// Concrete Customer creation classes
/// </summary>

class StandardCustomerCreator : CustomerCreator
{
    public override CustomerBase FactoryMethod()
    {
        return new StandardCustomer();
    }
}

class VIPCustomerCreator : CustomerCreator
{
    public override CustomerBase FactoryMethod()
    {
        return new VIPCustomer();
    }
}

class FriendCustomerCreator : CustomerCreator
{
    public override CustomerBase FactoryMethod()
    {
        return new FriendCustomer();
    }
}

/// <summary>
/// Concrete Customers classes
/// </summary>

public class StandardCustomer: CustomerBase
{
    public StandardCustomer()
    {
        _type = CustomerType.Standard;
    }
}

public class VIPCustomer : CustomerBase
{
    public VIPCustomer()
    {
        _type = CustomerType.VIP;
        GetPriceFormula = new GetVIPsPriceFormula();
        GetDiscountFormula = new GetVIPsDiscountFormula();
    }
}

public class FriendCustomer : CustomerBase
{
    public FriendCustomer()
    {
        _type = CustomerType.Friend;
        GetPriceFormula = new GetFriendsPriceFormula();
        GetDiscountFormula = new GetFriendsDiscountFormula();
    }
}

/// <summary>
/// STRATEGY PATTERN - Get price & discount interfaces
/// https://www.csharptutorial.net/csharp-design-patterns/csharp-strategy-pattern/
/// </summary>

public interface IGetPriceFormula
{
    public decimal GetPrice(string itemId, DateTime date);
}

public interface IGetDiscountFormula
{
    public decimal GetDiscount(string itemId, DateTime date);
}

// Concrete price formulas

public class GetPriceFormula : IGetPriceFormula
{
    public decimal GetPrice(string itemId, DateTime date)
    {
        return 100.0M;
    }
}

public class GetVIPsPriceFormula : IGetPriceFormula
{
    public decimal GetPrice(string itemId, DateTime date)
    {
        return 90.0M;
    }
}

public class GetFriendsPriceFormula : IGetPriceFormula
{
    public decimal GetPrice(string itemId, DateTime date)
    {
        return 0M;
    }
}

// Concrete discount formulas

public class GetDiscountFormula : IGetDiscountFormula
{
    public decimal GetDiscount(string itemId, DateTime date)
    {
        return 0M;
    }
}

public class GetVIPsDiscountFormula : IGetDiscountFormula
{
    public decimal GetDiscount(string itemId, DateTime date)
    {
        return 50M;
    }
}

public class GetFriendsDiscountFormula : IGetDiscountFormula
{
    public decimal GetDiscount(string itemId, DateTime date)
    {
        return 100M;
    }
}

