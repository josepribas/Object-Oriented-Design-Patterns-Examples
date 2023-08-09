export function getCustomersPriceAndDiscount():string {
    let result = "";
    let creators : Array<CustomerCreator>;
    creators = [
        new StandardCustomerCreator(),
        new VIPCustomerCreator(),
        new FriendCustomerCreator()
    ]

    for (var i = 0; i < creators.length; i++ )
    {
        let customer = creators[i].factoryMethod();
        result += `Customer ${customer.type} [ 
                Price: ${customer.getPrice("item1", new Date())}, 
                Discount: ${customer.getDiscount("item1", new Date())}
                ]\r\n`
    }

    return result;
}

/// <summary>
/// Customer types
/// </summary>

enum CustomerType {
    Standard,
    VIP,
    Friend
}

/// <summary>
/// Customer base class
/// </summary>

class CustomerBase {
    protected readonly _type: CustomerType = CustomerType.Standard;
    public get type() {
        return this._type;
    }  

    protected getPriceFormula: IGetPriceFormula = new GetPriceFormula();
    protected getDiscountFormula: IGetDiscountFormula = new GetDiscountFormula();

    protected constructor(protected customerType: CustomerType)
    {
        this._type = customerType;
    }

    public getPrice(itemId: string, date: Date):number
    {
        return this.getPriceFormula.getPrice(itemId, date);
    }

    public getDiscount(itemId: string, date: Date):number
    {
        return this.getDiscountFormula.getDiscount(itemId, date);
    }
}

/// <summary>
/// Concrete Customers classes
/// </summary>

class StandardCustomer extends CustomerBase
{
    public constructor()
    {
        super(CustomerType.Standard);
    }
}

class VIPCustomer extends CustomerBase
{
    public constructor()
    {
        super(CustomerType.VIP);
        this.getPriceFormula = new GetVIPsPriceFormula();
        this.getDiscountFormula = new GetVIPsDiscountFormula();
    }
}

class FriendCustomer extends CustomerBase
{
    public constructor()
    {
        super(CustomerType.Friend);
        this.getPriceFormula = new GetFriendsPriceFormula();
        this.getDiscountFormula = new GetFriendsDiscountFormula();
    }
}

/// <summary>
/// Customer Creator - FACTORY METHOD PATTERN
/// https://refactoring.guru/design-patterns/factory-method/csharp/example
/// </summary>

abstract class CustomerCreator
{
    public abstract factoryMethod(): CustomerBase;
}

/// <summary>
/// Concrete Customer creation classes
/// </summary>

class StandardCustomerCreator implements CustomerCreator
{
    public factoryMethod(): CustomerBase
    {
        return new StandardCustomer();
    }
}

class VIPCustomerCreator implements CustomerCreator
{
    public factoryMethod(): CustomerBase
    {
        return new VIPCustomer();
    }
}

class FriendCustomerCreator implements CustomerCreator
{
    public factoryMethod(): CustomerBase
    {
        return new FriendCustomer();
    }
}

/// <summary>
/// STRATEGY PATTERN - Get price & discount interfaces
/// https://www.csharptutorial.net/csharp-design-patterns/csharp-strategy-pattern/
/// </summary>

interface IGetPriceFormula
{
    getPrice(itemId: string, date: Date):number;
}

interface IGetDiscountFormula
{
    getDiscount(itemId: string, date: Date):number;
}

// Concrete price formulas

class GetPriceFormula implements IGetPriceFormula
{
    public getPrice(itemId: string, date: Date): number
    {
        return 100.0;
    }
}

class GetVIPsPriceFormula implements IGetPriceFormula
{
    public getPrice(itemId: string, date: Date): number
    {
        return 90.0;
    }
}

class GetFriendsPriceFormula implements IGetPriceFormula
{
    public getPrice(itemId: string, date: Date): number
    {
        return 0;
    }
}

// Concrete discount formulas

class GetDiscountFormula implements IGetDiscountFormula
{
    public getDiscount(itemId: string, date: Date): number
    {
        return 0;
    }
}

class GetVIPsDiscountFormula implements IGetDiscountFormula
{
    public getDiscount(itemId: string, date: Date): number
    {
        return 50;
    }
}

class GetFriendsDiscountFormula implements IGetDiscountFormula
{
    public getDiscount(itemId: string, date: Date): number
    {
        return 100;
    }
}