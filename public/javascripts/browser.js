/** @jsx React.DOM */

var Product = React.createClass({
	render: function() {
		return (
			<tr>
				<td><span className="hidden">{this.props.data.product.id}</span></td>
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
			dataType: 'json',
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
		var productNodes = this.state.products.map(function (prod) {
			return <Product data={prod} />;
		});
		return (
			<table className="browser table table-striped">
				<thead>
					<tr>
						<th></th>
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
		);
	}
});