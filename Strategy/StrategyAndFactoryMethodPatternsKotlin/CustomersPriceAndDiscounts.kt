fun main() {
    var creators = arrayOf(
        StandardCustomerCreator(),
        VIPCustomerCreator(),
        FriendCustomerCreator()
        )

    for (creator in creators)
    {
        val customer = creator.factoryMethod()
        println(printPriceAndDiscount(customer))
    }
}

/// <summary>
/// Print price and discount
/// </summary>
fun printPriceAndDiscount(customer: CustomerBase): String
{
    val result =
        """Customer ${customer.type} [
           Price: ${customer.getPrice("item1", "01/01/2023")}, 
           Discount: ${customer.getDiscount("item1", "01/01/2023")}
         ]"""
    
    return result
}

/// <summary>
/// Customer types
/// </summary>

enum class CustomerType
{
    Standard,
    VIP,
    Friend
}

/// <summary>
/// Customer base class
/// </summary>

abstract class CustomerBase
{
    var type: CustomerType = CustomerType.Standard
    var getPriceFormula : IGetPriceFormula = GetPriceFormula()
    var getDiscountFormula : IGetDiscountFormula = GetDiscountFormula()

    open fun getPrice(itemId:String, date:String): Double
    {
        return this.getPriceFormula.getPrice(itemId, date)
    }

    open fun getDiscount(itemId:String, date:String): Double
    {
        return this.getDiscountFormula.getDiscount(itemId, date)
    }
}

/// <summary>
/// Customer Creator - FACTORY METHOD PATTERN
/// https://refactoring.guru/design-patterns/factory-method/csharp/example
/// </summary>

abstract class CustomerCreator
{
    abstract fun factoryMethod(): CustomerBase
}

/// <summary>
/// Concrete Customer creation classes
/// </summary>

class StandardCustomerCreator() : CustomerCreator()
{
    override fun factoryMethod(): CustomerBase
    {
        return StandardCustomer()
    }
}

class VIPCustomerCreator() : CustomerCreator()
{
    override fun factoryMethod(): CustomerBase
    {
        return VIPCustomer()
    }
}

class FriendCustomerCreator() : CustomerCreator()
{
    override fun factoryMethod(): CustomerBase
    {
        return FriendCustomer()
    }
}

/// <summary>
/// Concrete Customers classes
/// </summary>

class StandardCustomer(): CustomerBase()
{
    init {
        type = CustomerType.Standard
    }
}

class VIPCustomer() : CustomerBase()
{
    init {
        type = CustomerType.VIP
        getPriceFormula = GetVIPsPriceFormula()
        getDiscountFormula = GetVIPsDiscountFormula()
    }
}

class FriendCustomer() : CustomerBase()
{
    init {
        type = CustomerType.Friend
        getPriceFormula = GetFriendsPriceFormula()
        getDiscountFormula = GetFriendsDiscountFormula()
    }
}

/// <summary>
/// STRATEGY PATTERN - Get price & discount interfaces
/// https://www.csharptutorial.net/csharp-design-patterns/csharp-strategy-pattern/
/// </summary>

interface IGetPriceFormula
{
    fun getPrice(itemId: String, date: String): Double
}

interface IGetDiscountFormula
{
    fun getDiscount(itemId: String, date: String): Double
}

// Concrete price formulas

class GetPriceFormula() : IGetPriceFormula
{
    override fun getPrice(itemId: String, date: String): Double
    {
        return 100.0
    }
}

class GetVIPsPriceFormula() : IGetPriceFormula
{
    override fun getPrice(itemId: String, date: String): Double
    {
        return 90.0
    }
}

class GetFriendsPriceFormula() : IGetPriceFormula
{
    override fun getPrice(itemId: String, date: String): Double
    {
        return 0.0
    }
}

// Concrete discount formulas

class GetDiscountFormula() : IGetDiscountFormula
{
    override fun getDiscount(itemId: String, date: String): Double
    {
        return 0.0
    }
}

class GetVIPsDiscountFormula() : IGetDiscountFormula
{
    override fun getDiscount(itemId: String, date: String): Double
    {
        return 50.0
    }
}

class GetFriendsDiscountFormula() : IGetDiscountFormula
{
    override fun getDiscount(itemId: String, date: String): Double
    {
        return 100.0
    }
}

