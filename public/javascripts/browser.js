/** @jsx React.DOM */

var ShoppingCartButton = React.createClass({
	getInitialState: function() {
		return ({ count: 0 });
	},
	render: function() {
		var cartUrl = jsRoutes.controllers.Application.shoppingCart().url;
		return (
			<div className="shoppingCartBtn text-right">
				<a className="btn btn-default btn-sm" href={cartUrl}>
					<span className="glyphicon glyphicon-shopping-cart"></span> Shopping Cart ({this.state.count})
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
	getInitialState: function() {
		return { products: [] };
	},
	componentWillMount: function() {
		this.__loadProducts();
		// setInterval(this.__loadProducts(), this.props.pollInterval);
	},
	render: function() {
		var productNodes = this.state.products.map(function (p) {
			return <Product data={p} key={p.product.id} />;
		});
		
		return (
			<div className="browser">
				<ShoppingCartButton />
				
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Quantity</th>
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