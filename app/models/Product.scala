package models

import java.io.File

case class Product(id: Long, name: String, description: String, price: Double, photo: Option[File]) {
  
  override def toString = name
  
}

class ProductStatus(val product: Product, initialQuantity: Int) {
  require(product != null)
  require(initialQuantity > 0)
  
  var _quantity = initialQuantity
  
  def quantity = _quantity
  
  def changeQuantity(delta: Int): Boolean = {
    if (_quantity + delta > 0) {
      _quantity += delta
      true
    } else false
  }
  
  def available = _quantity > 0
  
}

object Products {
  
  private val inventory = Seq(
    new ProductStatus(Product(1L, "PlayStation 4", "Sony's 8th generation videogame", 299.99, None), 10),
    new ProductStatus(Product(2L, "XBox One", "Microsoft's 8th generation videogame", 249.99, None), 10),
    new ProductStatus(Product(3L, "PlayStation Vita", "Sony's portable videogame", 179.99, None), 30),
    new ProductStatus(Product(4L, "2DS", "Nintendo's portable videogame", 119.99, None), 45),
    new ProductStatus(Product(5L, "3DS", "Nintendo's portable videogame", 129.99, None), 45),
    new ProductStatus(Product(6L, "3DS XL", "Nintendo's portable videogame", 149.99, None), 45),
    new ProductStatus(Product(7L, "Genesis", "Sega's 16 bits console", 39.99, None), 0)
  )
  
  def available(productId: Long): Boolean = {
    val ps = inventory find (i => i.product.id == productId)
    ps map (_.available) getOrElse false
  }
  
  def availableProducts() = inventory filter (_.available) sortBy (_.product.name) map (i => (i.quantity, i.product))
  
}