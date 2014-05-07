/** @jsx React.DOM */

var ShoppingCartButton = React.createClass({
	render: function() {
		var cartUrl = jsRoutes.controllers.Application.shoppingCart().url;
		return (
			<div className="shoppingCartBtn text-right">
				<a
					href={cartUrl}
					className="btn btn-default"
					title="Shopping cart"
					data-toggle="tooltip">

					<span className="glyphicon glyphicon-shopping-cart"></span> {this.props.count}
				</a>
			</div>
		);
	}
});

var Product = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.data.product.name}</td>
				<td>{this.props.data.product.description}</td>
				<td>{this.props.data.product.price}</td>
				<td>{this.props.data.quantity}</td>
				<td>
					<button 
						className="addToCart btn btn-default btn-sm"
						title="Add to cart"
						onClick={this.props.addToCartHandler.bind(null, this.props.key)}
						data-toggle="tooltip">

						<span className="glyphicon glyphicon-plus"></span>
					</button>
				</td>
			</tr>
		);
	}
});

var Browser = React.createClass({
	__loadProducts: function() {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			success: function(data) {
				this.setState({ products: data });
			}.bind(this)
		});
	},
	__addToCart: function(productId) {
		console.log("adding product #" + productId + " to cart");
		this.setState({ cartCount: this.state.cartCount + 1 });
	},
	getInitialState: function() {
		return { products: [], cartCount: 0 };
	},
	componentWillMount: function() {
		this.__loadProducts();
		// setInterval(this.__loadProducts(), this.props.pollInterval);
	},
	render: function() {
		var handler = this.__addToCart
		var productNodes = this.state.products.map(function (p) {
			return <Product data={p} key={p.product.id} addToCartHandler={handler} />;
		});
		
		return (
			<div className="browser">
				<ShoppingCartButton count={this.state.cartCount} />
				
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Quantity</th>
							<th></th>
						</tr>
					</thead>
						<tbody>
							{productNodes}
						</tbody>
				</table>
			</div>
		);
	}
});