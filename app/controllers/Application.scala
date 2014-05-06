package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._

import models._
import models.Product.{ product2Json, productStatus2Json }

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }
  
  def getProducts = Action {
    val json = Json.toJson(Product.availableProducts())
    Ok(json)
  }
  
}